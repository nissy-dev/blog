declare module "markdown-toc" {
  type Options = {
    maxdepth: number;
  };
  export default function toc(md: string, options: Options): { content: string };
}
