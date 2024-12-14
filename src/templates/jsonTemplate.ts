import { FeedData } from "../types";

export const generateJSONTemplate = (feedData: FeedData): string => {
  const { title, link, description, updated, author, items } = feedData;

  return JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1",
      title,
      home_page_url: link,
      feed_url: `${link}/json`,
      description,
      updated: updated || new Date().toISOString(),
      author: author
        ? {
            name: author.name,
            url: author.link,
            email: author.email,
          }
        : undefined,
      items: items.map((item: any) => ({
        id: item.id,
        url: item.link,
        title: item.title,
        content_html: item.content || "",
        summary: item.description,
        date_published: new Date(item.date).toISOString(),
        image: item.image,
        author: item.author,
      })),
    },
    null,
    2
  );
};
