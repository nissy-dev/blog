/* eslint-disable jsx-a11y/anchor-has-content */
import NextLink from "next/link";

type Props = {
  href: string;
};

export const Link = ({ href, ...rest }: Props & JSX.IntrinsicElements["a"]) => {
  const isInternalLink = href && href.startsWith("/");

  // `/pages` を使ったルートナビゲーションを必要する場合だけ next/link を使う必要がある
  if (!isInternalLink) {
    throw Error(`The url (${href}) is not need to be wrapped by next/link.`);
  }

  return (
    <NextLink href={href}>
      <a {...rest} />
    </NextLink>
  );
};
