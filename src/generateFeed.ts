import { generateAtomTemplate } from "./templates/atomTemplate";
import { generateJSONTemplate } from "./templates/jsonTemplate";
import { generateRSSTemplate } from "./templates/rssTemplate";
import { FeedData } from "./types";

export const generateFeed = (
  type: "rss" | "atom" | "json",
  feedData: FeedData
): string => {
  switch (type) {
    case "rss":
      return generateRSSTemplate(feedData);
    case "atom":
      return generateAtomTemplate(feedData);
    case "json":
      return generateJSONTemplate(feedData);
    default:
      throw new Error(`Unsupported feed type: ${type}`);
  }
};
