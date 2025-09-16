import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, ChevronRight, ChevronsUpDown, X } from "lucide-react"
import { useState } from "react"

// 节点类型
type TreeNode = {
  id: string
  label: string
  children?: TreeNode[]
}

// 示例数据
const treeData: TreeNode[] = [
  {
    id: "1",
    label: "系统管理",
    children: [
      { id: "1-1", label: "用户管理" },
      { id: "1-2", label: "角色管理" },
      {
        id: "1-3",
        label: "权限配置",
        children: [
          { id: "1-3-1", label: "菜单管理" },
          { id: "1-3-2", label: "按钮权限" },
        ],
      },
    ],
  },
  {
    id: "2",
    label: "报表管理",
    children: [
      { id: "2-1", label: "日报表" },
      { id: "2-2", label: "月报表" },
    ],
  },
]

type TreeProps = {
  nodes: TreeNode[]
  selected: string[]
  onChange: (ids: string[]) => void
  filter: string
}

// 渲染树
function Tree({ nodes, selected, onChange, filter }: TreeProps) {
  const [expanded, setExpanded] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleSelect = (id: string) => {
    onChange(
      selected.includes(id)
        ? selected.filter((x) => x !== id)
        : [...selected, id]
    )
  }

  return (
    <ul className="pl-2 space-y-1">
      {nodes
        .filter((n) => n.label.toLowerCase().includes(filter.toLowerCase()))
        .map((node) => {
          const isExpanded = expanded.includes(node.id)
          const hasChildren = !!node.children?.length
          const isSelected = selected.includes(node.id)

          return (
            <li key={node.id}>
              <div className="flex items-center space-x-2 ">
                <div className="w-4 h-4 flex items-center justify-center">
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpand(node.id)}
                    >
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </button>
                  ) : (
                    <span className="w-4" />
                  )}
                </div>
                <Checkbox
                  className="h-4 w-4"
                  checked={isSelected}
                  onCheckedChange={() => toggleSelect(node.id)}
                />

                <span
                  className="cursor-pointer"
                  onClick={() => toggleSelect(node.id)}
                >
                  {node.label}
                </span>
              </div>

              {hasChildren && isExpanded && (
                <div className="pl-4">
                  <Tree
                    nodes={node.children!}
                    selected={selected}
                    onChange={onChange}
                    filter={filter}
                  />
                </div>
              )}
            </li>
          )
        })}
    </ul>
  )
}

export default function TreeSelect() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>([])
  const [filter, setFilter] = useState("")

  // 根据 id 找 label
  const getLabels = (ids: string[]): string[] => {
    const result: string[] = []
    const traverse = (nodes: TreeNode[]) => {
      for (const node of nodes) {
        if (ids.includes(node.id)) result.push(node.label)
        if (node.children) traverse(node.children)
      }
    }
    traverse(treeData)
    return result
  }

  const selectedLabels = getLabels(selected)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-64 justify-between"
        >
          {selectedLabels.length > 0
            ? selectedLabels.join(", ")
            : "请选择"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-2">
        <Input
          placeholder="搜索..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-2"
        />

        <div className="max-h-64 overflow-y-auto pr-2">
          <Tree
            nodes={treeData}
            selected={selected}
            onChange={setSelected}
            filter={filter}
          />
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {selectedLabels.map((label, i) => (
              <span
                key={i}
                className="flex items-center px-2 py-1 bg-muted rounded text-sm"
              >
                {label}
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={() =>
                    setSelected((prev) =>
                      prev.filter((id) => getLabels([id])[0] !== label)
                    )
                  }
                />
              </span>
            ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
