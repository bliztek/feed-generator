import { FeedData } from "../types";

export const generateAtomFeed = (feedData: FeedData): string => {
  const {
    title,
    link,
    description,
    id,
    updated,
    generator = "Atom Feed Generator",
    author,
    items,
  } = feedData;

  // Validate required fields
  if (!title || !description || !id || !link || !author?.name) {
    throw new Error(
      "Invalid feed data: title, description, id, link, and author.name are required."
    );
  }
  return `
    <?xml version="1.0" encoding="UTF-8" ?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${title}</title>
      <subtitle>${description}</subtitle>
      <link href="${link}" />
      <id>${id}</id>
      <updated>${updated || new Date().toISOString()}</updated>
      <generator>${generator}</generator>
      ${
        author
          ? `<author><name>${author.name}</name>${
              author.email ? `<email>${author.email}</email>` : ""
            }${author.link ? `<uri>${author.link}</uri>` : ""}</author>`
          : ""
      }
      ${items
        .map(
          (item: any) => `
        <entry>
          <title>${item.title}</title>
          <link href="${item.link}" />
          <id>${item.id}</id>
            <updated>${new Date(
              item.updated || new Date()
            ).toISOString()}</updated>
          <summary>${item.description}</summary>
          <content type="html"><![CDATA[${item.content || ""}]]></content>
             ${
               item.author
                 ? `<author><name>${item.author.name}</name>${
                     item.author.email
                       ? `<email>${item.author.email}</email>`
                       : ""
                   }${
                     item.author.link ? `<uri>${item.author.link}</uri>` : ""
                   }</author>`
                 : ""
             }
        </entry>`
        )
        .join("")}
    </feed>
  `.trim();
};
