import {
  AtomEntry,
  AtomFeed,
  AtomLink,
  PersonConstruct,
  TextConstruct,
} from "../types";

export const generateAtomFeed = (feedData: AtomFeed): string => {
  const {
    title,
    updated,
    id,
    subtitle,
    rights,
    generator,
    link,
    author,
    entries,
  } = feedData;

  // Validate required fields
  if (!title || !updated || !id) {
    throw new Error("Invalid feed data: title, updated, and id are required.");
  }
  const renderTextConstruct = (
    construct: TextConstruct | undefined,
    tag: string
  ) =>
    construct
      ? `<${tag} type="${construct.type || "text"}">${construct.value}</${tag}>`
      : "";

  const renderGenerator = (gen: AtomFeed["generator"] | undefined) =>
    gen
      ? `<generator${gen.uri ? ` uri="${gen.uri}"` : ""}${
          gen.version ? ` version="${gen.version}"` : ""
        }>${gen.value}</generator>`
      : "";

  const renderLinks = (links: AtomLink[] | undefined) =>
    links
      ?.map(
        (l) =>
          `<link href="${l.href}" rel="${l.rel}" type="${l.type}"${
            l.hreflang ? ` hreflang="${l.hreflang}"` : ""
          } />`
      )
      .join("") || "";

  const renderAuthors = (authors: PersonConstruct[] | undefined) =>
    authors
      ?.map(
        (a) =>
          `<author>
            <name>${a.name}</name>
            ${a.email ? `<email>${a.email}</email>` : ""}
            ${a.link ? `<uri>${a.link}</uri>` : ""}
          </author>`
      )
      .join("") || "";

  const renderEntries = (entries: AtomEntry[] | undefined) =>
    entries
      ?.map(
        (entry) => `
      <entry>
        ${renderTextConstruct(entry.title, "title")}
        ${renderLinks(entry.link)}
        <id>${entry.id}</id>
        <updated>${entry.updated}</updated>
        ${entry.published ? `<published>${entry.published}</published>` : ""}
        ${
          entry.category
            ?.map(
              (cat) =>
                `<category term="${cat.term}"${
                  cat.scheme ? ` scheme="${cat.scheme}"` : ""
                }${cat.label ? ` label="${cat.label}"` : ""} />`
            )
            .join("") || ""
        }
        ${
          entry.content
            ? isExternalContent(entry.content)
              ? `<content src="${entry.content.src}" type="${entry.content.type}" />`
              : renderTextConstruct(entry.content as TextConstruct, "content")
            : ""
        }
        ${renderTextConstruct(entry.summary, "summary")}
        ${renderAuthors(entry.author)}
      </entry>`
      )
      .join("") || "";

  const isExternalContent = (
    content: TextConstruct | { src: string; type: string }
  ): content is { src: string; type: string } => {
    return (content as { src: string; type: string }).src !== undefined;
  };

  return `
    <?xml version="1.0" encoding="UTF-8" ?>
    <feed xmlns="http://www.w3.org/2005/Atom">
      ${renderTextConstruct(title, "title")}
      ${renderTextConstruct(subtitle, "subtitle")}
      ${renderTextConstruct(rights, "rights")}
      ${renderLinks(link)}
      <id>${id}</id>
      <updated>${updated}</updated>
      ${renderGenerator(generator)}
      ${renderAuthors(author)}
      ${renderEntries(entries)}
    </feed>
  `.trim();
};
