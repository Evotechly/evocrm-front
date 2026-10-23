import * as React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { EvoButton } from "../foundations/button";

export function EvoRichText({
  label = "Editor",
  value,
  onChange,
}: {
  label?: string;
  value?: string;
  onChange?: (markdown: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: value ?? "<p></p>",
    immediatelyRender: false,
    editorProps: { attributes: { "aria-label": label } },
    onUpdate: ({ editor: instance }) => onChange?.(instance.getText()),
  });
  return (
    <div data-evo="rich-text" className="evo-field">
      <span className="evo-label">{label}</span>
      <div className="evo-editor-toolbar" role="toolbar" aria-label="Formatting">
        <EvoButton size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</EvoButton>
        <EvoButton size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</EvoButton>
        <EvoButton size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBulletList().run()}>List</EvoButton>
      </div>
      <EditorContent editor={editor} className="evo-editor" />
    </div>
  );
}

export const RichText = EvoRichText;
