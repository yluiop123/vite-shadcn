import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import TreeSelect, { TreeNode } from "./tree-select";
type PermissionTreeSelectProps = {
  value: string[]
  onChange: (ids: string[]) => void
  placeholder?: string
}
export type PermissionNode = TreeNode & {
  children?: PermissionNode[]
  parentId?: string
  id: string
  order: number
  name: string
}
function buildTree(data: PermissionNode[]): PermissionNode[] {
  const map = new Map<string, PermissionNode>();
  const roots: PermissionNode[] = [];

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
  function sortByOrder(nodes: PermissionNode[]) {
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
export default function PermissionTreeSelect({onChange:onChangeHandle, ...props}:PermissionTreeSelectProps) {
  const [data, setData] = useState<TreeNode[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    axios.get('/system/permissions').then(res=>{
        setData(buildTree(res.data.data));
        setLoading(true)
    })
  },[])
  return (
    loading&&<TreeSelect
      data={data}
      onChange={(value) => {
        if (Array.isArray(value)) {
          onChangeHandle?.(value)
        }
      }}
      multiple={true}
      {...props}
      filterable
    />
  )
}
