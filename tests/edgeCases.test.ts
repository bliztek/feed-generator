import { generateRSSFeed } from "../src/feeds/rssFeed";
import { FeedData } from "../src/types";

describe("Edge Cases: Handling Optional and Rare Fields", () => {
  it("should include <comments> when specified", () => {
    const feedData: FeedData = {
      title: "Feed with Comments",
      description: "This feed has comments.",
      id: "https://example.com/comments-feed",
      link: "https://example.com",
      author: { name: "Comments Author" },
      items: [
        {
          title: "Post with Comments",
          id: "https://example.com/post-with-comments",
          link: "https://example.com/post-with-comments",
          description: "A post with comments.",
          date: "2024-12-14T12:00:00Z",
          author: { name: "Jane Doe" },
          comments: "https://example.com/post-with-comments#comments",
        },
      ],
    };

    const rss = generateRSSFeed(feedData);

    // Verify the <comments> field is included
    expect(rss).toContain(
      "<comments>https://example.com/post-with-comments#comments</comments>"
    );
  });

  it("should include multiple categories if provided", () => {
    const feedData: FeedData = {
      title: "Feed with Categories",
      description: "This feed has categories.",
      id: "https://example.com/categories-feed",
      link: "https://example.com",
      author: { name: "Categories Author" },
      items: [
        {
          title: "Post with Categories",
          id: "https://example.com/post-with-categories",
          link: "https://example.com/post-with-categories",
          description: "A post with categories.",
          date: "2024-12-14T12:00:00Z",
          author: { name: "John Doe" },
          categories: ["Tech", "News"],
        },
      ],
    };

    const rss = generateRSSFeed(feedData);

    // Verify that all categories are included
    expect(rss).toContain("<category>Tech</category>");
    expect(rss).toContain("<category>News</category>");
  });
});
