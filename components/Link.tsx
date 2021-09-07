import NextLink, { LinkProps } from "next/link";

type Props = {
  children: React.ReactNode;
  href: LinkProps["href"];
} & Omit<JSX.IntrinsicElements["a"], "href">;

// `/pages` を使ったルートナビゲーションを必要する場合だけ next/link を使う必要がある
export const Link = ({ children, href, ...rest }: Props) => {
  return (
    <NextLink href={href}>
      <a {...rest}>{children}</a>
    </NextLink>
  );
};
