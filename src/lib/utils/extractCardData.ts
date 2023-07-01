import ogs from "open-graph-scraper";

export type CardData = {
  title: string;
  description: string;
  image: string | undefined; // 画像だけはundefinedでもOK
  hostname: string;
  favicon: string;
  url: string;
};

type OgsResultType = {
  ogTitle: string;
  ogDescription: string;
  ogImage: {
    url: string;
  };
};

const isOgsResultType = (result: object): result is OgsResultType => {
  if (
    "ogTitle" in result &&
    typeof result.ogTitle === "string" &&
    "ogDescription" in result &&
    typeof result.ogDescription === "string" &&
    "ogImage" in result &&
    typeof result.ogImage === "object" &&
    result.ogImage !== null &&
    "url" in result.ogImage &&
    typeof result.ogImage.url === "string"
  ) {
    return true;
  }

  return false;
};

export const extractCardData = async (url: string): Promise<CardData | undefined> => {
  try {
    const ogsData = await ogs({ url, downloadLimit: 1000000 * 20 });
    const { result } = ogsData;
    if (!isOgsResultType(result)) {
      throw new Error("Invalid result type.");
    }

    const hostname = new URL(url).hostname;
    return {
      title: result.ogTitle,
      description: result.ogDescription,
      image: result.ogImage.url,
      hostname,
      favicon: `https://www.google.com/s2/favicons?domain=${hostname}`,
      url,
    };
  } catch (e) {
    return undefined;
  }
};
