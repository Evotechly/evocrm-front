import * as React from "react";

export function EvoWorkflowBuilder({
  nodes,
}: {
  nodes: { id: string; label: string }[];
}) {
  return (
    <ol data-evo="workflow-builder" className="evo-workflow">
      {nodes.map((node, index) => (
        <li key={node.id}>
          <span className="evo-step-index">{index + 1}</span>
          {node.label}
        </li>
      ))}
    </ol>
  );
}

export const WorkflowBuilder = EvoWorkflowBuilder;
