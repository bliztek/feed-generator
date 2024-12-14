import fs from "fs";
import path from "path";
import { generateJSONTemplate } from "../src/templates/jsonTemplate";
import { testData } from "./test-data";

describe("JSON Template", () => {
  const outputPath = path.resolve(__dirname, "../test-output/feed.json");

  it("should generate a valid JSON feed and write it to a file", () => {
    const jsonFeed = generateJSONTemplate(testData);

    // Write to file
    fs.writeFileSync(outputPath, jsonFeed, "utf-8");

    // Validate basic content
    const parsedFeed = JSON.parse(jsonFeed);
    expect(parsedFeed.title).toBe("Tech News Feed");
    expect(parsedFeed.items[0].title).toBe("Tech Post 1");
  });
});
