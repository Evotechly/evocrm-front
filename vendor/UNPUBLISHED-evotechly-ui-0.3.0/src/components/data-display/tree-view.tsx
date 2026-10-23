import * as React from "react";

export type EvoTreeNode = { id: string; label: string; children?: EvoTreeNode[] };

function Node({ node }: { node: EvoTreeNode }) {
  if (!node.children?.length) {
    return <li role="treeitem">{node.label}</li>;
  }
  return (
    <li role="treeitem" aria-expanded="true">
      {node.label}
      <ul role="group">
        {node.children.map((child) => (
          <Node key={child.id} node={child} />
        ))}
      </ul>
    </li>
  );
}

export function EvoTreeView({ items }: { items: EvoTreeNode[] }) {
  return (
    <ul data-evo="tree-view" role="tree" className="evo-tree">
      {items.map((item) => (
        <Node key={item.id} node={item} />
      ))}
    </ul>
  );
}

export const TreeView = EvoTreeView;
