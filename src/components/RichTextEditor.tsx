"use client";

import { useEffect, useCallback, useState, useRef, useMemo } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";
import { Markdown } from "@tiptap/markdown";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Quote,
  Link as LinkIcon,
  Highlighter,
  Undo2,
  Redo2,
  Minus,
  ImageIcon,
  Type,
  Maximize2,
  Minimize2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { isRichTextEmpty } from "@/lib/rich-text-empty";
import displayStyles from "@/components/rich-text-display.module.css";

// ─── Types ───────────────────────────────────────────────────────────────────

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  /** BCP 47 language (e.g. en | ar); matches RichTextDisplay font stack */
  lang?: string;
  dir?: "rtl" | "ltr";
  className?: string;
  maxCharacters?: number;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

export { isRichTextEmpty };

// ─── Sub-components ──────────────────────────────────────────────────────────

type ToolbarButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  label: string;
  shortcut?: string;
  children: React.ReactNode;
};

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  label,
  shortcut,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={shortcut ? `${label} (${shortcut})` : label}
      className={cn(
        "rte-btn",
        isActive && "rte-btn--active",
        disabled && "rte-btn--disabled",
      )}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="rte-divider" aria-hidden="true" />;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function RichTextEditor({
  value,
  onChange,
  placeholder,
  lang,
  dir = "ltr",
  className,
  maxCharacters,
}: RichTextEditorProps) {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        codeBlock: false,
      }),
      Markdown,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight.configure({ multicolor: true }),
      Image.configure({ HTMLAttributes: { class: "rte-image" } }),
      CharacterCount.configure({ limit: maxCharacters }),
      Placeholder.configure({ placeholder: placeholder ?? "Write here…" }),
    ],
    [maxCharacters, placeholder],
  );

  const editorAttributes = useMemo(
    () => ({
      class: cn(displayStyles.root, "rte-content"),
      dir,
      spellcheck: "true" as const,
      ...(lang ? { lang } : {}),
    }),
    [dir, lang],
  );

  const lastEmittedRef = useRef<string | null>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    content: value,
    contentType: "markdown",
    editorProps: {
      attributes: editorAttributes,
    },
    onUpdate: ({ editor: e }) => {
      const md = e.getMarkdown();
      lastEmittedRef.current = md;
      onChange(md);
    },
  });

  useEffect(() => {
    if (!editor) return;
    editor.setOptions({ editorProps: { attributes: editorAttributes } });
  }, [editor, editorAttributes]);

  useEffect(() => {
    if (!editor || editor.isFocused) return;
    const fromEditor = value === lastEmittedRef.current;
    lastEmittedRef.current = null;
    if (fromEditor) return;
    const normalize = (s: string) => s.trimEnd();
    if (normalize(value) !== normalize(editor.getMarkdown())) {
      editor.commands.setContent(value, {
        emitUpdate: false,
        contentType: "markdown",
      });
    }
  }, [editor, value]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  // ── Image URL popover ──────────────────────────────────────────────────────
  const [imgPopoverOpen, setImgPopoverOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const imgInputRef = useRef<HTMLInputElement>(null);

  const openImgPopover = useCallback(() => {
    setImgUrl("");
    setImgPopoverOpen(true);
    setTimeout(() => imgInputRef.current?.focus(), 50);
  }, []);

  const insertImage = useCallback(() => {
    const url = imgUrl.trim();
    if (url) editor?.chain().focus().setImage({ src: url }).run();
    setImgPopoverOpen(false);
    setImgUrl("");
  }, [editor, imgUrl]);

  const onImgKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") insertImage();
      if (e.key === "Escape") setImgPopoverOpen(false);
    },
    [insertImage],
  );
  const charCount = editor?.storage.characterCount.characters() ?? 0;
  const wordCount = editor?.storage.characterCount.words() ?? 0;
  const limitReached = maxCharacters ? charCount >= maxCharacters : false;

  // ── Zen / Focus mode ─────────────────────────────────────────────────────────
  const [zenMode, setZenMode] = useState(false);

  const toggleZenMode = useCallback(() => {
    setZenMode((prev) => !prev);
  }, []);

  // Exit zen mode on Escape
  useEffect(() => {
    if (!zenMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZenMode(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [zenMode]);

  // Lock body scroll while in zen mode
  useEffect(() => {
    if (zenMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [zenMode]);

  // ── Custom bubble menu (no extra package) ──────────────────────────────────
  const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({
    display: "none",
  });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;
    const update = () => {
      const { from, to } = editor.state.selection;
      if (from === to || !wrapRef.current) {
        setBubbleStyle({ display: "none" });
        return;
      }
      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) {
        setBubbleStyle({ display: "none" });
        return;
      }
      const range = sel.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const wrapRect = wrapRef.current.getBoundingClientRect();
      setBubbleStyle({
        display: "flex",
        position: "absolute",
        top: rect.top - wrapRect.top - 44,
        left: Math.max(0, rect.left - wrapRect.left + rect.width / 2 - 120),
        zIndex: 50,
      });
    };
    editor.on("selectionUpdate", update);
    editor.on("transaction", update);
    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  return (
    <>
      {/* ── Scoped styles ───────────────────────────────────────────── */}
      <style>{`
        /* Design tokens */
        .rte-root {
          --rte-surface:     var(--card, #ffffff);
          --rte-border:      var(--border, var(--mercury, #e7e7e7));
          --rte-border-2:    var(--ring, var(--main-color, #be9249));
          --rte-accent:      var(--primary, var(--main-color, #be9249));
          --rte-accent-dim:  rgba(190, 146, 73, 0.12);
          --rte-text:        var(--foreground, var(--mine-shaft, #333333));
          --rte-muted:       var(--muted-foreground, var(--boulder, #777777));
          --rte-popover:     var(--popover, #ffffff);
          --rte-code-bg:     var(--muted, #f4f5f7);
          --rte-radius:      0px;
          --rte-font-ui:     "DM Mono", "Fira Code", monospace;

          background: var(--rte-bg);
          border: 1px solid var(--rte-border);
          border-radius: var(--rte-radius);
          overflow-y: auto;
          max-height: 65vh;
          display: flex;
          flex-direction: column;
          transition: border-color 0.2s;
        }
        .rte-root:focus-within {
          border-color: var(--rte-border-2);
          box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 25%, transparent);
        }

        /* Toolbar */
        .rte-toolbar {
          position: sticky;
          top: 0;
          z-index: 10;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 2px;
          padding: 8px 10px;
          background: var(--rte-surface);
          border-bottom: 1px solid var(--rte-border);
        }
        .rte-group {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .rte-divider {
          width: 1px;
          height: 20px;
          background: var(--rte-border);
          margin: 0 4px;
          flex-shrink: 0;
        }

        /* Toolbar buttons */
        .rte-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: none;
          border-radius: 6px;
          background: transparent;
          color: var(--rte-muted);
          cursor: pointer;
          transition: background 0.15s, color 0.15s, transform 0.1s;
          flex-shrink: 0;
        }
        .rte-btn svg { width: 15px; height: 15px; }
        .rte-btn:hover:not(.rte-btn--disabled) {
          background: var(--rte-accent-dim);
          color: var(--rte-accent);
        }
        .rte-btn:active:not(.rte-btn--disabled) { transform: scale(0.92); }
        .rte-btn--active {
          background: var(--rte-accent-dim);
          color: var(--rte-accent);
        }
        .rte-btn--disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Editor area */
        .rte-editor-wrap {
          flex: 1;
          background: var(--rte-bg);
          border-radius: 0 0 var(--rte-radius) var(--rte-radius);
        }
        /* Typography matches rich-text-display.module.css (displayStyles.root on the editor) */
        .rte-content {
          min-height: 180px;
          padding: 18px 22px;
          outline: none;
        }

        /* Placeholder */
        .rte-content p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: var(--rte-muted);
          pointer-events: none;
          float: inline-start;
          height: 0;
        }

        /* Bubble menu */
        .rte-bubble {
          display: flex;
          align-items: center;
          gap: 2px;
          background: var(--rte-popover);
          border: 1px solid var(--rte-border-2);
          border-radius: 8px;
          padding: 5px 7px;
          box-shadow: 0 8px 32px color-mix(in oklch, var(--foreground) 20%, transparent);
          animation: rte-pop 0.15s ease;
        }
        @keyframes rte-pop {
          from { opacity: 0; transform: translateY(4px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* Footer */
        .rte-footer {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 14px;
          padding: 6px 14px;
          background: var(--rte-surface);
          border-top: 1px solid var(--rte-border);
          font-family: var(--rte-font-ui);
          font-size: 11px;
          color: var(--rte-muted);
          letter-spacing: 0.04em;
        }
        .rte-footer-stat { display: flex; align-items: center; gap: 5px; }
        .rte-footer-stat span:last-child {
          color: var(--rte-text);
          font-weight: 600;
        }
        .rte-limit-warn { color: #ef4444 !important; }

        /* Images — base from display module; selection ring for editing */
        .rte-content img.rte-image {
          border: 2px solid transparent;
          transition: border-color 0.15s;
        }
        .rte-content img.rte-image.ProseMirror-selectednode {
          border-color: var(--rte-accent);
          outline: none;
        }

        /* Image popover */
        .rte-img-popover-wrap {
          position: relative;
          display: inline-flex;
          align-items: center;
        }
        .rte-img-popover {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--rte-popover);
          border: 1px solid var(--rte-border-2);
          border-radius: 8px;
          padding: 7px 8px;
          box-shadow: 0 8px 32px color-mix(in oklch, var(--foreground) 24%, transparent);
          z-index: 100;
          width: 280px;
          animation: rte-pop 0.15s ease;
        }
        .rte-img-popover input {
          flex: 1;
          background: var(--background);
          border: 1px solid var(--rte-border);
          border-radius: 5px;
          color: var(--rte-text);
          font-family: var(--rte-font-ui);
          font-size: 12px;
          padding: 5px 8px;
          outline: none;
          transition: border-color 0.15s;
        }
        .rte-img-popover input::placeholder { color: var(--rte-muted); }
        .rte-img-popover input:focus {
          border-color: var(--rte-border-2);
          box-shadow: 0 0 0 2px color-mix(in oklch, var(--ring) 20%, transparent);
        }
        .rte-img-popover button {
          flex-shrink: 0;
          background: var(--rte-accent);
          color: var(--primary-foreground);
          border: none;
          border-radius: 5px;
          font-family: var(--rte-font-ui);
          font-size: 11px;
          font-weight: 700;
          padding: 5px 10px;
          cursor: pointer;
          transition: opacity 0.15s;
        }
        .rte-img-popover button:hover { opacity: 0.85; }

        /* Spacer to push toolbar items */
        .rte-spacer { flex: 1; }

        /* ── Zen / Focus mode — just full-screen the editor ──────────── */
        .rte-zen-root {
          position: fixed !important;
          inset: 0 !important;
          z-index: 9999 !important;
          max-height: none !important;
          border: none !important;
          border-radius: 0 !important;
          background: var(--background) !important;
          display: flex !important;
          flex-direction: column !important;
          animation: rte-zen-in 0.15s ease;
        }
        @keyframes rte-zen-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .rte-zen-root .rte-toolbar {
          flex-shrink: 0;
        }
        .rte-zen-root .rte-editor-wrap {
          flex: 1;
        }
        .rte-zen-root .rte-editor-wrap .ProseMirror {
          flex: 1;
        }
      `}</style>

      <div
        ref={wrapRef}
        className={cn(
          "rte-root",
          !zenMode && className,
          zenMode && "rte-zen-root",
        )}
        style={{ position: "relative" }}
      >
        {/* ── Custom bubble menu ──────────────────────────────────── */}
        {editor && (
          <div className="rte-bubble" style={bubbleStyle}>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              label="Bold"
              shortcut="⌘B"
            >
              <Bold />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              label="Italic"
              shortcut="⌘I"
            >
              <Italic />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive("underline")}
              label="Underline"
              shortcut="⌘U"
            >
              <UnderlineIcon />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              isActive={editor.isActive("highlight")}
              label="Highlight"
            >
              <Highlighter />
            </ToolbarButton>
            <Divider />
            <ToolbarButton
              onClick={setLink}
              isActive={editor.isActive("link")}
              label="Link"
              shortcut="⌘K"
            >
              <LinkIcon />
            </ToolbarButton>
          </div>
        )}

        {/* ── Toolbar ──────────────────────────────────────────────── */}
        <div
          className="rte-toolbar"
          role="toolbar"
          aria-label="Text formatting"
        >
          {/* History */}
          <div className="rte-group">
            <ToolbarButton
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
              label="Undo"
              shortcut="⌘Z"
            >
              <Undo2 />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
              label="Redo"
              shortcut="⌘⇧Z"
            >
              <Redo2 />
            </ToolbarButton>
          </div>

          <Divider />

          {/* Headings */}
          <div className="rte-group">
            <ToolbarButton
              onClick={() => editor?.chain().focus().setParagraph().run()}
              isActive={editor?.isActive("paragraph")}
              label="Paragraph"
            >
              <Type />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
              isActive={editor?.isActive("heading", { level: 1 })}
              label="Heading 1"
            >
              <Heading1 />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
              isActive={editor?.isActive("heading", { level: 2 })}
              label="Heading 2"
            >
              <Heading2 />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
              isActive={editor?.isActive("heading", { level: 3 })}
              label="Heading 3"
            >
              <Heading3 />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 4 }).run()
              }
              isActive={editor?.isActive("heading", { level: 4 })}
              label="Heading 4"
            >
              <Heading4 />
            </ToolbarButton>
          </div>

          <Divider />

          {/* Inline marks */}
          <div className="rte-group">
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBold().run()}
              isActive={editor?.isActive("bold")}
              label="Bold"
              shortcut="⌘B"
            >
              <Bold />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              isActive={editor?.isActive("italic")}
              label="Italic"
              shortcut="⌘I"
            >
              <Italic />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
              isActive={editor?.isActive("underline")}
              label="Underline"
              shortcut="⌘U"
            >
              <UnderlineIcon />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleStrike().run()}
              isActive={editor?.isActive("strike")}
              label="Strikethrough"
            >
              <Strikethrough />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleHighlight().run()}
              isActive={editor?.isActive("highlight")}
              label="Highlight"
            >
              <Highlighter />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleCode().run()}
              isActive={editor?.isActive("code")}
              label="Inline Code"
              shortcut="⌘E"
            >
              <Code />
            </ToolbarButton>
          </div>

          <Divider />

          {/* Alignment */}
          <div className="rte-group">
            <ToolbarButton
              onClick={() => editor?.chain().focus().setTextAlign("left").run()}
              isActive={editor?.isActive({ textAlign: "left" })}
              label="Align Left"
            >
              <AlignLeft />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
              isActive={editor?.isActive({ textAlign: "center" })}
              label="Align Center"
            >
              <AlignCenter />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
              isActive={editor?.isActive({ textAlign: "right" })}
              label="Align Right"
            >
              <AlignRight />
            </ToolbarButton>
            <ToolbarButton
              onClick={() =>
                editor?.chain().focus().setTextAlign("justify").run()
              }
              isActive={editor?.isActive({ textAlign: "justify" })}
              label="Justify"
            >
              <AlignJustify />
            </ToolbarButton>
          </div>

          <Divider />

          {/* Block elements */}
          <div className="rte-group">
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              isActive={editor?.isActive("bulletList")}
              label="Bullet List"
            >
              <List />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              isActive={editor?.isActive("orderedList")}
              label="Ordered List"
            >
              <ListOrdered />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().toggleBlockquote().run()}
              isActive={editor?.isActive("blockquote")}
              label="Blockquote"
            >
              <Quote />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor?.chain().focus().setHorizontalRule().run()}
              label="Horizontal Rule"
            >
              <Minus />
            </ToolbarButton>
          </div>

          <Divider />

          {/* Link */}
          <div className="rte-group">
            <ToolbarButton
              onClick={setLink}
              isActive={editor?.isActive("link")}
              label="Insert Link"
              shortcut="⌘K"
            >
              <LinkIcon />
            </ToolbarButton>
          </div>

          <Divider />

          {/* Image */}
          <div className="rte-img-popover-wrap">
            <ToolbarButton
              onClick={openImgPopover}
              isActive={imgPopoverOpen}
              label="Insert Image"
            >
              <ImageIcon />
            </ToolbarButton>
            {imgPopoverOpen && (
              <div
                className="rte-img-popover"
                role="dialog"
                aria-label="Insert image URL"
              >
                <input
                  ref={imgInputRef}
                  type="url"
                  placeholder="https://example.com/image.png"
                  value={imgUrl}
                  onChange={(e) => setImgUrl(e.target.value)}
                  onKeyDown={onImgKeyDown}
                />
                <button type="button" onClick={insertImage}>
                  Insert
                </button>
              </div>
            )}
          </div>

          <div className="rte-group rte-spacer" />

          {/* Zen mode toggle */}
          <ToolbarButton
            onClick={toggleZenMode}
            isActive={zenMode}
            label={zenMode ? "Exit Zen Mode" : "Zen Mode"}
            shortcut={zenMode ? "Esc" : ""}
          >
            {zenMode ? <Minimize2 /> : <Maximize2 />}
          </ToolbarButton>
        </div>

        {/* ── Editor content ─────────────────────────────────────── */}
        <div className="rte-editor-wrap">
          <EditorContent editor={editor} />
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <div className="rte-footer">
          <div className="rte-footer-stat">
            words <span>{wordCount}</span>
          </div>
          <div className="rte-footer-stat">
            chars{" "}
            <span className={limitReached ? "rte-limit-warn" : ""}>
              {charCount}
              {maxCharacters ? ` / ${maxCharacters}` : ""}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
