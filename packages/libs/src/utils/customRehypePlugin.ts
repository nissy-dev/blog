import type { Element, ElementContent, Root as HastRoot } from "hast";
import { h } from "hastscript";
import ogs from "open-graph-scraper";
import { is } from "unist-util-is";
import { visit } from "unist-util-visit";

type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

const hasProperties = (
  node: ElementContent,
): node is PartialRequired<Element, "properties"> =>
  node.type === "element" && !!node.properties;

export const rehypeInsertTargetBlank = () => {
  const insertTargetBlank = (node: Element) => {
    if (is(node, { tagName: "a" }) && hasProperties(node)) {
      const href = (node.properties.href as string) ?? "";
      if (/^(http|https)/.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener noreferrer";
      }
    }
  };
  return (tree: HastRoot) => {
    visit(tree, "element", insertTargetBlank);
  };
};

export const rehypeInsertLazyLoad = () => {
  const insertTargetBlank = (node: Element) => {
    if (is(node, { tagName: "img" }) && hasProperties(node)) {
      node.properties.loading = "lazy";
    }
  };
  return (tree: HastRoot) => {
    visit(tree, "element", insertTargetBlank);
  };
};

// See: https://github.com/gladevise/remark-link-card/blob/main/index.js
export const rehypeConvertLinkToCard = () => {
  return async (tree: HastRoot) => {
    const transformers: (() => Promise<void>)[] = [];
    const convertLinkToCard = (node: Element, index: number | undefined) => {
      if (is(node, { tagName: "p" }) && node.children.length === 1) {
        const child = node.children[0];
        if (is(child, { tagName: "a" }) && hasProperties(child)) {
          transformers.push(async () => {
            const link = (child.properties.href as string) ?? "";
            const linkData = await extractLinkData(link);
            if (linkData && index != null) {
              const cardContent = buildCardContent(linkData);
              tree.children.splice(index, 1, cardContent);
            }
          });
        }
      }
    };
    visit(tree, "element", convertLinkToCard);
    await Promise.all(transformers.map((t) => t()));
  };
};

type LinkData = {
  title: string;
  description: string;
  image: string | undefined; // 画像だけはundefinedでもOK
  hostname: string;
  favicon: string;
  url: string;
};

const extractLinkData = async (url: string): Promise<LinkData | undefined> => {
  try {
    const ogsData = await ogs({ url });
    const { result } = ogsData;
    if (!result.ogTitle || !result.ogDescription) {
      throw new Error("Invalid result type.");
    }

    const hostname = new URL(url).hostname;
    return {
      title: result.ogTitle,
      description: result.ogDescription,
      image: result.ogImage?.[0].url,
      hostname,
      favicon: `https://www.google.com/s2/favicons?domain=${hostname}`,
      url,
    };
  } catch (_) {
    return undefined;
  }
};

const buildCardContent = (linkData: LinkData) => {
  const cardContentNode = h("div", { class: "card-content" }, [
    h("div", { class: "card-content-title" }, linkData.title),
    h("div", { class: "card-content-description" }, linkData.description),
    h("div", { class: "card-content-hostname" }, [
      h("span", { class: "hostname-favicon" }, linkData.hostname),
    ]),
  ]);

  if (linkData.image) {
    const cardThumbnailContent = h("div", { class: "card-thumbnail" }, [
      h("img", {
        src: linkData.image,
        class: "thumbnail-img",
        alt: "thumbnail",
      }),
    ]);
    return h(
      "a",
      { class: "card-link", href: linkData.url, title: linkData.title },
      [cardContentNode, cardThumbnailContent],
    );
  }

  const cardThumbnailContent = h("div", { class: "card-thumbnail" });
  return h(
    "a",
    { class: "card-link", href: linkData.url, title: linkData.title },
    [cardContentNode, cardThumbnailContent],
  );
};
