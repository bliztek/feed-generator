# Feed Generator: RSS, Atom, JSON

A simple and lightweight Node.js library for generating **RSS 2.0**, **Atom**, and **JSON Feed** formats. Perfect for syndicating content in blogs, news sites, or any platform that needs standardized feed formats.

---

## Features

- Generate valid **RSS 2.0**, **Atom**, and **JSON Feed** outputs.
- Easy-to-use API for creating feeds.
- Fully customizable feed metadata and entries.
- Outputs that pass online validation (e.g., W3C Feed Validator, JSON Feed Validator).
- No external dependencies.

---

## Installation

Install the package via npm:

```bash
npm install @bliztek/feed-generator
```

Or using Yarn:

```bash
yarn add @bliztek/feed-generator
```

---

## Usage

### 1. Import the Feed Generators

```typescript
import {
  generateRSS,
  generateAtom,
  generateJSON,
  FeedData,
} from "@bliztek/feed-generator";
```

### 2. Define Your Feed Data

The `FeedData` type provides a standard structure for your feed:

```typescript
const feedData: FeedData = {
  title: "My Blog Feed",
  description: "The latest articles from my blog.",
  id: "https://example.com/feed",
  link: "https://example.com",
  updated: "2024-12-14T12:00:00Z",
  author: {
    name: "John Doe",
    email: "john@example.com",
    link: "https://example.com/about",
  },
  items: [
    {
      title: "First Post",
      id: "https://example.com/post-1",
      link: "https://example.com/post-1",
      description: "A summary of the first post.",
      content: "<p>The full content of the first post.</p>",
      date: "2024-12-14T10:00:00Z",
    },
  ],
};
```

### 3. Generate Feeds

#### Generate RSS Feed

```typescript
const rss = generateRSS(feedData);
console.log(rss);
```

#### Generate Atom Feed

```typescript
const atom = generateAtom(feedData);
console.log(atom);
```

#### Generate JSON Feed

```typescript
const json = generateJSON(feedData);
console.log(json);
```

---

## Feed Validation

To ensure your feeds are valid, use the following online tools:

- **RSS/Atom Validator:** [W3C Feed Validator](https://validator.w3.org/feed/)
- **JSON Feed Validator:** [JSON Feed Validator](https://validator.jsonfeed.org/)

You can copy and paste the generated feed output into these tools for validation.

---

## API Reference

### `generateRSS(feedData: FeedData): string`

Generates an RSS 2.0 feed.

- **Input:** `FeedData` object.
- **Output:** A string containing the RSS XML.

---

### `generateAtom(feedData: FeedData): string`

Generates an Atom feed.

- **Input:** `FeedData` object.
- **Output:** A string containing the Atom XML.

---

### `generateJSON(feedData: FeedData): string`

Generates a JSON Feed.

- **Input:** `FeedData` object.
- **Output:** A string containing the JSON Feed.

---

### FeedData Type

#### Example

```typescript
const feedData: FeedData = {
  title: "Feed Title", // Required
  description: "Feed Description", // Required
  id: "https://example.com/feed", // Required
  link: "https://example.com", // Required
  updated: "2024-12-14T12:00:00Z", // Optional, defaults to current date
  author: {
    name: "Author Name", // Required
    email: "author@example.com", // Optional
    link: "https://example.com/author", // Optional
  },
  items: [
    {
      title: "Post Title", // Required
      id: "https://example.com/post-1", // Required
      link: "https://example.com/post-1", // Required
      description: "Post summary.", // Required
      content: "<p>Full content of the post.</p>", // Optional
      date: "2024-12-14T10:00:00Z", // Required
    },
  ],
};
```

---

## Examples

### RSS Feed Output

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>My Blog Feed</title>
    <link>https://example.com</link>
    <description>The latest articles from my blog.</description>
    <lastBuildDate>Sat, 14 Dec 2024 12:00:00 GMT</lastBuildDate>
    <item>
      <title>First Post</title>
      <link>https://example.com/post-1</link>
      <description>A summary of the first post.</description>
      <pubDate>Sat, 14 Dec 2024 10:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>
```

### Atom Feed Output

```xml
<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>My Blog Feed</title>
  <subtitle>The latest articles from my blog.</subtitle>
  <link href="https://example.com" />
  <id>https://example.com/feed</id>
  <updated>2024-12-14T12:00:00Z</updated>
  <author>
    <name>John Doe</name>
    <email>john@example.com</email>
    <uri>https://example.com/about</uri>
  </author>
  <entry>
    <title>First Post</title>
    <link href="https://example.com/post-1" />
    <id>https://example.com/post-1</id>
    <updated>2024-12-14T10:00:00Z</updated>
    <summary>A summary of the first post.</summary>
    <content type="html"><![CDATA[<p>The full content of the first post.</p>]]></content>
  </entry>
</feed>
```

### JSON Feed Output

```json
{
  "version": "https://jsonfeed.org/version/1",
  "title": "My Blog Feed",
  "home_page_url": "https://example.com",
  "feed_url": "https://example.com/feed.json",
  "items": [
    {
      "id": "https://example.com/post-1",
      "url": "https://example.com/post-1",
      "title": "First Post",
      "summary": "A summary of the first post.",
      "content_html": "<p>The full content of the first post.</p>",
      "date_published": "2024-12-14T10:00:00Z"
    }
  ]
}
```

---

## Contributing

Contributions are welcome! If you'd like to improve this package:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push your branch and open a Pull Request.

---

## More Information

- Follow [@Dev4TheWeb](https://x.com/Dev4TheWeb) on Twitter/X for updates from the creator
- Follow [@Bliztek](https://x.com/bliztek) on Twitter/X for updates from the company side
- Read our [Company blog](https://bliztek.com/blog) to learn more about our contributions to open source!
- Read my [Personal blog](https://stevendevelops.com) to learn more about what I do!

---

## License

This package is licensed under the [MIT License](./LICENSE).

---

Happy syndicating! 🚀
