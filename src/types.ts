// Common Constructs
export type TextConstruct = {
  type?: "text" | "html" | "xhtml";
  value: string;
};

export type DateConstruct = string; // ISO 8601 format: "2003-12-13T18:30:02Z"

export type AtomLink = {
  href: string; // Required
  rel?: "alternate" | "self" | "related" | "enclosure" | "via" | string;
  type?: string; // MIME type
  hreflang?: string; // Language tag
  title?: string;
  length?: number; // Content length in octets
};

export type PersonConstruct = {
  name: string;
  link?: string;
  email?: string;
};

export type ImageElement = {
  url: string;
  title: string;
  link: string;
  width?: number;
  height?: number;
  description?: string;
};

export type Link = {
  href: string; // Required
  rel?: "alternate" | "self" | "related" | "enclosure" | "via" | string;
  type?: string; // MIME type
  hreflang?: string; // Language tag
  title?: string;
  length?: number; // Content length in octets
};

export type Person = {
  name: string;
  url?: string;
  email?: string;
  avatar?: string; // Specific to JSON Feed
};

export type Image = {
  url: string;
  title?: string; // ALT text for Atom/RSS; optional for JSON
  link?: string; // Redirect URL for RSS
  width?: number;
  height?: number;
  description?: string;
};

// RSS-Specific Types
export type RequiredChannelElements = {
  title: string;
  link: string;
  description: string;
};

export type OptionalChannelElements = Partial<{
  language: string;
  copyright: string;
  managingEditor: string;
  webMaster: string;
  pubDate: DateConstruct;
  lastBuildDate: DateConstruct;
  category: { domain?: string; value: string }[];
  generator: string;
  docs: string;
  cloud: {
    domain: string;
    port: number;
    path: string;
    registerProcedure: string;
    protocol: "http-post" | "xml-rpc" | "soap";
  };
  ttl: number;
  image: ImageElement;
  rating: string;
  textInput: {
    title: string;
    description: string;
    name: string;
    link: string;
  };
  skipHours: number[];
  skipDays: (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
  feedLinks: {
    atom?: string;
    alternate?: string;
  };
}>;

export type RSSItem = Partial<{
  title: string;
  link: string;
  description: string;
  author: string;
  category: { domain?: string; value: string }[];
  comments: string;
  enclosure: {
    url: string;
    length: number;
    type: string;
  };
  guid: { value: string; isPermaLink?: boolean };
  pubDate: DateConstruct;
  source: { url: string; value: string };
}>;

export type RSSFeed = RequiredChannelElements &
  OptionalChannelElements & {
    items?: RSSItem[];
  };

// Atom-Specific Types
export type AtomFeed = {
  title: TextConstruct;
  updated: DateConstruct;
  id: string;
  author?: PersonConstruct[];
  link?: AtomLink[];
  subtitle?: TextConstruct;
  rights?: TextConstruct;
  generator?: {
    uri?: string;
    version?: string;
    value: string;
  };
  entries: AtomEntry[];
};

export type AtomEntry = {
  title: TextConstruct;
  id: string;
  updated: DateConstruct;
  content?:
    | TextConstruct
    | {
        src: string;
        type: string;
      };
  author?: PersonConstruct[];
  link?: AtomLink[];
  summary?: TextConstruct;
  published?: DateConstruct;
  category?: { term: string; scheme?: string; label?: string }[];
};

export type AtomSource = Partial<{
  id: string;
  title: TextConstruct;
  updated: DateConstruct;
  author?: PersonConstruct[];
  link?: AtomLink[];
  category?: { term: string; scheme?: string; label?: string }[];
}>;

// JSON Feed-Specific Types
export type JSONFeed = {
  version: string;
  title: string;
  home_page_url?: string;
  feed_url?: string;
  description?: string;
  user_comment?: string;
  next_url?: string;
  icon?: string;
  favicon?: string;
  authors?: Author[];
  language?: string;
  expired?: boolean;
  hubs?: Hub[];
  items: JSONFeedItem[];
};

export type Author = {
  name?: string;
  url?: string;
  avatar?: string;
};

export type Hub = {
  type: string;
  url: string;
};

export type JSONFeedItem = {
  id: string;
  url?: string;
  external_url?: string;
  title?: string;
  content_html?: string;
  content_text?: string;
  summary?: string;
  image?: string;
  banner_image?: string;
  date_published?: string;
  date_modified?: string;
  authors?: Author[];
  tags?: string[];
  language?: string;
  attachments?: Attachment[];
};

export type Attachment = {
  url: string;
  mime_type: string;
  title?: string;
  size_in_bytes?: number;
  duration_in_seconds?: number;
};
