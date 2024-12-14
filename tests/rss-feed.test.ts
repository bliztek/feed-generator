import { generateRSSTemplate } from "../src/templates/rssTemplate";
import fs from "fs";
import path from "path";
import { testData } from "./test-data";

describe("generateRSSTemplate", () => {
  const outputPath = path.resolve(__dirname, "../test-output/rss-feed.xml");

  it("should generate a valid RSS feed and write it to a file", () => {
    // Generate the RSS feed
    const rss = generateRSSTemplate(testData);

    // Write the RSS to a file
    fs.writeFileSync(outputPath, rss, "utf-8");

    // Verify the file was created
    const fileExists = fs.existsSync(outputPath);
    expect(fileExists).toBe(true);

    // Validate specific parts of the RSS feed (basic validation)
    expect(rss).toContain("<title>Tech News Feed</title>");
    expect(rss).toContain("<link>https://example.com</link>");
    expect(rss).toContain(
      "<description>Latest updates in the tech world</description>"
    );
  });
});
