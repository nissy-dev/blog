import ogs from "open-graph-scraper";

export type CardData = {
  title: string;
  description: string;
  image: string | undefined; // 画像だけはundefinedでもOK
  hostname: string;
  favicon: string;
  url: string;
};

export const extractCardData = async (url: string): Promise<CardData | undefined> => {
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
  } catch (e) {
    return undefined;
  }
};
