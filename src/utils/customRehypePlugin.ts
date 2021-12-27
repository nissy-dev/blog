import { Transformer } from "unified";
import { visit } from "unist-util-visit";
import { is } from "unist-util-is";
import { Root as HastRoot, Element, ElementContent } from "hast";
import { h } from "hastscript";

import { extractCardData, CardData } from "./extractCardData";

type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

const hasProperties = (node: ElementContent): node is PartialRequired<Element, "properties"> =>
  node.type === "element" && !!node.properties;

export const rehypeInsertTargetBlank: () => Transformer<HastRoot> = () => {
  const transformer: Transformer<HastRoot> = (tree) => {
    const insertTargetBlank = (node: Element) => {
      if (is(node, { tagName: "a" }) && hasProperties(node)) {
        const href = (node.properties.href as string) ?? "";
        if (/^(http|https)/.test(href)) {
          node.properties.target = "_blank";
          node.properties.rel = "noopener noreferrer";
        }
      }
    };
    visit(tree, "element", insertTargetBlank);
  };
  return transformer;
};

export const rehypeInsertLazyload: () => Transformer<HastRoot> = () => {
  const transformer: Transformer<HastRoot> = (tree) => {
    const insertTargetBlank = (node: Element) => {
      if (is(node, { tagName: "img" }) && hasProperties(node)) {
        node.properties.loading = "lazy";
      }
    };
    visit(tree, "element", insertTargetBlank);
  };
  return transformer;
};

// See: https://github.com/gladevise/remark-link-card/blob/main/index.js
export const rehypeConvertLinkToCard: () => Transformer<HastRoot> = () => {
  const transformer: Transformer<HastRoot> = async (tree) => {
    const transformers: (() => Promise<void>)[] = [];
    const convertLinkToCard = (node: Element, index: number | null) => {
      if (is(node, { tagName: "p" }) && node.children.length === 1) {
        const child = node.children[0];
        if (is(child, { tagName: "a" }) && hasProperties(child)) {
          transformers.push(async () => {
            const link = (child.properties.href as string) ?? "";
            const cardData = await extractCardData(link);
            if (cardData && index !== null) {
              const cardContent = buildCardContent(cardData);
              tree.children.splice(index, 1, cardContent);
            }
          });
        }
      }
    };
    visit(tree, "element", convertLinkToCard);
    await Promise.all(transformers.map((t) => t()));
  };
  return transformer;
};

const buildCardContent = (cardData: CardData) => {
  const cardContentNode = h("div", { class: "card-content" }, [
    h("div", { class: "card-content-title" }, cardData.title),
    h("div", { class: "card-content-description" }, cardData.description),
    h("div", { class: "card-content-hostname" }, [
      h("img", { src: cardData.favicon, class: "hostname-favicon" }),
      h("span", { class: "hostname-favicon" }, cardData.hostname),
    ]),
  ]);

  if (cardData.image) {
    const cardImgContent = h("div", { class: "card-thumbnail" }, [
      h("img", { src: cardData.image, class: "thumbnail-img" }),
    ]);
    return h(
      "a",
      { class: "card-link", target: "_blank", rel: "noopener noreferrer", href: cardData.url },
      [cardContentNode, cardImgContent]
    );
  } else {
    return h(
      "a",
      { class: "card-link", target: "_blank", rel: "noopener noreferrer", href: cardData.url },
      [cardContentNode]
    );
  }
};
