import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import TreeSelect from "./ext/tree-select";
type PermissionTreeSelectProps = {
  value: string
  onChange: (ids: string) => void
  placeholder?: string
}
export type PermissionNode = {
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
  const [data, setData] = useState<PermissionNode[]>([])
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
        if (typeof value === 'string') {
          onChangeHandle?.(value)
        }
      }}
      fieldNames={{ value: "id", title: "name", children: "children" }}
      multiple={false}
      {...props}
      filterable
    />
  )
}
