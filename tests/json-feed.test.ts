import { generateJSONFeed } from "../src/feeds/jsonFeed";
import fs from "fs";
import path from "path";
import { jsonTestData } from "./test-data";

describe("generateJSONFeed", () => {
  const outputPath = path.resolve(__dirname, "../test-output/json-feed.json");

  it("should generate a valid JSON feed and write it to a file", () => {
    const json = generateJSONFeed(jsonTestData);

    // Write the JSON feed to a file
    fs.writeFileSync(outputPath, json, "utf-8");

    // Verify the file content
    expect(fs.existsSync(outputPath)).toBe(true);

    const parsedFeed = JSON.parse(json);

    // Basic feed-level validations
    expect(parsedFeed.version).toBe("https://jsonfeed.org/version/1.1");
    expect(parsedFeed.title).toBe("Comprehensive JSON Feed");
    expect(parsedFeed.home_page_url).toBe("https://example.com");
    expect(parsedFeed.feed_url).toBe("https://example.com/feed.json");
    expect(parsedFeed.description).toBe(
      "A detailed example JSON Feed using all possible fields."
    );
    expect(parsedFeed.user_comment).toBe(
      "This feed allows you to read the posts from this site in any feed reader that supports the JSON Feed format."
    );
    expect(parsedFeed.next_url).toBe("https://example.com/feed.json?page=2");
    expect(parsedFeed.icon).toBe("https://example.com/images/feed-icon.png");
    expect(parsedFeed.favicon).toBe("https://example.com/images/favicon.ico");
    expect(parsedFeed.language).toBe("en-US");
    expect(parsedFeed.expired).toBe(false);

    // Validate authors
    expect(parsedFeed.authors).toHaveLength(2);
    expect(parsedFeed.authors[0]).toEqual({
      name: "Jane Doe",
      url: "https://example.com/authors/jane",
      avatar: "https://example.com/images/jane-avatar.png",
    });
    expect(parsedFeed.authors[1]).toEqual({
      name: "John Smith",
      url: "https://example.com/authors/john",
      avatar: "https://example.com/images/john-avatar.png",
    });

    // Validate hubs
    expect(parsedFeed.hubs).toHaveLength(1);
    expect(parsedFeed.hubs[0]).toEqual({
      type: "WebSub",
      url: "https://example.com/hub",
    });

    // Validate items
    expect(parsedFeed.items).toHaveLength(2);

    const firstItem = parsedFeed.items[0];
    expect(firstItem.id).toBe("https://example.com/posts/1");
    expect(firstItem.url).toBe("https://example.com/posts/1");
    expect(firstItem.external_url).toBe("https://another.com/posts/1");
    expect(firstItem.title).toBe("First Post");
    expect(firstItem.content_html).toContain("<p>This is the first post.</p>");
    expect(firstItem.content_text).toBe(
      "This is the first post. It includes plain text."
    );
    expect(firstItem.summary).toBe("A summary of the first post.");
    expect(firstItem.image).toBe("https://example.com/images/post1-image.jpg");
    expect(firstItem.banner_image).toBe(
      "https://example.com/images/post1-banner.jpg"
    );
    expect(firstItem.date_published).toBe("2024-12-14T12:00:00Z");
    expect(firstItem.date_modified).toBe("2024-12-15T12:00:00Z");
    expect(firstItem.authors).toHaveLength(1);
    expect(firstItem.authors[0]).toEqual({
      name: "Jane Doe",
      url: "https://example.com/authors/jane",
      avatar: "https://example.com/images/jane-avatar.png",
    });
    expect(firstItem.tags).toEqual(["tech", "news"]);
    expect(firstItem.language).toBe("en-GB");

    const firstAttachment = firstItem.attachments[0];
    expect(firstAttachment).toEqual({
      url: "https://example.com/audio/podcast1.mp3",
      mime_type: "audio/mpeg",
      title: "Podcast Episode 1",
      size_in_bytes: 10485760,
      duration_in_seconds: 3600,
    });

    const secondItem = parsedFeed.items[1];
    expect(secondItem.id).toBe("https://example.com/posts/2");
    expect(secondItem.url).toBe("https://example.com/posts/2");
    expect(secondItem.title).toBe("Second Post");
    expect(secondItem.content_html).toContain(
      "<p>This is the second post.</p>"
    );
    expect(secondItem.date_published).toBe("2024-12-14T13:00:00Z");
    expect(secondItem.authors[0]).toEqual({
      name: "John Smith",
      url: "https://example.com/authors/john",
    });
  });

  afterAll(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });
});

describe("Error Conditions: Handling Invalid Inputs", () => {
  it("should throw an error if required fields are missing", () => {
    const invalidFeedData = {
      version: "https://jsonfeed.org/version/1.1",
      title: "",
      items: [],
    };

    expect(() => generateJSONFeed(invalidFeedData as any)).toThrow(
      "Invalid feed data: title and items are required."
    );
  });

  it("should handle missing optional fields gracefully", () => {
    const feedData = {
      version: "https://jsonfeed.org/version/1.1",
      title: "Minimal JSON Feed",
      items: [
        {
          id: "https://example.com/minimal-post",
          content_html: "<p>This is a minimal post.</p>",
        },
      ],
    };

    const json = generateJSONFeed(feedData as any);
    const parsedFeed = JSON.parse(json);

    expect(parsedFeed.title).toBe("Minimal JSON Feed");
    expect(parsedFeed.items[0].id).toBe("https://example.com/minimal-post");
    expect(parsedFeed.items[0].content_html).toBe(
      "<p>This is a minimal post.</p>"
    );
  });
});
