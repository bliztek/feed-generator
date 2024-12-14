import { FeedData } from "../types";

export const generateRSSTemplate = (feedData: FeedData): string => {
  const {
    title = "Default Feed Title",
    description = "Default feed description",
    link = "",
    id = link,
    language = "en",
    image,
    copyright = "",
    updated = new Date().toISOString(),
    generator = "Custom RSS Generator",
    feedLinks = {},
    author = { name: "Unknown Author" },
    items = [],
    categories = [],
    contributors = [],
  } = feedData;

  // Validate required fields
  if (!title || !description || !id || !link || !author?.name) {
    throw new Error(
      "Invalid feed data: title, description, id, link, and author.name are required."
    );
  }

  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom" 
     xmlns:content="http://purl.org/rss/1.0/modules/content/" 
     xmlns:dc="http://purl.org/dc/elements/1.1/">
      <channel>
        <title>${title}</title>
        <link>${link}</link>
        <description>${description}</description>
        <language>${language}</language>
        ${
          image
            ? `
        <image>
          <url>${image}</url>
          <title>${title}</title>
          <link>${link}</link>
        </image>`
            : ""
        }
        <copyright>${copyright}</copyright>
        <lastBuildDate>${new Date(updated).toUTCString()}</lastBuildDate>
        <generator>${generator}</generator>
        <docs>${link}/rss-spec</docs>
        <ttl>60</ttl>
        <atom:link href="${
          feedLinks.atom || `${link}/rss.xml`
        }" rel="self" type="application/rss+xml" />
        <managingEditor>${
          author.email ? `${author.email} (${author.name})` : author.name
        }</managingEditor>
          ${
            categories
              .map((category) => `<category>${category}</category>`)
              .join("") ?? ""
          }
        ${
          contributors
            .map(
              (contributor) =>
                `<dc:contributor>${contributor.name}</dc:contributor>`
            )
            .join("") ?? ""
        }
        ${items
          .map(
            (item) => `
          <item>
            <title>${item.title || "Untitled"}</title>
            <link>${item.link || ""}</link>
            <guid isPermaLink="${item.link ? "true" : "false"}">${
              item.id || item.link || ""
            }</guid>
            <description><![CDATA[${item.description || ""}]]></description>
            ${
              item.content
                ? `<content:encoded><![CDATA[${item.content}]]></content:encoded>`
                : ""
            }
            <pubDate>${new Date(item.date || updated).toUTCString()}</pubDate>
            ${
              item.enclosure
                ? `<enclosure url="${item.enclosure.url}" type="${item.enclosure.type}" length="${item.enclosure.length}" />`
                : ""
            }

            ${item.comments && `<comments>${item.comments}</comments>`}
            ${
              item.author
                ? `<author>${
                    item.author.email
                      ? `${item.author.email} (${item.author.name})`
                      : item.author.name
                  }</author>`
                : ""
            }
            ${
              item.categories
                ?.map((category) => `<category>${category}</category>`)
                .join("") ?? ""
            }
          </item>`
          )

          .join("")}
      </channel>
    </rss>
  `.trim();
};
