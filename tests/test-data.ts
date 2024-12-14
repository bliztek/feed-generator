import { FeedData } from "../src/types";

export const testData: FeedData = {
  title: "Tech News Feed",
  description: "Latest updates in the tech world",
  id: "https://example.com/rss-feed",
  link: "https://example.com",
  language: "en",
  image: "https://example.com/logo.png",
  copyright: "All rights reserved 2024",
  updated: "2024-12-14T12:00:00Z",
  generator: "Custom RSS Generator",
  feedLinks: {
    atom: "https://example.com/rss.xml",
    json: "https://example.com/feed.json",
  },
  author: {
    name: "Tech News Team",
    email: "team@example.com",
    link: "https://example.com/about-us",
  },
  items: [
    {
      title: "Tech Post 1",
      id: "https://example.com/tech-post-1",
      link: "https://example.com/tech-post-1",
      description: "A summary of the first tech post.",
      content: "<p>This is the full content of Tech Post 1.</p>",
      date: "2024-12-14T08:00:00Z",
      author: { name: "Jane Smith", email: "janesmith@example.com" },

      contributor: [
        { name: "Contributor 1", email: "contrib1@example.com" },
        {
          name: "Contributor 2",
          email: "contrib2@example.com",
          link: "https://example.com/contrib2",
        },
      ],
      categories: ["Technology", "Innovation"],
      comments: "https://example.com/tech-post-1#comments",
      image: "https://example.com/images/tech-post-1.png",
    },
    {
      title: "Tech Post 2",
      id: "https://example.com/tech-post-2",
      link: "https://example.com/tech-post-2",
      description: "A summary of the second tech post.",
      content: "<p>This is the full content of Tech Post 2.</p>",
      date: "2024-12-15T10:30:00Z",
      author: { name: "Alice Johnson", email: "alice@example.com" },
      categories: ["Artificial Intelligence", "Machine Learning"],
      comments: "https://example.com/tech-post-2#comments",
    },
  ],
  categories: ["Tech News", "Updates"],
  contributors: [
    {
      name: "Contributor 1",
      email: "contrib1@example.com",
      link: "https://example.com/contrib1",
    },
    { name: "Contributor 2", email: "contrib2@example.com" },
  ],
};
