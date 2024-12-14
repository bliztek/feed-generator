import { generateAtomFeed } from "../src/feeds/atomFeed";
import { generateRSSFeed } from "../src/feeds/rssFeed";
import { generateJSONFeed } from "../src/feeds/jsonFeed";
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
    expect(() => generateRSSFeed(invalidFeedData)).toThrow(
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

    const rss = generateRSSFeed(feedData as unknown as FeedData);

    // Verify that pubDate defaults to the current date
    expect(rss).toContain("<pubDate>");
    expect(rss).toContain(new Date().toUTCString()); // Current date
  });
});

describe("Error Conditions: Atom Template", () => {
  it("should throw an error if required fields are missing", () => {
    const invalidFeedData = {
      title: "",
      id: "",
      updated: "",
      author: { name: "" },
      items: [],
    };

    // Expect an error to be thrown for invalid data
    expect(() =>
      generateAtomFeed(invalidFeedData as unknown as FeedData)
    ).toThrow(
      "Invalid feed data: title, description, id, link, and author.name are required."
    );
  });

  it("should handle missing update dates by defaulting to current date", () => {
    const feedData = {
      title: "Feed Without Update Dates",
      description: "Testing missing dates.",
      id: "https://example.com/feed-without-dates",
      link: "https://example.com/post-without-date",
      updated: "",
      author: { name: "Author" },
      items: [
        {
          title: "Post Without Date",
          id: "https://example.com/post-without-date",
          link: "https://example.com",
          updated: "",
          summary: "This post has no updated date.",
          author: [{ name: "Post Author" }],
        },
      ],
    };

    const atom = generateAtomFeed(feedData as unknown as FeedData);

    // Verify that updated defaults to the current date
    expect(atom).toContain("<updated>");
    expect(atom).toContain(new Date().toISOString()); // Current date in ISO format
  });

  it("should include all entries with required fields only", () => {
    const feedData = {
      title: "Minimal Atom Feed",
      description: "Testing minimal atom feed.",
      id: "https://example.com/minimal-atom-feed",
      link: "https://example.com",
      updated: new Date().toISOString(),
      author: { name: "Feed Author" },
      items: [
        {
          title: "Post with Minimal Fields",
          id: "https://example.com/post-with-minimal-fields",
          updated: new Date().toISOString(),
        },
      ],
    };

    const atom = generateAtomFeed(feedData as unknown as FeedData);

    // Verify required fields are included
    expect(atom).toContain("<title>Minimal Atom Feed</title>");
    expect(atom).toContain("<id>https://example.com/minimal-atom-feed</id>");
    expect(atom).toContain("<updated>");
    expect(atom).toContain("<entry>");
    expect(atom).toContain("<title>Post with Minimal Fields</title>");
  });

  it("should handle multiple entries", () => {
    const feedData = {
      title: "Feed with Multiple Entries",
      description: "Testing multiple entry atom feed.",
      id: "https://example.com/multiple-entries",
      link: "https://example.com",
      updated: new Date().toISOString(),
      author: { name: "Feed Author" },
      items: [
        {
          title: "First Post",
          id: "https://example.com/first-post",
          updated: new Date().toISOString(),
          summary: "This is the first post.",
          link: "https://example.com/first-post",
          author: { name: "Author 1" },
        },
        {
          title: "Second Post",
          id: "https://example.com/second-post",
          updated: new Date().toISOString(),
          summary: "This is the second post.",
          link: "https://example.com/second-post",
          author: { name: "Author 2" },
        },
      ],
    };

    const atom = generateAtomFeed(feedData as unknown as FeedData);

    // Verify multiple entries and nested authors are included
    expect(atom).toContain("<entry>");
    expect(atom).toContain("<title>First Post</title>");
    expect(atom).toContain("<title>Second Post</title>");
    expect(atom).toContain("<author><name>Author 1</name></author>");
    expect(atom).toContain("<author><name>Author 2</name></author>");
  });
});

describe("JSON Template Generator", () => {
  it("should throw an error if required fields are missing in the feed", () => {
    const invalidFeedData: FeedData = {
      title: "",
      description: "",
      id: "",
      link: "",
      items: [],
    };

    expect(() => generateJSONFeed(invalidFeedData)).toThrow(
      "Invalid feed data: title, description, link, and author.name are required"
    );
  });

  it("should throw an error if required fields are missing in an item", () => {
    const feedData: FeedData = {
      title: "Feed Title",
      description: "Feed Description",
      id: "https://example.com/feed",
      link: "https://example.com",
      items: [
        {
          title: "Missing Fields",
          id: "",
          link: "",
          description: "",
          author: { name: "" },
          date: "",
        },
      ],
    };

    expect(() => generateJSONFeed(feedData)).toThrow(
      "Invalid feed data: title, description, link, and author.name are required"
    );
  });
});
