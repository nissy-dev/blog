import { Transformer } from "unified";
import { visit } from "unist-util-visit";
import { is } from "unist-util-is";
import { Node } from "unist";
import { Element } from "hast";

type PartialRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

const hasProperties = (node: Element): node is PartialRequired<Element, "properties"> =>
  !!node.properties;

export const rehypeInsertTargetBlank: () => Transformer = () => {
  const transformer: Transformer = (tree: Node) => {
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

export const rehypeInsertLazyload: () => Transformer = () => {
  const transformer: Transformer = (tree: Node) => {
    const insertTargetBlank = (node: Element) => {
      if (is(node, { tagName: "img" }) && hasProperties(node)) {
        node.properties.loading = "lazy";
      }
    };
    visit(tree, "element", insertTargetBlank);
  };
  return transformer;
};
