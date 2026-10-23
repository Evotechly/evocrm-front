import * as React from "react";
import { EvoRelativeTime } from "../data-display/relative-time";
import { EvoButton } from "../foundations/button";

export type EvoComment = {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  replies?: EvoComment[];
};

function Thread({ comment, onDelete }: { comment: EvoComment; onDelete?: (id: string) => void }) {
  const [editing, setEditing] = React.useState(false);
  return (
    <li>
      <strong>{comment.author}</strong> <EvoRelativeTime date={comment.createdAt} />
      {editing ? <textarea className="evo-textarea" defaultValue={comment.body} /> : <p>{comment.body}</p>}
      <div className="evo-toolbar">
        <EvoButton size="sm" variant="ghost" onClick={() => setEditing((value) => !value)}>Edit</EvoButton>
        <EvoButton size="sm" variant="ghost" onClick={() => onDelete?.(comment.id)}>Delete</EvoButton>
        <EvoButton size="sm" variant="ghost" aria-label="React">👍</EvoButton>
      </div>
      {comment.replies?.length ? (
        <ul>
          {comment.replies.map((reply) => (
            <Thread key={reply.id} comment={reply} onDelete={onDelete} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function EvoComments({ comments }: { comments: EvoComment[] }) {
  return (
    <ul data-evo="comments" className="evo-comments">
      {comments.map((comment) => (
        <Thread key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export const Comments = EvoComments;
