import ogs from "open-graph-scraper";

export type CardData = {
  title: string;
  description: string;
  image: string | undefined; // 画像だけはundefinedでもOK
  hostname: string;
  favicon: string;
  url: string;
};

const cardDataValidator = (data: { [key: string]: string | undefined }): data is CardData => {
  return !!data.title && !!data.description && !!data.hostname && !!data.favicon;
};

export const extractCardData = async (url: string): Promise<CardData | undefined> => {
  const data: { [key: string]: string | undefined } = {};
  try {
    const { result } = await ogs({ url });
    // @ts-ignore: @typesが間違っている
    data.title = result.ogTitle;
    // @ts-ignore: @typesが間違っている
    data.description = result.ogDescription;
    // @ts-ignore: @typesが間違っている
    data.image = result.ogImage?.url;
    const hostname = new URL(url).hostname;
    data.hostname = hostname;
    data.favicon = `https://www.google.com/s2/favicons?domain=${hostname}`;
    data.url = url;
  } catch (e) {
    return undefined;
  }

  if (!cardDataValidator(data)) {
    return undefined;
  }

  return data;
};
