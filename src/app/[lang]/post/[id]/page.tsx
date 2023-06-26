import path from "path";

import { Metadata } from "next";

import { Post } from "../../../../components/Post";
import { OGP_DIR, siteMetadata } from "../../../../const";
import { Locale, SUPPORTED_LOCALES } from "../../../../i18n/resources";
import { getPostById, getPostIDs } from "../../../../lib/api";

type Props = {
  params: {
    lang: Locale;
    id: string;
  };
};

export async function generateStaticParams() {
  const ids = await getPostIDs();
  return ids.flatMap((id) => {
    return SUPPORTED_LOCALES.map((locale) => ({ id, lang: locale }));
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { frontMatter } = await getPostById(params.id);
  const { description, excerpt, title } = frontMatter;
  const ogpImagePath = path.join(siteMetadata.siteUrl, "/", OGP_DIR, `${params.id}.png`);
  return {
    title,
    description: description || excerpt,
    openGraph: {
      images: [{ url: ogpImagePath }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { frontMatter, tocHtml, contentHtml } = await getPostById(params.id);
  return <Post frontMatter={frontMatter} tocHtml={tocHtml} contentHtml={contentHtml} />;
}
