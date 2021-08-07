import Head from "next/head";
import { useRouter } from "next/router";

import { siteMetadata } from "../utils/const";

type Props = {
  title: string;
  metaDescription: string;
  blogPostData?: {
    imageName?: string;
    publishedAt: string;
    modifiedAt: string;
  };
};

export const SEO = ({ title, metaDescription, blogPostData }: Props) => {
  const titleWithSiteName = `${title} - ${siteMetadata.title}`;
  const url = `${siteMetadata.siteUrl}${useRouter().asPath}`;
  const logoUrl = `${siteMetadata.siteUrl}/images/logo.png`;

  return (
    <Head>
      <title>{titleWithSiteName}</title>
      <meta name="description" content={metaDescription} />
      {/* OGPの設定 */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={titleWithSiteName} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:site_name" content={siteMetadata.title} />
      <meta
        property="og:image"
        content={
          blogPostData?.imageName
            ? `${siteMetadata.siteUrl}/images/posts/${blogPostData.imageName}`
            : logoUrl
        }
      />
      {/* TwitterのOGPの設定 */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={`@${siteMetadata.twitter}`} />
      <meta name="twitter:creator" content={`@${siteMetadata.twitter}`} />
      {/* URLの正規化 */}
      <link rel="canonical" href={url} />
    </Head>
  );
};
