import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NodeApi, NodeRendererProps, Tree, TreeApi } from "react-arborist";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
export type TreeNode = {
  id: string;
  name: string;
  parentId: string;
  level: number;
  order: number;
  children?: TreeNode[];
}

function buildTree(data: TreeNode[]): TreeNode[] {
  const map = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  // 初始化 map
  for (const item of data) {
    map.set(item.id, { ...item, children: [] });
  }

  // 构建树结构
  for (const item of data) {
    const node = map.get(item.id)!;
    if (item.parentId && map.has(item.parentId)) {
      const parent = map.get(item.parentId)!;
      parent.children!.push(node);
    } else {
      roots.push(node);
    }
  }

  // 递归排序函数
  function sortByOrder(nodes: TreeNode[]) {
    nodes.sort((a, b) => a.order - b.order);
    nodes.forEach((node) => {
      if (node.children && node.children.length > 0) {
        sortByOrder(node.children);
      }
    });
  }

  // 排序根节点
  sortByOrder(roots);
  return roots;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Node({ node, style, dragHandle }: NodeRendererProps<any>) {
  const openIcon = node.isOpen
    ? <ChevronDown className="text-gray" size={20} />
    : <ChevronRight className="text-gray" size={20} />;
  const radioIcon = node.isSelected
    ? <MdRadioButtonChecked className="text-gray" size={20} />
    : <MdRadioButtonUnchecked className="text-gray" size={20} />
  const icon = <>
    {!node.isLeaf && node.children&&node.children?.length > 0 ? openIcon : <ChevronDown className="opacity-0" size={20} />}
    {radioIcon}
  </>
  return (
    <div
      style={style}
      ref={dragHandle}
      onClick={() => node.toggle()}
      className="flex items-center gap-2 px-2 py-1 cursor-pointer w-auto h-auto"
    >
      {icon}
      <span>{node.data.name}</span>
    </div>
  );
}

export function TreeSelect(props: { onSelect: (node: NodeApi<TreeNode>[]) => void,choose:{id:string,name:string},data:TreeNode[] }) {
  const { onSelect,choose,data } = props; 
  const treeData: TreeNode[] = buildTree(data);
  const rowHeight = 36;
  const [height, setHeight] = useState(100);
  const treeRef = useRef<TreeApi<TreeNode>>(null);
  useEffect(() => {
    let animationFrame: number;
    function changeHeight() {
      const tree = treeRef?.current;
      if (!tree) return;
      setHeight(tree.visibleNodes.length * rowHeight + 10);
      animationFrame = requestAnimationFrame(changeHeight);
    }
    changeHeight();
    return () => cancelAnimationFrame(animationFrame);
  }, [treeRef]);
  

  return (
    <Tree
      ref={treeRef}
      initialData={treeData}
      openByDefault={true}
      selection={choose.id}
      indent={24}
      height={height}
      width={300}
      rowHeight={rowHeight}
      paddingTop={0}
      paddingBottom={10}
      children={Node}
      onSelect={(node) => {
        onSelect(node);
      }}
    />
  );
}

export function TreeSelectPopover(props: { onSelect: (node: NodeApi<TreeNode>[]) => void,data:TreeNode[] ,choose:{id:string,name:string}}) {
  const {data,choose}=props
  return (
      <Popover>
          <PopoverTrigger asChild>
              <Button variant="outline" className="w-[300px]">{choose.name}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
              <TreeSelect {...props} choose={choose} data={data} />
          </PopoverContent>
      </Popover>
  );
}


