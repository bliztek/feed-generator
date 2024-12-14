import { generateAtomFeed } from "../src/feeds/atomFeed";
import fs from "fs";
import path from "path";
import { atomTestData } from "./test-data";

describe("generateAtomFeed", () => {
  const outputPath = path.resolve(__dirname, "../test-output/atom-feed.xml");

  it("should generate a valid Atom feed and write it to a file", () => {
    const atom = generateAtomFeed(atomTestData);

    // Write the Atom feed to a file
    fs.writeFileSync(outputPath, atom, "utf-8");

    // Verify the file content
    expect(fs.existsSync(outputPath)).toBe(true);

    // Basic feed-level validations
    expect(atom).toContain('<title type="text">My Complete Atom Feed</title>');

    expect(atom).toContain(
      '<subtitle type="text">A detailed example of an Atom feed with all optional fields.</subtitle>'
    );
    expect(atom).toContain(
      '<rights type="text">Copyright 2024, Example Corp</rights>'
    );

    // Validate generator
    expect(atom).toContain(
      '<generator uri="https://example.com/generator" version="1.0">Example Generator</generator>'
    );

    // Validate `<author>` elements
    expect(atom).toContain("<author>");
    expect(atom).toContain("<name>Jane Editor</name>");
    expect(atom).toContain("<email>editor@example.com</email>");
    expect(atom).toContain("<name>John Webmaster</name>");
    expect(atom).toContain("<email>webmaster@example.com</email>");
    expect(atom).toContain("</author>");

    // Validate `<entry>` elements
    // Validate `<entry>` elements
    expect(atom).toContain("<entry>");
    expect(atom).toContain('<title type="text">First Article</title>');
    expect(atom).toContain("<id>https://example.com/articles/1</id>");
    expect(atom).toContain(
      '<link href="https://example.com/articles/1" rel="alternate" type="text/html" />'
    );
    expect(atom).toContain(
      '<category term="Tutorials" scheme="https://example.com/categories" label="Tutorials" />'
    );
    expect(atom).toContain(
      '<content src="https://example.com/articles/1/content" type="text/html" />'
    );
    expect(atom).toContain(
      '<summary type="text">This is the first article.</summary>'
    );

    expect(atom).toContain('<title type="text">Second Article</title>');
    expect(atom).toContain("<id>https://example.com/articles/2</id>");
    expect(atom).toContain(
      '<content type="html">This article contains inline content.</content>'
    );
    expect(atom).toContain(
      '<summary type="text">This is the second article with more detail.</summary>'
    );
    expect(atom).toContain("</entry>");
  });
});

describe("Edge Cases: Handling Optional and Rare Fields", () => {
  it("should include `<generator>` when specified", () => {
    const atom = generateAtomFeed(atomTestData);

    expect(atom).toContain(
      '<generator uri="https://example.com/generator" version="1.0">Example Generator</generator>'
    );
  });

  it("should include multiple `<author>` elements when provided", () => {
    const atom = generateAtomFeed(atomTestData);

    expect(atom).toContain("<author>");
    expect(atom).toContain("<name>Jane Editor</name>");
    expect(atom).toContain("<name>John Webmaster</name>");
    expect(atom).toContain("</author>");
  });

  it("should handle multiple categories per entry", () => {
    const atom = generateAtomFeed(atomTestData);

    expect(atom).toContain(
      '<category term="Tutorials" scheme="https://example.com/categories" label="Tutorials" />'
    );
  });

  it("should handle content with both `src` and `type` attributes", () => {
    const atom = generateAtomFeed(atomTestData);

    expect(atom).toContain(
      '<content src="https://example.com/articles/1/content" type="text/html" />'
    );
  });
});

describe("Error Conditions: Handling Invalid Inputs", () => {
  it("should throw an error if required fields are missing", () => {
    const invalidFeedData = {
      title: { type: "text", value: "" },
      updated: "",
      id: "",
      entries: [],
    };

    expect(() => generateAtomFeed(invalidFeedData as any)).toThrow(
      "Invalid feed data: title, updated, and id are required."
    );
  });
});

describe("File Output: Writing and Reading Atom Files", () => {
  const outputPath = path.resolve(
    __dirname,
    "../test-output/atom-feed-test.xml"
  );

  it("should write the Atom feed to a file", () => {
    const atom = generateAtomFeed(atomTestData);
    fs.writeFileSync(outputPath, atom, "utf-8");

    // Verify file existence
    expect(fs.existsSync(outputPath)).toBe(true);

    // Verify file content
    const fileContent = fs.readFileSync(outputPath, "utf-8");
    expect(fileContent).toContain("<feed");
    expect(fileContent).toContain("<entry>");
  });

  afterAll(() => {
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
  });
});
