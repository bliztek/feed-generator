import { AtomFeed, JSONFeed, RSSFeed } from "../src/types";

export const rssTestData: RSSFeed = {
  title: "My Complete RSS Feed",
  link: "https://example.com",
  description: "A detailed example of an RSS feed with all optional fields.",
  language: "en-us",
  image: {
    url: "https://example.com/logo.png",
    title: "Example Logo",
    link: "https://example.com",
    width: 144,
    height: 400,
    description: "An example logo for the feed.",
  },
  copyright: "Copyright 2024, Example Corp",
  lastBuildDate: "Sat, 14 Dec 2024 12:00:00 GMT",
  generator: "Example Generator 1.0",
  docs: "https://example.com/docs/rss-spec",
  managingEditor: "editor@example.com (Jane Editor)",
  webMaster: "webmaster@example.com (John Webmaster)",
  category: [{ domain: "https://example.com/categories", value: "Tutorials" }],
  cloud: {
    domain: "rpc.example.com",
    port: 80,
    path: "/RPC2",
    registerProcedure: "pingMe",
    protocol: "soap",
  },
  ttl: 60,
  skipHours: [2, 14, 22],
  skipDays: ["Saturday", "Sunday"],
  items: [
    {
      title: "First Article",
      link: "https://example.com/articles/1",
      description: "This is the first article.",
      pubDate: "Sat, 14 Dec 2024 10:00:00 GMT",
      guid: { value: "https://example.com/articles/1", isPermaLink: true },
      category: [
        { domain: "https://example.com/categories", value: "Tutorials" },
      ],
      author: "author@example.com (Author One)",
      enclosure: {
        url: "https://example.com/audio/podcast.mp3",
        length: 12345678,
        type: "audio/mpeg",
      },
    },
    {
      title: "Second Article",
      link: "https://example.com/articles/2",
      description: "This is the second article with more detail.",
      pubDate: "Sat, 14 Dec 2024 11:00:00 GMT",
      guid: { value: "https://example.com/articles/2", isPermaLink: true },
      category: [
        { domain: "https://example.com/categories", value: "Tutorials" },
      ],
      author: "editor@example.com (Editor Jane)",
    },
  ],
};

export const atomTestData: AtomFeed = {
  title: { type: "text", value: "My Complete Atom Feed" },
  updated: new Date().toISOString(),
  id: "https://example.com/atom-feed",
  subtitle: {
    type: "text",
    value: "A detailed example of an Atom feed with all optional fields.",
  },
  rights: { type: "text", value: "Copyright 2024, Example Corp" },
  generator: {
    uri: "https://example.com/generator",
    version: "1.0",
    value: "Example Generator",
  },
  link: [
    {
      href: "https://example.com/atom-feed",
      rel: "self",
      type: "application/atom+xml",
    },
    { href: "https://example.com", rel: "alternate", type: "text/html" },
  ],
  author: [
    { name: "Jane Editor", email: "editor@example.com" },
    { name: "John Webmaster", email: "webmaster@example.com" },
  ],
  entries: [
    {
      title: { type: "text", value: "First Article" },
      id: "https://example.com/articles/1",
      updated: new Date().toISOString(),
      published: "2024-12-14T10:00:00Z",
      summary: { type: "text", value: "This is the first article." },
      content: {
        src: "https://example.com/articles/1/content",
        type: "text/html",
      },
      author: [{ name: "Author One", email: "author@example.com" }],
      link: [
        {
          href: "https://example.com/articles/1",
          rel: "alternate",
          type: "text/html",
        },
      ],
      category: [
        {
          term: "Tutorials",
          scheme: "https://example.com/categories",
          label: "Tutorials",
        },
      ],
    },
    {
      title: { type: "text", value: "Second Article" },
      id: "https://example.com/articles/2",
      updated: new Date(Date.now() - 10000).toISOString(), // Subtract 10 seconds
      published: "2024-12-14T11:00:00Z",
      summary: {
        type: "text",
        value: "This is the second article with more detail.",
      },
      content: { type: "html", value: "This article contains inline content." },
      author: [{ name: "Editor Jane", email: "editor@example.com" }],
      link: [
        {
          href: "https://example.com/atom-feed",
          rel: "self",
          type: "application/atom+xml",
        },
      ],
      category: [
        {
          term: "Tutorials",
          scheme: "https://example.com/categories",
          label: "Tutorials",
        },
      ],
    },
  ],
};

export const jsonTestData: JSONFeed = {
  version: "https://jsonfeed.org/version/1.1",
  title: "Comprehensive JSON Feed",
  home_page_url: "https://example.com",
  feed_url: "https://example.com/feed.json",
  description: "A detailed example JSON Feed using all possible fields.",
  user_comment:
    "This feed allows you to read the posts from this site in any feed reader that supports the JSON Feed format.",
  next_url: "https://example.com/feed.json?page=2",
  icon: "https://example.com/images/feed-icon.png",
  favicon: "https://example.com/images/favicon.ico",
  authors: [
    {
      name: "Jane Doe",
      url: "https://example.com/authors/jane",
      avatar: "https://example.com/images/jane-avatar.png",
    },
    {
      name: "John Smith",
      url: "https://example.com/authors/john",
      avatar: "https://example.com/images/john-avatar.png",
    },
  ],
  language: "en-US",
  expired: false,
  hubs: [
    {
      type: "WebSub",
      url: "https://example.com/hub",
    },
  ],
  items: [
    {
      id: "https://example.com/posts/1",
      url: "https://example.com/posts/1",
      external_url: "https://another.com/posts/1",
      title: "First Post",
      content_html:
        "<p>This is the first post.</p><p>It includes <strong>HTML</strong>.</p>",
      content_text: "This is the first post. It includes plain text.",
      summary: "A summary of the first post.",
      image: "https://example.com/images/post1-image.jpg",
      banner_image: "https://example.com/images/post1-banner.jpg",
      date_published: "2024-12-14T12:00:00Z",
      date_modified: "2024-12-15T12:00:00Z",
      authors: [
        {
          name: "Jane Doe",
          url: "https://example.com/authors/jane",
          avatar: "https://example.com/images/jane-avatar.png",
        },
      ],
      tags: ["tech", "news"],
      language: "en-GB",
      attachments: [
        {
          url: "https://example.com/audio/podcast1.mp3",
          mime_type: "audio/mpeg",
          title: "Podcast Episode 1",
          size_in_bytes: 10485760,
          duration_in_seconds: 3600,
        },
      ],
    },
    {
      id: "https://example.com/posts/2",
      url: "https://example.com/posts/2",
      title: "Second Post",
      content_html: "<p>This is the second post.</p>",
      date_published: "2024-12-14T13:00:00Z",
      authors: [
        {
          name: "John Smith",
          url: "https://example.com/authors/john",
        },
      ],
    },
  ],
};
