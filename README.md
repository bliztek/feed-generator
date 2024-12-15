# Feed Generator: RSS, Atom, JSON

![Build Status](https://github.com/bliztek/feed-generator/actions/workflows/ci.yml/badge.svg)  
[![Codecov](https://codecov.io/gh/bliztek/feed-generator/graph/badge.svg?token=4GLOVKLC2W)](https://codecov.io/gh/bliztek/feed-generator)  
![npm](https://img.shields.io/npm/v/@bliztek/feed-generator)  
![License](https://img.shields.io/npm/l/@bliztek/feed-generator)  
![Downloads](https://img.shields.io/npm/dm/@bliztek/feed-generator)  
![Bundle Size](https://img.shields.io/bundlephobia/min/@bliztek/feed-generator)

A simple and lightweight Node.js library for generating **RSS 2.0**, **Atom**, and **JSON Feed** formats. Perfect for syndicating content in blogs, news sites, or any platform that needs standardized feed formats.

---

## Features

- Generate valid **RSS 2.0**, **Atom**, and **JSON Feed** outputs.
- Easy-to-use API for creating feeds.
- Developed using TypeScript / type-safe.
- Tests & snapshots for each syndication format to avoid regressions.
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
  generateRSSFeed,
  generateAtomFeed,
  generateJSONFeed,
} from "@bliztek/feed-generator";
```

### 2. Define Your Feed Data

Each feed type (RSS, Atom, and JSON) uses a specific data structure. Below is an example for RSS feed data:

```typescript
const rssFeedData = {
  title: "My Blog Feed",
  link: "https://example.com",
  description: "The latest articles from my blog.",
  items: [
    {
      title: "First Post",
      link: "https://example.com/post-1",
      description: "A summary of the first post.",
      pubDate: "2024-12-14T10:00:00Z",
    },
  ],
};
```

### 3. Generate Feeds

#### Generate RSS Feed

```typescript
const rss = generateRSSFeed(rssFeedData);
console.log(rss);
```

#### Generate Atom Feed

Atom feeds have a slightly different structure:

```typescript
const atomFeedData = {
  title: { type: "text", value: "My Blog Feed" },
  updated: "2024-12-14T12:00:00Z",
  id: "https://example.com/atom",
  link: [
    {
      href: "https://example.com/atom",
      rel: "self",
      type: "application/atom+xml",
    },
  ],
  entries: [
    {
      title: { type: "text", value: "First Post" },
      id: "https://example.com/post-1",
      updated: "2024-12-14T10:00:00Z",
      summary: { type: "text", value: "A summary of the first post." },
    },
  ],
};

const atom = generateAtomFeed(atomFeedData);
console.log(atom);
```

#### Generate JSON Feed

JSON feeds are defined with the `JSONFeed` type:

```typescript
const jsonFeedData = {
  version: "https://jsonfeed.org/version/1.1",
  title: "My Blog Feed",
  home_page_url: "https://example.com",
  feed_url: "https://example.com/feed.json",
  items: [
    {
      id: "https://example.com/post-1",
      title: "First Post",
      content_html: "<p>The full content of the first post.</p>",
      date_published: "2024-12-14T10:00:00Z",
    },
  ],
};

const json = generateJSONFeed(jsonFeedData);
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

### `generateRSSFeed(feedData: RSSFeed): string`

Generates an RSS 2.0 feed.

- **Input:** `RSSFeed` object.
- **Output:** A string containing the RSS XML.

---

### `generateAtomFeed(feedData: AtomFeed): string`

Generates an Atom feed.

- **Input:** `AtomFeed` object.
- **Output:** A string containing the Atom XML.

---

### `generateJSONFeed(feedData: JSONFeed): string`

Generates a JSON Feed.

- **Input:** `JSONFeed` object.
- **Output:** A string containing the JSON Feed.

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
  <title type="text">My Blog Feed</title>
  <link href="https://example.com/atom" rel="self" type="application/atom+xml" />
  <id>https://example.com/atom</id>
  <updated>2024-12-14T12:00:00Z</updated>
  <entry>
    <title type="text">First Post</title>
    <id>https://example.com/post-1</id>
    <updated>2024-12-14T10:00:00Z</updated>
    <summary type="text">A summary of the first post.</summary>
  </entry>
</feed>
```

### JSON Feed Output

```json
{
  "version": "https://jsonfeed.org/version/1.1",
  "title": "My Blog Feed",
  "home_page_url": "https://example.com",
  "feed_url": "https://example.com/feed.json",
  "items": [
    {
      "id": "https://example.com/post-1",
      "title": "First Post",
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
