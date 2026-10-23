import * as React from "react";
import { EvoTagsInput } from "../forms/tags-input";
import { EvoInput } from "../forms/input";
import { EvoRichText } from "../forms/rich-text";
import { EvoFileUpload } from "../forms/file-upload";
import { EvoButton } from "../foundations/button";

export function EvoEmailComposer({
  templates = ["Follow up", "Intro"],
  onSend,
}: {
  templates?: string[];
  onSend?: (payload: { to: string[]; subject: string; body: string }) => void;
}) {
  const [to, setTo] = React.useState<string[]>([]);
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  return (
    <form
      data-evo="email-composer"
      className="evo-card"
      onSubmit={(event) => {
        event.preventDefault();
        onSend?.({ to, subject, body });
      }}
    >
      <EvoTagsInput label="To" value={to} onChange={setTo} />
      <EvoTagsInput label="Cc" />
      <EvoInput label="Subject" value={subject} onChange={(event) => setSubject(event.target.value)} />
      <label className="evo-label">
        Template
        <select className="evo-input" onChange={(event) => setSubject(event.target.value)}>
          {templates.map((template) => (
            <option key={template}>{template}</option>
          ))}
        </select>
      </label>
      <EvoRichText label="Body" onChange={setBody} />
      <EvoFileUpload label="Attachments" />
      <div className="evo-card-footer">
        <EvoButton type="submit">Send</EvoButton>
        <EvoButton type="button" variant="secondary">Schedule</EvoButton>
      </div>
    </form>
  );
}

export const EmailComposer = EvoEmailComposer;
