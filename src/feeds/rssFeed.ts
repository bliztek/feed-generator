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
    value ? `<${tag}>${value}</${tag}>` : "";

  // Generate <image> if provided
  const generateImage = (
    image: ImageElement | undefined,
    channelTitle: string
  ): string =>
    image
      ? `
      <image>
        <url>${image.url}</url>
        <title>${channelTitle}</title>
        <link>${image.link || ""}</link>
        ${image.width ? `<width>${image.width}</width>` : ""}
        ${image.height ? `<height>${image.height}</height>` : ""}
        ${
          image.description
            ? `<description>${image.description}</description>`
            : ""
        }
      </image>
    `
      : "";

  // Generate categories
  const generateCategories = (
    categories: { domain?: string; value: string }[] | undefined
  ): string => {
    if (!categories || categories.length === 0) return "";

    return categories
      .map(
        (cat) =>
          `<category${cat.domain ? ` domain="${cat.domain}"` : ""}>${
            cat.value
          }</category>`
      )
      .join("");
  };

  // Generate items
  const generateItems = (items: RSSItem[]): string =>
    items
      .map(
        (item) => `
        <item>
          <title>${item.title || "Untitled"}</title>
          <link>${item.link || ""}</link>
          <guid isPermaLink="${item.link ? "true" : "false"}">${
          item.guid?.value || item.link || ""
        }</guid>
          ${generateOptionalTag(
            "description",
            item.description ? `<![CDATA[${item.description}]]>` : undefined
          )}
          ${
            item.enclosure
              ? `<enclosure url="${item.enclosure.url}" type="${item.enclosure.type}" length="${item.enclosure.length}" />`
              : ""
          }
          <pubDate>${new Date(
            item.pubDate || lastBuildDate || new Date()
          ).toUTCString()}</pubDate>
          ${generateOptionalTag("comments", item.comments)}
          ${item.author ? `<author>${item.author}</author>` : ""}
          ${generateCategories(category)}
          ${generateCategories(item.category)}        
        </item>
      `
      )
      .join("");

  const selfLink = feedLinks?.atom || `${link}/rss.xml`;
  const atomLink = `<atom:link href="${selfLink}" rel="self" type="application/rss+xml" />`;

  // Generate feed
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
        ${generateOptionalTag("language", language)}
        ${generateImage(image, title)}
        ${generateOptionalTag("copyright", copyright)}
        ${generateOptionalTag("lastBuildDate", lastBuildDate)}
        ${generateOptionalTag("generator", generator)}
        ${generateOptionalTag("docs", docs)}
        ${generateOptionalTag("managingEditor", managingEditor)}
        ${generateOptionalTag("webMaster", webMaster)}
        ${generateCategories(category || [])}
        ${generateOptionalTag("ttl", ttl ? ttl.toString() : undefined)}
        ${
          cloud
            ? `<cloud domain="${cloud.domain}" port="${cloud.port}" path="${cloud.path}" registerProcedure="${cloud.registerProcedure}" protocol="${cloud.protocol}" />`
            : ""
        }
        ${
          skipHours
            ? `
          <skipHours>
            ${skipHours.map((hour) => `<hour>${hour}</hour>`).join("")}
          </skipHours>`
            : ""
        }
        ${
          skipDays
            ? `
          <skipDays>
            ${skipDays.map((day) => `<day>${day}</day>`).join("")}
          </skipDays>`
            : ""
        }
        ${atomLink}
        ${generateItems(items)}
      </channel>
    </rss>
  `.trim();
};
