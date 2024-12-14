import fs from "fs";
import path from "path";
import { testData } from "./test-data";
import { generateAtomFeed } from "../src/feeds/atomFeed";

describe("Atom Template", () => {
  const outputPath = path.resolve(__dirname, "../test-output/atom-feed.xml");

  it("should generate a valid Atom feed and write it to a file", () => {
    const atomFeed = generateAtomFeed(testData);

    // Write to file
    fs.writeFileSync(outputPath, atomFeed, "utf-8");

    // Validate basic content
    expect(atomFeed).toContain(`<title>Tech News Feed</title>`);
    expect(atomFeed).toContain(`<updated>2024-12-14T12:00:00Z</updated>`);
  });
});
