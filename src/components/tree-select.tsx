import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronDown, ChevronRight, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useIntl } from "react-intl"

export type TreeNode = {
  id: string
  label: string
  children?: TreeNode[]
}

export type TreeSelectProps = {
  data: TreeNode[]
  multiple?: boolean
  value?: string[]
  defaultValue?: string[]
  onChange?: (ids: string[]) => void
  placeholder?: string
  filterable?: boolean
}

// 计算节点状态
function getCheckStatus(node: TreeNode, selected: string[]): boolean | "indeterminate" {
  if (!node.children?.length) return selected.includes(node.id)
  const childStatuses = node.children.map((c) => getCheckStatus(c, selected))
  const allChecked = childStatuses.every((s) => s === true)
  const noneChecked = childStatuses.every((s) => s === false)
  if (allChecked) return true
  if (noneChecked) return false
  return "indeterminate"
}

// 收集子节点 ID
function collectChildIds(node: TreeNode): string[] {
  const ids: string[] = [node.id]
  if (node.children) node.children.forEach((c) => ids.push(...collectChildIds(c)))
  return ids
}

// 渲染树
function Tree({
  nodes,
  selected,
  onChange,
  filter,
  multiple = true,
}: {
  nodes: TreeNode[]
  selected: string[]
  onChange: (ids: string[]) => void
  filter: string
  multiple?: boolean
}) {
  const [expanded, setExpanded] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const toggleSelect = (node: TreeNode, checked: boolean) => {
    const allIds = collectChildIds(node)
    if (multiple) {
      if (checked) onChange(Array.from(new Set([...selected, ...allIds])))
      else onChange(selected.filter((id) => !allIds.includes(id)))
    } else {
      // 单选模式
      onChange([node.id])
    }
  }

  return (
    <ul className="pl-2 space-y-1">
      {nodes
        .filter((n) => n.label.toLowerCase().includes(filter.toLowerCase()))
        .map((node) => {
          const isExpanded = expanded.includes(node.id)
          const hasChildren = !!node.children?.length
          const status = getCheckStatus(node, selected)

          return (
            <li key={node.id}>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  {hasChildren ? (
                    <button onClick={() => toggleExpand(node.id)}>
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

                {multiple ? (
                  <Checkbox
                    className="h-4 w-4 cursor-pointer"
                    checked={status}
                    onCheckedChange={(checked) => 
                      toggleSelect(node, checked === true)
                    }
                  />
                ) : (
                  <RadioGroup
                    value={selected[0] || ""}
                    onValueChange={(value) => {
                      toggleSelect(node, value === node.id)
                    }}
                  >
                    <RadioGroupItem
                      value={node.id}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </RadioGroup>
                )}
                <span
                  className="cursor-pointer"
                  onClick={() => toggleSelect(node, status !== true)}
                >
                  {node.label}
                </span>
              </div>

              {hasChildren && isExpanded && (
                <div className="pl-4">
                  <Tree nodes={node.children!} selected={selected} onChange={onChange} filter={filter} multiple={multiple} />
                </div>
              )}
            </li>
          )
        })}
    </ul>
  )
}


// TreeSelect 组件
export default function TreeSelect(props: TreeSelectProps) {
  const {
    data,
    multiple = true,
    value,
    defaultValue = [],
    onChange,
    placeholder = "",
    filterable = true,
  } = props

  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string[]>(value || defaultValue)
  const [filter, setFilter] = useState("")

  // 同步受控值
  useEffect(() => {
    if (value) setSelected(value)
  }, [value])
const getSelectedLabels = (nodes: TreeNode[], selectedIds: string[]): string[] => {
  if (!selectedIds || selectedIds.length === 0) return []

  if (!multiple) {
    // 单选模式，直接查找 label
    const findLabel = (nodes: TreeNode[], id: string): string | null => {
      for (const node of nodes) {
        if (node.id === id) return node.label
        if (node.children) {
          const res = findLabel(node.children, id)
          if (res) return res
        }
      }
      return null
    }

    const label = findLabel(nodes, selectedIds[0])
    return label ? [label] : []
  }

  // 多选模式原有逻辑
  const result: string[] = []

  const traverse = (node: TreeNode): number => {
    if (!node.children?.length) {
      if (selectedIds.includes(node.id)) result.push(node.label)
      return selectedIds.includes(node.id) ? 1 : 0
    }

    let count = 0
    node.children.forEach((child) => (count += traverse(child)))
    if (count === node.children.length) {
      result.push(node.label)
      return 1
    }
    return count
  }

  nodes.forEach(traverse)
  return result
}

  const selectedLabels = getSelectedLabels(data, selected)

  const handleChange = (ids: string[]) => {
    if (!value) setSelected(ids)
    onChange?.(ids)
  }

  const handleSelectAll = () => handleChange(data.flatMap((n) => collectChildIds(n)))
  const handleClearAll = () => handleChange([])
  const {formatMessage} = useIntl();
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="w-64 cursor-pointer flex flex-wrap items-center gap-1 border border-input rounded px-2 py-1 min-h-[2.5rem]"
          // onClick={() => setOpen(!open)}
        >
          {selectedLabels.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
          {selectedLabels.map((label, i) => (
            <Badge
              key={i}
              className="flex items-center gap-1 px-2 py-1 cursor-default relative"
            >
              {label}
              {multiple && (
                <button
                  type="button"
                  aria-label="delete"
                  onClick={() => {
                    handleChange(selected.filter((id) => {
                      const lbl = getSelectedLabels(data, [id])[0]
                      return lbl !== label
                    }))
                  }}
                >
                  <X className="h-3 w-3 cursor-pointer relative" />
                </button>
              )}
            </Badge>
          ))}
        </div>
      </PopoverTrigger>

      <PopoverContent 
      className="w-64 p-2 relative z-50 pointer-events-auto">
        {filterable && (
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="搜索..."
            className="mb-2 flex-1 focus:ring-0 p-2"
          />
        )}
        <div className="max-h-64 overflow-y-auto pr-2">
          <Tree nodes={data} selected={selected} onChange={handleChange} filter={filter} multiple={multiple} />
        </div>

        {/* 全选/全清 */}
        
          <div className="flex justify-end gap-2 mt-3 border-t pt-2">
            <Button size="sm" variant="outline" onClick={handleClearAll}>
              {formatMessage({id: 'button.clear'})}
            </Button>
            {multiple && <Button size="sm" onClick={handleSelectAll} >
              {formatMessage({id: 'button.selectAll'})}
            </Button>}
          </div>
      </PopoverContent>
    </Popover>
  )
}
