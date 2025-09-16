import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import TreeSelect, { TreeNode } from "./tree-select";
type GroupTreeSelectProps = {
  value: string[]
  onChange: (ids: string[]) => void
  placeholder?: string
  groupId: string   // 必须传异步加载函数
}
export type GroupNode = TreeNode & {
//   id: string
//   label: string
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
    item.label = item.name;
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
export default function GroupTreeSelect({...props}:GroupTreeSelectProps) {
  const {groupId } = props;
  const [data, setData] = useState<TreeNode[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    axios.get('/common/groups/'+groupId).then(res=>{
        setData(buildTree(res.data.data));
        setLoading(true)
    })
  },[groupId])
  return (
    loading&&<TreeSelect
      data={data}
      multiple={false}
      {...props}
      filterable
    />
  )
}
