import readingTime from "reading-time";

export const calcTimeToRead = (mdContent: string) => {
  const stats = readingTime(mdContent);
  const timeToRead = Math.round(stats.minutes);
  return timeToRead === 0 ? 1 : timeToRead;
};
