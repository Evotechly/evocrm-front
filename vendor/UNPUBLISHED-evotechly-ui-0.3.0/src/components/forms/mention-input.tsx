import * as React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";

export function EvoMentionInput({
  suggestions = [],
  onChange,
}: {
  suggestions?: { id: string; label: string }[];
  onChange?: (text: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: { class: "evo-mention" },
        suggestion: {
          items: ({ query }) =>
            suggestions.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
        },
      }),
    ],
    content: "<p></p>",
    immediatelyRender: false,
    editorProps: { attributes: { "aria-label": "Mention people or records" } },
    onUpdate: ({ editor: instance }) => onChange?.(instance.getText()),
  });
  return (
    <div data-evo="mention-input" className="evo-field">
      <label className="evo-label">Mention</label>
      <EditorContent editor={editor} className="evo-editor" />
    </div>
  );
}

export const MentionInput = EvoMentionInput;
