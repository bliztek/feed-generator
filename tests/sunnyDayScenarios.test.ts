import { generateRSSTemplate } from "../src/templates/rssTemplate";
import { FeedData } from "../src/types";

describe("Sunny Day Scenarios: RSS Feed Generation", () => {
  it("should generate a valid RSS feed with all required fields", () => {
    const feedData: FeedData = {
      title: "Tech News Feed",
      description: "Latest updates in the tech world",
      id: "https://example.com/rss-feed",
      link: "https://example.com",
      author: { name: "Tech News Team" },
      items: [],
    };

    const rss = generateRSSTemplate(feedData);

    // Check that the feed contains the required fields
    expect(rss).toContain("<title>Tech News Feed</title>");
    expect(rss).toContain("<link>https://example.com</link>");
    expect(rss).toContain(
      "<description>Latest updates in the tech world</description>"
    );
    expect(rss).toContain("<rss");
    expect(rss).toContain("<channel>");
  });

  it("should include <item> elements when provided", () => {
    const feedData: FeedData = {
      title: "Tech News Feed",
      description: "Latest updates in the tech world",
      id: "https://example.com/rss-feed",
      link: "https://example.com",
      author: { name: "Tech News Team" },
      items: [
        {
          title: "Tech Post",
          id: "https://example.com/tech-post",
          link: "https://example.com/tech-post",
          description: "A summary of the tech post.",
          date: "2024-12-14T12:00:00Z",
          author: { name: "Jane Smith" },
        },
      ],
    };

    const rss = generateRSSTemplate(feedData);

    // Verify that the <item> structure is included correctly
    expect(rss).toContain("<item>");
    expect(rss).toContain("<title>Tech Post</title>");
    expect(rss).toContain(
      "<description><![CDATA[A summary of the tech post.]]></description>"
    );
    expect(rss).toContain("<link>https://example.com/tech-post</link>");
    expect(rss).toContain("<author>Jane Smith</author>");
  });
});
