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
  value: string
  title: string
  children?: TreeNode[]
}

export type FieldNames = {
  value?: string
  title?: string
  children?: string
}

export type TreeSelectProps = {
  data: any[]
  multiple?: boolean
  value?: string[] | string
  defaultValue?: string[] | string
  onChange?: (ids: string[] | string) => void
  placeholder?: string
  filterable?: boolean
  showParent?: boolean
  showChild?: boolean
  maxTagCount?: number
  fieldNames?: FieldNames
}

// ------------------- 工具函数 -------------------

// 根据 selected 判断节点状态
function getCheckStatus(node: TreeNode, selected: string[]): boolean | "indeterminate" {
  if (!node.children?.length) return selected.includes(node.value)
  const childStatuses = node.children.map((c) => getCheckStatus(c, selected))
  const allChecked = childStatuses.every((s) => s === true)
  const noneChecked = childStatuses.every((s) => s === false)
  if (allChecked) return true
  if (noneChecked) return false
  return "indeterminate"
}

// 收集子节点 ID
function collectChildIds(node: TreeNode): string[] {
  const ids: string[] = [node.value]
  if (node.children) node.children.forEach((c) => ids.push(...collectChildIds(c)))
  return ids
}

// ------------------- 树组件 -------------------
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
      onChange([node.value])
    }
  }

  return (
    <ul className="pl-2 space-y-1">
      {nodes
        .filter((n) => n.title.toLowerCase().includes(filter.toLowerCase()))
        .map((node) => {
          const isExpanded = expanded.includes(node.value)
          const hasChildren = !!node.children?.length
          const status = getCheckStatus(node, selected)

          return (
            <li key={node.value}>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 flex items-center justify-center">
                  {hasChildren ? (
                    <button onClick={() => toggleExpand(node.value)}>
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
                      toggleSelect(node, value === node.value)
                    }}
                  >
                    <RadioGroupItem
                      value={node.value}
                      className="h-4 w-4 cursor-pointer"
                    />
                  </RadioGroup>
                )}
                <span
                  className="cursor-pointer"
                  onClick={() => toggleSelect(node, status !== true)}
                >
                  {node.title}
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

// ------------------- TreeSelect 组件 -------------------
export default function TreeSelect(props: TreeSelectProps) {
  const {
    data,
    multiple = true,
    value,
    defaultValue = [],
    onChange,
    placeholder = "",
    filterable = true,
    showParent = true,
    showChild = true,
    maxTagCount = 3,
    fieldNames = { value: "value", title: "title", children: "children" },
  } = props

  // ------------- 数据映射 -------------
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const transformData = (data: any[]): TreeNode[] =>
    data.map((item) => ({
      value: item[fieldNames.value!],
      title: item[fieldNames.title!],
      children: item[fieldNames.children!]
        ? transformData(item[fieldNames.children!])
        : undefined,
    }))

  const treeData = transformData(data)

  // ------------- 受控/非受控 -------------
  const thisValue = value ? (Array.isArray(value) ? value : [value]) : []
  const thisDefaultValue = defaultValue
    ? Array.isArray(defaultValue)
      ? defaultValue
      : [defaultValue]
    : []

  const [selected, setSelected] = useState<string[]>(thisValue || thisDefaultValue)
  const [filter, setFilter] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (value) setSelected(Array.isArray(value) ? value : [value])
  }, [value])

  // ------------- 标签显示 -------------
  const getSelectedLabels = (nodes: TreeNode[], selectedIds: string[]): string[] => {
    if (!selectedIds || selectedIds.length === 0) return []

    if (!multiple) {
      const findLabel = (nodes: TreeNode[], id: string): string | null => {
        for (const node of nodes) {
          if (node.value === id) return node.title
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

    const result: { value: string; title: string; depth: number }[] = []

    const traverse = (node: TreeNode, depth: number): number => {
      if (!node.children?.length) {
        if (showChild && selectedIds.includes(node.value)) {
          result.push({ value: node.value, title: node.title, depth })
        }
        return selectedIds.includes(node.value) ? 1 : 0
      }

      let count = 0
      node.children.forEach((child) => (count += traverse(child, depth + 1)))

      if (count === node.children.length) {
        if (showParent) result.push({ value: node.value, title: node.title, depth })
      } else if (count > 0) {
        if (showParent) result.push({ value: node.value, title: node.title, depth })
      }
      return count
    }

    nodes.forEach((n) => traverse(n, 0))

    const unique = Array.from(new Map(result.map((r) => [r.value, r])).values())
    unique.sort((a, b) => a.depth - b.depth)

    return unique.map((r) => r.title)
  }

  const selectedLabels = getSelectedLabels(treeData, selected)

  // ------------- 操作事件 -------------
  const handleChange = (ids: string[]) => {
    setSelected(ids)
    onChange?.(multiple ? ids : ids.length > 0 ? ids[0] : "")
  }

  const handleSelectAll = () => handleChange(treeData.flatMap((n) => collectChildIds(n)))
  const handleClearAll = () => handleChange([])

  const { formatMessage } = useIntl()

  // ------------- 渲染 -------------
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="w-64 cursor-pointer flex flex-wrap items-center gap-1 border border-input rounded px-2 py-1 min-h-[2.5rem]"
        >
          {selectedLabels.length === 0 && <span className="text-muted-foreground">{placeholder}</span>}
          {selectedLabels.slice(0, maxTagCount).map((label, i) => (
            <Badge
              key={i}
              className="flex items-center gap-1 px-2 py-1 cursor-default relative"
            >
              {label}
              <button
                type="button"
                aria-label="delete"
                onClick={() => {
                  if (multiple) {
                    handleChange(selected.filter((id) => {
                      const lbl = getSelectedLabels(treeData, [id])[0]
                      return lbl !== label
                    }))
                  } else {
                    handleChange([])
                  }
                }}
              >
                <X className="h-3 w-3 cursor-pointer relative" />
              </button>
            </Badge>
          ))}
          {selectedLabels.length > maxTagCount && (
            <Badge className="flex items-center gap-1 px-2 py-1 cursor-default relative">
              {maxTagCount}+
            </Badge>
          )}
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-64 p-2 relative z-50 pointer-events-auto">
        {filterable && (
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="搜索..."
            className="mb-2 flex-1 focus:ring-0 p-2"
          />
        )}
        <div className="max-h-64 overflow-y-auto pr-2">
          <Tree nodes={treeData} selected={selected} onChange={handleChange} filter={filter} multiple={multiple} />
        </div>

        {multiple && (
          <div className="flex justify-end gap-2 mt-3 border-t pt-2">
            <Button size="sm" variant="outline" onClick={handleClearAll}>
              {formatMessage({ id: 'button.clear' })}
            </Button>
            <Button size="sm" onClick={handleSelectAll}>
              {formatMessage({ id: 'button.selectAll' })}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}
