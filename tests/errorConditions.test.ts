import { generateRSSTemplate } from "../src/templates/rssTemplate";
import { FeedData } from "../src/types";

describe("Error Conditions: Handling Invalid Inputs", () => {
  it("should throw an error if required fields are missing", () => {
    const invalidFeedData: FeedData = {
      title: "",
      description: "",
      id: "",
      link: "",
      author: { name: "" },
      items: [],
    };

    // Expect an error to be thrown for invalid data
    expect(() => generateRSSTemplate(invalidFeedData)).toThrow(
      "Invalid feed data: title, description, id, link, and author.name are required."
    );
  });

  it("should handle missing dates by defaulting to current date", () => {
    const feedData = {
      title: "Feed Without Dates",
      description: "Testing missing dates.",
      id: "https://example.com/feed-without-dates",
      link: "https://example.com",
      author: { name: "Author" },
      items: [
        {
          title: "Post Without Date",
          id: "https://example.com/post-without-date",
          link: "https://example.com/post-without-date",
          description: "This post has no date.",
          author: [{ name: "Post Author" }],
        },
      ],
    };

    const rss = generateRSSTemplate(feedData as unknown as FeedData);

    // Verify that pubDate defaults to the current date
    expect(rss).toContain("<pubDate>");
    expect(rss).toContain(new Date().toUTCString()); // Current date
  });
});
