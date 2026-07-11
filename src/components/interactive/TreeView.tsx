import { useId } from "preact/hooks";
import * as treeView from "@zag-js/tree-view";
import { useMachine, normalizeProps } from "@zag-js/preact";

export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

export interface TreeViewProps {
  data: TreeNode[];
  label?: string;
}

// deno-lint-ignore no-explicit-any
function renderNodes(api: any, nodes: TreeNode[], depth = 1): preact.JSX.Element[] {
  return nodes.map((node) => {
    const nodeProps = { node, indexPath: [depth] };
    if (node.children && node.children.length > 0) {
      return (
        <div key={node.id} {...api.getBranchProps(nodeProps)}>
          <div {...api.getBranchControlProps(nodeProps)}>
            <span {...api.getBranchIndicatorProps(nodeProps)}>▶</span>
            <span {...api.getBranchTextProps(nodeProps)}>{node.name}</span>
          </div>
          <div {...api.getBranchContentProps(nodeProps)}>
            {renderNodes(api, node.children, depth + 1)}
          </div>
        </div>
      );
    }
    return (
      <div key={node.id} {...api.getItemProps(nodeProps)}>
        <span {...api.getItemTextProps(nodeProps)}>{node.name}</span>
      </div>
    );
  });
}

export function TreeView({ data, label }: TreeViewProps) {
  const collection = treeView.collection({
    nodeToValue: (node: TreeNode) => node.id,
    nodeToString: (node: TreeNode) => node.name,
    rootNode: { id: "root", name: "", children: data },
  });
  const service = useMachine(treeView.machine, { id: useId(), collection });
  const api = treeView.connect(service, normalizeProps);
  return (
    <div {...api.getRootProps()}>
      {label && <label {...api.getLabelProps()}>{label}</label>}
      <div {...api.getTreeProps()}>
        {renderNodes(api, data)}
      </div>
    </div>
  );
}
