import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import TreeSelect, { TreeNode, TreeSelectProps } from "./tree-select";
type OmittedTreeSelectProps  = Omit<TreeSelectProps, 'value' | 'onChange'|'data'>;

// 2. 重新定义 value 和 onChange 的类型
type GroupTreeSelectProps = OmittedTreeSelectProps & {
  value?: string;
  onChange?: (value: string) => void;
};
export type GroupNode = TreeNode & {
  id: string
  children?: GroupNode[]
  parentId?: string
  order: number
  name: string
}
function buildTree(data: GroupNode[]): GroupNode[] {
  const map = new Map<string, GroupNode>();
  const roots: GroupNode[] = [];
  // 初始化 map
  for (const item of data) {
    item.title = item.name;
    item.value = item.id;
    map.set(item.value, { ...item, children: [] });
  }
  // 构建树结构
  for (const item of data) {
    const node = map.get(item.value)!;
    if (item.parentId && map.has(item.parentId)) {
      const parent = map.get(item.parentId)!;
      parent.children!.push(node);
    } else {
      roots.push(node);
    }
  }

  // 递归排序函数
  function sortByOrder(nodes: GroupNode[]) {
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
export default function GroupTreeSelect({ onChange: onChangeHandle, value, ...props }: GroupTreeSelectProps) {
  const [data, setData] = useState<TreeNode[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios.get('/common/groups').then(res => {
      console.log(buildTree(res.data.data))
      setData(buildTree(res.data.data))
      setLoading(true)
    })
  }, [])

  return (
    loading && (
      <TreeSelect
        data={data}
        multiple={false}
        value={value}
        // ✅ 适配 TreeSelect 的 onChange
        onChange={(value) => {
          if (typeof value === "string") {
            onChangeHandle?.(value)
          }
        }}
        {...props}
        
      />
    )
  )
}

