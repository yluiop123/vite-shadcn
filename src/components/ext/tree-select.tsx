import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import React, { useEffect, useState } from "react";

// ------------------- 类型定义 -------------------

export type TreeNode = {
  value: string;
  title: string;
  children?: TreeNode[];
};

export type FieldNames = {
  value?: string;
  title?: string;
  children?: string;
};

export type TreeSelectProps = {
  data: Record<string, unknown>[]; // 修复 any 报错，使用更安全的 Record
  multiple?: boolean;
  value?: string[] | string;
  defaultValue?: string[] | string;
  onChange?: (ids: string[] | string) => void;
  placeholder?: string;
  filterable?: boolean;
  showParent?: boolean;
  showChild?: boolean;
  maxTagCount?: number;
  fieldNames?: FieldNames;
  className?: string;
};

// ------------------- 工具函数 -------------------

function getCheckStatus(node: TreeNode, selected: string[]): boolean | "indeterminate" {
  if (!node.children?.length) return selected.includes(node.value);
  const childStatuses = node.children.map((c) => getCheckStatus(c, selected));
  const allChecked = childStatuses.every((s) => s === true);
  const noneChecked = childStatuses.every((s) => s === false);
  if (allChecked) return true;
  if (noneChecked) return false;
  return "indeterminate";
}

function collectChildIds(node: TreeNode): string[] {
  const ids: string[] = [node.value];
  if (node.children) node.children.forEach((c) => ids.push(...collectChildIds(c)));
  return ids;
}

// ------------------- 子组件: Tree -------------------

