"use client";

import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { cn } from "@/lib/utils";
import styles from "@/components/rich-text-display.module.css";

type RichTextDisplayProps = {
  markdown: string;
  className?: string;
  /** BCP 47 language of the article (e.g. en | ar); tunes font stack for that script */
  lang?: string;
  /** Text direction for lists, quotes, etc. (should match the content locale) */
  dir?: "ltr" | "rtl";
};

/**
 * Read-only display for Markdown produced by RichTextEditor.
 * Apply this wherever readers consume the content so they see
 * exactly what the writer saw.
 */
export function RichTextDisplay({
  markdown,
  className,
  lang,
  dir,
}: RichTextDisplayProps) {
  if (!markdown?.trim()) {
    return null;
  }

  // TipTap Markdown uses some custom syntaxes that `marked` doesn't
  // interpret by default. Convert them to HTML before parsing.
  const withHighlight = markdown.replace(/==(.+?)==/g, "<mark>$1</mark>");
  const withUnderline = withHighlight.replace(/\+\+(.+?)\+\+/g, "<u>$1</u>");

  // Markdown (`gfm: true`) collapses any number of blank lines into a single
  // paragraph break — 1, 2, 3 Enter between blocks all yield identical HTML.
  // Turn the extra blank lines into &nbsp; lines so the renderer sees them as
  // distinct empty paragraphs, which we then turn into proportional spacers.
  //
  // TipTap serialises N blank paragraphs as 2N+2 consecutive newlines between
  // text (each blank paragraph = one \n\n pair beyond the boundary \n\n).
  // E.g. one blank paragraph → text\n\n\n\ntext  (extras = "\n\n" = length 2).
  const withBlankMarkers = withUnderline.replace(
    /(\n\n)(\n{2,})/g,
    (_match, base, extras) => {
      const blankCount = extras.length / 2;
      return base + "&nbsp;\n\n".repeat(blankCount);
    },
  );

  const renderedHtml = marked.parse(withBlankMarkers, {
    gfm: true,
    breaks: false,
    async: false,
  }) as string;

  const sanitized = DOMPurify.sanitize(renderedHtml, {
    ALLOWED_TAGS: [
      "p",
      "h1",
      "h2",
      "h3",
      "h4",
      "strong",
      "em",
      "u",
      "s",
      "del",
      "a",
      "code",
      "pre",
      "blockquote",
      "ul",
      "ol",
      "li",
      "hr",
      "img",
      "mark",
      "br",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "class", "style", "target", "rel"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover"],
  });

  // TipTap serializes empty paragraphs as &nbsp; lines → marked → <p>&nbsp;</p>.
  // Those carry <p> margins AND line-height at once, making 1‑vs‑2 blank lines look
  // the same. Squash consecutive &nbsp; paragraphs into a single spacer whose height
  // is purely CSS-controlled and proportional to the original number of blank lines.
  const withBlanks = sanitized.replace(
    /((?:<p>(?:&nbsp;|\s)*<\/p>\s*)+)/g,
    (match) => {
      const lines = (match.match(/<p>/g) || []).length;
      return `<div class="rtd-blank-line" style="height:${lines * 1.8}em" role="presentation"></div>\n`;
    },
  );

  const safeHtml = withBlanks.replace(/<a\b([^>]*)>/gi, (_match, attrs) => {
    const attrsStr = String(attrs);
    const hrefMatch = attrsStr.match(/\shref\s*=\s*"([^"]*)"/i);
    const href = hrefMatch?.[1] ?? "";
    const isExternal =
      /^(https?:)?\/\//i.test(href) || href.startsWith("mailto:");

    const stripped = attrsStr
      .replace(/\srel\s*=\s*"[^"]*"/gi, "")
      .replace(/\starget\s*=\s*"[^"]*"/gi, "");

    return isExternal
      ? `<a${stripped} target="_blank" rel="noopener noreferrer">`
      : `<a${stripped}>`;
  });

  return (
    <div
      className={cn(styles.root, className)}
      {...(lang ? { lang } : {})}
      {...(dir ? { dir } : {})}
      dangerouslySetInnerHTML={{ __html: safeHtml }}
    />
  );
}
