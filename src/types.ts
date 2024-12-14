export type FeedAuthor = {
  name: string;
  email?: string;
  link?: string;
};

export type FeedContributor = FeedAuthor;

export type FeedItem = {
  title: string;
  id: string; // Unique identifier for the item, can be the URL or a GUID
  link: string; // URL to the full content of the item
  description: string; // Summary of the item
  content?: string; // Full content of the item (optional)
  author: FeedAuthor; // List of authors for the item
  contributor?: FeedContributor[]; // List of contributors for the item
  date: string; // ISO string for the publication date of the item
  image?: string; // URL of an image or enclosure associated with the item
  enclosure?: {
    url: string; // URL of the enclosure
    type: string; // MIME type of the enclosure (e.g., "audio/mpeg", "image/jpeg")
    length?: string; // Size of the enclosure in bytes (optional)
  };
  categories?: string[]; // Categories associated with the item
  guidIsPermalink?: boolean; // If the GUID is a permalink (default: true)
  comments?: string; // Optional link to the comments section for the item
  source?: {
    url: string; // URL of the source feed
    title: string; // Title of the source feed
  }; // Optional source feed information
};

export type FeedOptions = {
  title: string; // Title of the feed
  description: string; // Description of the feed
  id: string; // Unique identifier for the feed (e.g., website URL)
  link: string; // URL of the feed's main page
  language?: string; // Language code (e.g., "en", "fr") (optional)
  image?: string; // URL of an image representing the feed (optional)
  copyright?: string; // Copyright information (optional)
  updated?: string; // ISO string for the last update date (optional)
  generator?: string; // Name of the feed generator (optional, default: Custom RSS Generator)
  feedLinks?: {
    json?: string; // URL to the JSON Feed (optional)
    atom?: string; // URL to the Atom Feed (optional)
  };
  author?: FeedAuthor; // Author of the feed (optional)
};

export type FeedData = FeedOptions & {
  items: FeedItem[]; // Array of feed items
  categories?: string[]; // Categories associated with the feed (optional)
  contributors?: FeedContributor[]; // List of contributors for the feed (optional)
};
