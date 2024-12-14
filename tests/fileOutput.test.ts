import fs from "fs";
import path from "path";
import { generateRSSTemplate } from "../src/templates/rssTemplate";
import { FeedData } from "../src/types";

describe("File Output: Writing and Reading RSS Files", () => {
  const outputPath = path.resolve(
    __dirname,
    "../test-output/rss-feed-test.xml"
  );

  it("should write the RSS feed to a file", () => {
    const feedData: FeedData = {
      title: "File Output Feed",
      description: "Testing file output.",
      id: "https://example.com/file-output-feed",
      link: "https://example.com",
      author: { name: "File Output Author" },
      items: [],
    };

    const rss = generateRSSTemplate(feedData);
    fs.writeFileSync(outputPath, rss, "utf-8");

    // Verify file existence
    expect(fs.existsSync(outputPath)).toBe(true);

    // Verify file content
    const fileContent = fs.readFileSync(outputPath, "utf-8");
    expect(fileContent).toContain("<rss");
    expect(fileContent).toContain("<channel>");
  });

  afterAll(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });
});
