import { ImageElement, RSSFeed, RSSItem } from "../types";

export const generateRSSFeed = (feedData: RSSFeed): string => {
  const {
    title,
    link,
    description,
    language,
    image,
    copyright,
    lastBuildDate,
    generator = "Bliztek RSS Generator",
    docs,
    managingEditor,
    webMaster,
    category,
    cloud,
    ttl,
    skipHours,
    skipDays,
    items = [],
    feedLinks,
  } = feedData;

  // Validate required fields
  if (!title || !description || !link) {
    throw new Error(
      "Invalid feed data: title, description, and link are required."
    );
  }

  // Helper to generate optional tags
  const generateOptionalTag = (tag: string, value?: string): string =>
    value ? `\t\t<${tag}>${value}</${tag}>` : "";

  // Generate <image> if provided
  const generateImage = (
    image: ImageElement | undefined,
    channelTitle: string
  ): string =>
    image
      ? `\t\t<image>
  \t\t<url>${image.url}</url>
  \t\t\t<title>${channelTitle}</title>
  \t\t\t<link>${image.link || ""}</link>
  ${image.width ? `\t\t\t<width>${image.width}</width>` : ""}
  ${image.height ? `\t\t\t<height>${image.height}</height>` : ""}
  ${
    image.description
      ? `\t\t\t<description>${image.description}</description>`
      : ""
  }
\t\t</image>`
      : "";

  // Generate categories
  const generateCategories = (
    categories: { domain?: string; value: string }[] | undefined
  ): string => {
    if (!categories || categories.length === 0) return "";

    return categories
      .map(
        (cat) =>
          `\t\t<category${cat.domain ? ` domain="${cat.domain}"` : ""}>${
            cat.value
          }</category>`
      )
      .join("");
  };

  // Generate items
  const generateItems = (items: RSSItem[]): string =>
    items
      .map((item) => {
        const itemParts: string[] = [
          `\t\t<item>`,
          `\t<title>${item.title?.trim() || "Untitled"}</title>`,
          `\t<link>${item.link?.trim() || ""}</link>`,
          `\t<guid isPermaLink="${item.link ? "true" : "false"}">${
            item.guid?.value?.trim() || item.link?.trim() || ""
          }</guid>`,
          `\t${generateOptionalTag(
            "description",
            item.description
              ? `<![CDATA[${item.description.trim()}]]>`
              : undefined
          )}`,
          item.enclosure
            ? `\t<enclosure url="${item.enclosure.url.trim()}" type="${item.enclosure.type.trim()}" length="${
                item.enclosure.length
              }" />`
            : "",
          `\t<pubDate>${new Date(
            item.pubDate || lastBuildDate || new Date()
          ).toUTCString()}</pubDate>`,
          `\t${generateOptionalTag("comments", item.comments?.trim())}`,
          item.author ? `\t<author>${item.author.trim()}</author>` : "",
          `\t${generateCategories(item.category)}`,
          `</item>`,
        ];

        // Filter empty parts and join
        return itemParts.filter((part) => part.trim()).join("\n\t\t");
      })
      .join("\t\n");

  const selfLink = feedLinks?.atom || `${link}/atom.xml`;
  const atomLink = `\t\t<atom:link href="${selfLink}" rel="self" type="application/atom+xml" />`;
  // Assembling the feed dynamically
  const feedParts: string[] = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<rss version="2.0" 
         xmlns:atom="http://www.w3.org/2005/Atom" 
         xmlns:content="http://purl.org/rss/1.0/modules/content/" 
         xmlns:dc="http://purl.org/dc/elements/1.1/">`,
    `\t<channel>`,
    `\t\t<title>${title.trim()}</title>`,
    `\t\t<link>${link.trim()}</link>`,
    `\t\t<description>${description.trim()}</description>`,
    generateOptionalTag("language", language?.trim()),
    generateImage(image, title),
    generateOptionalTag("copyright", copyright?.trim()),
    generateOptionalTag("lastBuildDate", lastBuildDate?.trim()),
    generateOptionalTag("generator", generator?.trim()),
    generateOptionalTag("docs", docs?.trim()),
    generateOptionalTag("managingEditor", managingEditor?.trim()),
    generateOptionalTag("webMaster", webMaster?.trim()),
    generateCategories(category || []),
    generateOptionalTag("ttl", ttl ? ttl.toString().trim() : undefined),
    cloud
      ? `\t\t<cloud domain="${cloud.domain.trim()}" port="${
          cloud.port
        }" path="${cloud.path.trim()}" registerProcedure="${cloud.registerProcedure.trim()}" protocol="${cloud.protocol.trim()}" />`
      : "",
    skipHours?.length
      ? `\t\t<skipHours>${skipHours
          .map((hour) => `<hour>${hour}</hour>`)
          .join("")}</skipHours>`
      : "",
    skipDays?.length
      ? `\t\t<skipDays>${skipDays
          .map((day) => `<day>${day}</day>`)
          .join("")}</skipDays>`
      : "",
    atomLink,
    generateItems(items),
    `\t</channel>`,
    `</rss>`,
  ];

  // Join non-empty parts, ensuring no extra lines
  return feedParts
    .filter((part) => part.trim())
    .join("\n")
    .trim();
};
