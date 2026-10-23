import * as React from "react";

export function EvoFileUpload({
  label = "Upload files",
  onFiles,
}: {
  label?: string;
  onFiles?: (files: File[]) => void;
}) {
  const [files, setFiles] = React.useState<File[]>([]);
  const id = React.useId();
  return (
    <div
      data-evo="file-upload"
      className="evo-empty"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const next = Array.from(event.dataTransfer.files);
        setFiles(next);
        onFiles?.(next);
      }}
    >
      <label className="evo-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type="file"
        multiple
        onChange={(event) => {
          const next = Array.from(event.target.files ?? []);
          setFiles(next);
          onFiles?.(next);
        }}
      />
      <p className="evo-empty-description">{files.length ? `${files.length} file(s)` : "Drop files or browse"}</p>
    </div>
  );
}

export const FileUpload = EvoFileUpload;
