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

  const renderGenerator = (gen: AtomFeed["generator"] | undefined): string => {
    if (!gen) return "";

    const attributes = [
      gen.uri ? `uri="${gen.uri.trim()}"` : "",
      gen.version ? `version="${gen.version.trim()}"` : "",
    ]
      .filter((attr) => attr)
      .join(" ");

    return `<generator${
      attributes ? ` ${attributes}` : ""
    }>${gen.value.trim()}</generator>`;
  };

  const renderLinks = (links: AtomLink[] | undefined): string =>
    links
      ?.map((l) => {
        const attributes = [
          `href="${l.href.trim()}"`,
          l.rel ? `rel="${l.rel.trim()}"` : "",
          l.type ? `type="${l.type.trim()}"` : "",
          l.hreflang ? `hreflang="${l.hreflang.trim()}"` : "",
        ]
          .filter((attr) => attr)
          .join(" ");

        return `\t<link ${attributes} />`;
      })
      .join("\n") || "";

  const renderAuthors = (
    authors: PersonConstruct[] | undefined,
    tabs: number = 1
  ): string => {
    const t = "\t".repeat(tabs);
    return (
      authors
        ?.map((a) => {
          const authorParts: string[] = [
            `${t}<author>`,
            `\t<name>${a.name.trim()}</name>`,
            a.email ? `\t<email>${a.email.trim()}</email>` : "",
            a.link ? `\t<uri>${a.link.trim()}</uri>` : "",
            `</author>`,
          ];

          // Filter empty parts and join
          return authorParts.filter((part) => part.trim()).join(`\n${t}`);
        })
        .join("\n") || ""
    );
  };

  const renderEntries = (entries: AtomEntry[] | undefined): string =>
    entries
      ?.map((entry) => {
        const entryParts: string[] = [
          `\t<entry>`,
          `\t\t${renderTextConstruct(entry.title, "title")}`,
          `\t${renderLinks(entry.link)}`,
          `\t\t<id>${entry.id.trim()}</id>`,
          `\t\t<updated>${entry.updated.trim()}</updated>`,
          entry.published
            ? `\t\t<published>${entry.published.trim()}</published>`
            : "",
          entry.category
            ?.map(
              (cat) =>
                `\t\t<category term="${cat.term.trim()}"${
                  cat.scheme ? ` scheme="${cat.scheme.trim()}"` : ""
                }${cat.label ? ` label="${cat.label.trim()}"` : ""} />`
            )
            .join("") || "",
          entry.content
            ? isExternalContent(entry.content)
              ? `\t\t<content src="${entry.content.src.trim()}" type="${entry.content.type.trim()}" />`
              : `\t\t${renderTextConstruct(
                  entry.content as TextConstruct,
                  "content"
                )}`
            : "",
          `\t\t${renderTextConstruct(entry.summary, "summary")}`,
          `${renderAuthors(entry.author, 2)}`,
          `\t</entry>`,
        ];

        // Filter empty parts and join
        return entryParts.filter((part) => part.trim()).join("\n");
      })
      .join("\n") || "";

  const isExternalContent = (
    content: TextConstruct | { src: string; type: string }
  ): content is { src: string; type: string } => {
    return (content as { src: string; type: string }).src !== undefined;
  };

  const feedParts: string[] = [
    `<?xml version="1.0" encoding="UTF-8" ?>`,
    `<feed xmlns="http://www.w3.org/2005/Atom">`,
    `\t${renderTextConstruct(title, "title")}`,
    `\t${renderTextConstruct(subtitle, "subtitle")}`,
    `\t${renderTextConstruct(rights, "rights")}`,
    `${renderLinks(link)}`,
    `\t<id>${id.trim()}</id>`,
    `\t<updated>${updated.trim()}</updated>`,
    `\t${renderGenerator(generator)}`,
    `${renderAuthors(author)}`,
    `${renderEntries(entries)}`,
    `</feed>`,
  ];

  // Filter empty parts and join
  return feedParts
    .filter((part) => part.trim())
    .join("\n")
    .trim();
};
