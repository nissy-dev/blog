import { Plugin, Processor } from "unified";

declare module "remark-prism" {
  type Options = {
    transformInlineCode: boolean;
    plugins: Array<string>;
  };
  const remarkPrism: Plugin<[Options?] | [Processor?, Options?]>;
  export = remarkPrism;
}
