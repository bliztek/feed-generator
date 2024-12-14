import { JSONFeed } from "../types";

export const generateJSONFeed = (feedData: JSONFeed): string => {
  const {
    title,
    home_page_url,
    feed_url,
    description,
    user_comment,
    next_url,
    icon,
    favicon,
    authors = [],
    language,
    expired,
    hubs = [],
    items,
  } = feedData;

  // Validate required fields
  if (!title || !items || items.length === 0) {
    throw new Error("Invalid feed data: title and items are required.");
  }

  return JSON.stringify(
    {
      version: "https://jsonfeed.org/version/1.1",
      title,
      home_page_url,
      feed_url,
      description,
      user_comment,
      next_url,
      icon,
      favicon,
      authors: authors.map((author) => ({
        name: author.name,
        url: author.url,
        avatar: author.avatar,
      })),
      language,
      expired,
      hubs: hubs.map((hub) => ({
        type: hub.type,
        url: hub.url,
      })),
      items: items.map((item) => {
        const {
          id,
          url,
          external_url,
          title,
          content_html,
          content_text,
          summary,
          image,
          banner_image,
          date_published,
          date_modified,
          authors: itemAuthors = [],
          tags,
          language: itemLanguage,
          attachments = [],
        } = item;

        if (!id) {
          throw new Error("Each item must have a unique 'id'.");
        }

        return {
          id,
          url,
          external_url,
          title,
          content_html,
          content_text,
          summary,
          image,
          banner_image,
          date_published,
          date_modified,
          authors: itemAuthors.map((author) => ({
            name: author.name,
            url: author.url,
            avatar: author.avatar,
          })),
          tags,
          language: itemLanguage,
          attachments: attachments.map((attachment) => ({
            url: attachment.url,
            mime_type: attachment.mime_type,
            title: attachment.title,
            size_in_bytes: attachment.size_in_bytes,
            duration_in_seconds: attachment.duration_in_seconds,
          })),
        };
      }),
    },
    null,
    2
  );
};
