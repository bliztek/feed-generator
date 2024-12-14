import { generateRSSFeed } from "../src/feeds/rssFeed";
import fs from "fs";
import path from "path";
import { rssTestData } from "./test-data";
import { RSSFeed } from "../src/types";

describe("generateRSSFeed", () => {
  const outputPath = path.resolve(__dirname, "../test-output/rss-feed.xml");

  it("should generate a valid RSS feed and write it to a file", () => {
    const rss = generateRSSFeed(rssTestData);

    // Write the RSS to a file
    fs.writeFileSync(outputPath, rss, "utf-8");

    // Verify the file content
    expect(fs.existsSync(outputPath)).toBe(true);

    // Basic feed-level validations
    expect(rss).toContain("<title>My Complete RSS Feed</title>");
    expect(rss).toContain("<link>https://example.com</link>");
    expect(rss).toContain(
      "<description>A detailed example of an RSS feed with all optional fields.</description>"
    );
    expect(rss).toContain("<language>en-us</language>");
    expect(rss).toContain(
      '<atom:link href="https://example.com/rss.xml" rel="self" type="application/rss+xml" />'
    );

    // Validate `<image>` element
    expect(rss).toContain("<image>");
    expect(rss).toContain("<url>https://example.com/logo.png</url>");
    expect(rss).toContain("<width>144</width>");
    expect(rss).toContain("<height>400</height>");
    expect(rss).toContain("</image>");

    // Validate `<item>` elements
    expect(rss).toContain("<item>");
    expect(rss).toContain("<title>First Article</title>");
    expect(rss).toContain("<author>author@example.com (Author One)</author>");
    expect(rss).toContain("<title>Second Article</title>");
    expect(rss).toContain("</item>");
  });
});

describe("Edge Cases: Handling Optional and Rare Fields", () => {
  it("should include <comments> when specified", () => {
    const feedData: RSSFeed = {
      title: "Feed with Comments",
      link: "https://example.com",
      description: "This feed has comments.",
      feedLinks: { atom: "https://example.com/comments-feed/rss.xml" },
      items: [
        {
          title: "Post with Comments",
          link: "https://example.com/post-with-comments",
          description: "A post with comments.",
          pubDate: "Sat, 14 Dec 2024 12:00:00 GMT",
          guid: { value: "https://example.com/post-with-comments" },
          comments: "https://example.com/post-with-comments#comments",
        },
      ],
    };

    const rss = generateRSSFeed(feedData);
    expect(rss).toContain(
      "<comments>https://example.com/post-with-comments#comments</comments>"
    );
  });

  it("should include multiple categories if provided", () => {
    const feedData: RSSFeed = {
      title: "Feed with Categories",
      link: "https://example.com",
      description: "This feed has categories.",
      feedLinks: { atom: "https://example.com/categories-feed/rss.xml" },
      items: [
        {
          title: "Post with Categories",
          link: "https://example.com/post-with-categories",
          description: "A post with categories.",
          pubDate: "Sat, 14 Dec 2024 12:00:00 GMT",
          guid: { value: "https://example.com/post-with-categories" },
          category: [
            { domain: "https://example.com/tech", value: "Tech" },
            { domain: "https://example.com/news", value: "News" },
          ],
        },
      ],
    };

    const rss = generateRSSFeed(feedData);
    expect(rss).toContain(
      '<category domain="https://example.com/tech">Tech</category>'
    );
    expect(rss).toContain(
      '<category domain="https://example.com/news">News</category>'
    );
  });
});

describe("Error Conditions: Handling Invalid Inputs", () => {
  it("should throw an error if required fields are missing", () => {
    const invalidFeedData: RSSFeed = {
      title: "",
      link: "",
      description: "",
      feedLinks: { atom: "" },
      items: [],
    };

    expect(() => generateRSSFeed(invalidFeedData)).toThrow(
      "Invalid feed data: title, description, and link are required."
    );
  });

  it("should handle missing dates by defaulting to current date", () => {
    const feedData: RSSFeed = {
      title: "Feed Without Dates",
      link: "https://example.com",
      description: "Testing missing dates.",
      feedLinks: { atom: "https://example.com/feed-without-dates/rss.xml" },
      items: [
        {
          title: "Post Without Date",
          link: "https://example.com/post-without-date",
          description: "This post has no date.",
        },
      ],
    };

    const rss = generateRSSFeed(feedData);

    // Verify that pubDate defaults to the current date
    const currentDate = new Date().toUTCString();
    expect(rss).toContain("<pubDate>");
    expect(rss).toContain(currentDate.substring(0, currentDate.length - 3)); // Allow for second differences
  });
});