function Tree({
  nodes,
  selected,
  onChange,
  filter,
  multiple = true,
}: {
  nodes: TreeNode[];
  selected: string[];
  onChange: (ids: string[]) => void;
  filter: string;
  multiple?: boolean;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelect = (node: TreeNode, checked: boolean) => {
    const allIds = collectChildIds(node);
    if (multiple) {
      if (checked) onChange(Array.from(new Set([...selected, ...allIds])));
      else onChange(selected.filter((id) => !allIds.includes(id)));
    } else {
      onChange([node.value]);
    }
  };

  const filteredNodes = nodes.filter((n) =>
    n.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul className="pl-2 space-y-1">
      {filteredNodes.map((node) => {
        const isExpanded = expanded.includes(node.value);
        const hasChildren = !!node.children?.length;
        const status = getCheckStatus(node, selected);

        return (
          <li key={node.value}>
            <div className="flex items-center space-x-2 py-0.5">
              <div className="w-4 h-4 flex items-center justify-center">
                {hasChildren && (
                  <button type="button" onClick={(e) => toggleExpand(node.value, e)}>
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    )}
                  </button>
                )}
              </div>

              {multiple ? (
                <Checkbox
                  className="h-4 w-4"
                  checked={status}
                  onCheckedChange={(checked) => toggleSelect(node, checked === true)}
                />
              ) : (
                <RadioGroup
                  value={selected[0] || ""}
                  onValueChange={() => toggleSelect(node, true)}
                >
                  <RadioGroupItem value={node.value} className="h-4 w-4" />
                </RadioGroup>
              )}
              <span
                className="cursor-pointer text-sm select-none truncate"
                onClick={() => toggleSelect(node, status !== true)}
              >
                {node.title}
              </span>
            </div>

            {hasChildren && isExpanded && (
              <div className="pl-4">
                <Tree
                  nodes={node.children!}
                  selected={selected}
                  onChange={onChange}
                  filter={filter}
                  multiple={multiple}
                />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

// ------------------- 主组件: TreeSelect -------------------

export default function TreeSelect(props: TreeSelectProps) {
  const {
    data,
    multiple = true,
    value,
    defaultValue = [],
    onChange,
    placeholder = "请选择...",
    filterable = true,
    showParent = true,
    showChild = true,
    maxTagCount = 3,
    fieldNames = { value: "value", title: "title", children: "children" },
    className,
  } = props;

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  // ------------- 数据转换 (修复 any 报错) -------------
  const transformData = (nodes: Record<string, unknown>[]): TreeNode[] =>
    nodes.map((item) => {
      const vKey = fieldNames.value || "value";
      const tKey = fieldNames.title || "title";
      const cKey = fieldNames.children || "children";
      
      const childrenData = item[cKey];
      
      return {
        value: String(item[vKey]),
        title: String(item[tKey]),
        children: Array.isArray(childrenData)
          ? transformData(childrenData as Record<string, unknown>[])
          : undefined,
      };
    });

  const treeData = transformData(data);

  // ------------- 状态管理 -------------
  const getInitialValue = () => {
    const val = value !== undefined ? value : defaultValue;
    return Array.isArray(val) ? val : val ? [val] : [];
  };

  const [selected, setSelected] = useState<string[]>(getInitialValue());

  useEffect(() => {
    if (value !== undefined) {
      setSelected(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const handleChange = (ids: string[]) => {
    setSelected(ids);
    onChange?.(multiple ? ids : ids[0] || "");
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleChange([]);
  };

  // ------------- 标签回显逻辑 -------------
  const getSelectedLabels = (nodes: TreeNode[], selectedIds: string[]): string[] => {
    if (selectedIds.length === 0) return [];

    const result: { value: string; title: string; depth: number }[] = [];

    const traverse = (node: TreeNode, depth: number): number => {
      if (!node.children?.length) {
        const isSel = selectedIds.includes(node.value);
        if (showChild && isSel) {
          result.push({ value: node.value, title: node.title, depth });
        }
        return isSel ? 1 : 0;
      }

      let count = 0;
      node.children.forEach((child) => (count += traverse(child, depth + 1)));

      const isAllChecked = count === node.children.length;
      const isSomeChecked = count > 0;

      if ((isAllChecked || isSomeChecked) && showParent) {
        result.push({ value: node.value, title: node.title, depth });
      }
      return isAllChecked ? 1 : 0;
    };

    nodes.forEach((n) => traverse(n, 0));
    const unique = Array.from(new Map(result.map((r) => [r.value, r])).values());
    return unique.sort((a, b) => a.depth - b.depth).map((r) => r.title);
  };

  const selectedLabels = getSelectedLabels(treeData, selected);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "group relative flex min-h-[2.5rem] w-full cursor-pointer flex-wrap items-center gap-1 rounded-md border border-input bg-background py-1.5 pl-2 pr-9 text-sm transition-all hover:border-accent-foreground/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            className
          )}
        >
          {selectedLabels.length === 0 && (
            <span className="text-muted-foreground select-none">{placeholder}</span>
          )}

          {selectedLabels.slice(0, maxTagCount).map((label, i) => (
            <Badge key={i} variant="secondary" className="flex items-center gap-1 px-1 py-0 font-normal">
              {label}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // 移除对应的 ID
                  const newSelected = selected.filter(id => 
                    getSelectedLabels(treeData, [id])[0] !== label
                  );
                  handleChange(newSelected);
                }}
              />
            </Badge>
          ))}

          {selectedLabels.length > maxTagCount && (
            <Badge variant="secondary" className="px-1 py-0 font-normal">
              +{selectedLabels.length - maxTagCount}
            </Badge>
          )}

          {/* 右侧功能图标 */}
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 text-muted-foreground/50">
            {selected.length > 0 && (
              <X 
                className="h-4 w-4 hover:text-foreground transition-colors" 
                onClick={handleClearAll} 
              />
            )}
            <Separator orientation="vertical" className="h-4 mx-0.5" />
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180")} />
          </div>
        </div>
      </PopoverTrigger>

      {/* 下拉列表 - 使用 CSS 变量实现同宽 */}
      <PopoverContent
        align="start"
        className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[200px]"
      >
        {filterable && (
          <div className="p-2 border-b">
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="搜索..."
              className="h-8 text-xs focus-visible:ring-0 focus-visible:ring-offset-0 border-none bg-muted/50"
            />
          </div>
        )}

        <div className="max-h-64 overflow-y-auto p-2">
          {treeData.length > 0 ? (
            <Tree
              nodes={treeData}
              selected={selected}
              onChange={handleChange}
              filter={filter}
              multiple={multiple}
            />
          ) : (
            <div className="py-10 text-center text-xs text-muted-foreground italic">
              无匹配结果 / No results found
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// 辅助组件：竖线分隔符 (可选，需确保项目中已有该组件)
function Separator({ orientation, className }: { orientation: string, className: string }) {
  return <div className={cn("bg-border", orientation === "vertical" ? "w-[1px]" : "h-[1px]", className)} />;
}