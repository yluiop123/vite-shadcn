import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

// ------------------- 类型定义 -------------------

export type TreeNode = {
  id?: string;
  name?: string;
  value: string;
  title: string;
  children?: TreeNode[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export type FieldNames = {
  value?: string;
  title?: string;
  children?: string;
};

export type TreeSelectProps = {
  data: TreeNode[];
  multiple?: boolean;
  value?: string[] | string;
  defaultValue?: string[] | string;
  onChange?: (ids: string[] | string) => void;
  placeholder?: string;
  filterable?: boolean;
  maxTagCount?: number;
  fieldNames?: FieldNames;
  className?: string;
};

// ------------------- 工具函数 -------------------

/**
 * 计算节点的选中状态
 * 多选模式：需要判断全选/半选
 * 单选模式：只看自身 ID
 */
function getCheckStatus(node: TreeNode, selected: string[], multiple: boolean): boolean | "indeterminate" {
  if (!multiple) {
    return selected.includes(node.value);
  }

  // 多选联动逻辑
  if (!node.children?.length) {
    return selected.includes(node.value);
  }

  const childStatuses = node.children.map((c) => getCheckStatus(c, selected, true));
  const allChecked = childStatuses.every((s) => s === true);
  const noneChecked = childStatuses.every((s) => s === false);

  if (allChecked) return true;
  if (noneChecked) return false;
  return "indeterminate";
}

/**
 * 递归收集所有子节点 ID（用于多选全选）
 */
function collectAllChildIds(node: TreeNode): string[] {
  const ids: string[] = [node.value];
  if (node.children) {
    node.children.forEach((c) => ids.push(...collectAllChildIds(c)));
  }
  return ids;
}

/**
 * 多选模式专用的展示优化：如果子节点全选，则只显示父节点 Tag
 */
function getConsolidatedNodes(nodes: TreeNode[], selectedIds: string[]): TreeNode[] {
  const result: TreeNode[] = [];

  function traverse(node: TreeNode): boolean {
    if (!node.children || node.children.length === 0) {
      const isSelected = selectedIds.includes(node.value);
      if (isSelected) result.push(node);
      return isSelected;
    }

    const childrenSelectedCount = node.children.filter((child) => traverse(child)).length;
    const isAllChildrenSelected = childrenSelectedCount === node.children.length;

    if (isAllChildrenSelected) {
      // 如果全选了，把已经加进去的子节点过滤掉，只留父节点
      const childIds = collectAllChildIds(node).filter((id) => id !== node.value);
      for (let i = result.length - 1; i >= 0; i--) {
        if (childIds.includes(result[i].value)) {
          result.splice(i, 1);
        }
      }
      result.push(node);
      return true;
    }
    return childrenSelectedCount > 0;
  }

  nodes.forEach((n) => traverse(n));
  return result;
}

// ------------------- 子组件: Tree -------------------

function Tree({
  nodes,
  selected,
  onToggle,
  filter,
  multiple = true,
  level = 0,
}: {
  nodes: TreeNode[];
  selected: string[];
  onToggle: (node: TreeNode, checked: boolean) => void;
  filter: string;
  multiple?: boolean;
  level?: number;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filteredNodes = nodes.filter((n) => {
    const matchSelf = n.title.toLowerCase().includes(filter.toLowerCase());
    const matchChildren = n.children?.some((c) =>
      c.title.toLowerCase().includes(filter.toLowerCase())
    );
    return matchSelf || matchChildren;
  });

  return (
    <ul className={cn("space-y-1", level > 0 && "ml-3 pl-2 border-l border-muted-foreground/20")}>
      {filteredNodes.map((node) => {
        const isExpanded = expanded.includes(node.value) || filter !== "";
        const hasChildren = !!node.children?.length;
        const status = getCheckStatus(node, selected, multiple);

        return (
          <li key={node.value} className="relative">
            <div
              className={cn(
                "flex items-center space-x-2 py-1 rounded-sm px-1 transition-colors group/item hover:bg-accent/50"
              )}
            >
              {/* 展开箭头 */}
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                {hasChildren && (
                  <button
                    type="button"
                    onClick={(e) => toggleExpand(node.value, e)}
                    className="hover:bg-accent rounded p-0.5 transition-colors"
                  >
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 text-muted-foreground transition-transform duration-200",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </button>
                )}
              </div>

              {/* 选择控制（多选用复选框，单选用单选框） */}
              {multiple ? (
                <Checkbox
                  className="h-4 w-4 shrink-0"
                  checked={status}
                  onCheckedChange={(checked) => onToggle(node, checked === true)}
                />
              ) : (
                <RadioGroup 
                  value={selected[0] || ""} 
                  onValueChange={() => onToggle(node, true)}
                >
                  <RadioGroupItem value={node.value} className="h-4 w-4 shrink-0" />
                </RadioGroup>
              )}

              {/* 标题文字 */}
              <span
                className={cn(
                  "text-sm select-none truncate flex-1 leading-none py-1 cursor-pointer",
                  status === true && "text-primary font-medium"
                )}
                onClick={() => onToggle(node, status !== true)}
              >
                {node.title}
              </span>
            </div>

            {/* 子树递归 */}
            {hasChildren && isExpanded && (
              <Tree
                nodes={node.children!}
                selected={selected}
                onToggle={onToggle}
                filter={filter}
                multiple={multiple}
                level={level + 1}
              />
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
    maxTagCount = 3,
    fieldNames = { value: "value", title: "title", children: "children" },
    className,
  } = props;

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  // 数据格式化（支持自定义字段名）
  const treeData = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transform = (nodes: any[]): TreeNode[] =>
      nodes.map((item) => {
        const vKey = fieldNames.value || "value";
        const tKey = fieldNames.title || "title";
        const cKey = fieldNames.children || "children";
        const childrenData = item[cKey];
        return {
          ...item,
          value: String(item[vKey]),
          title: String(item[tKey]),
          children: Array.isArray(childrenData) ? transform(childrenData) : undefined,
        };
      });
    return transform(data);
  }, [data, fieldNames]);

  const [selected, setSelected] = useState<string[]>(() => {
    const val = value !== undefined ? value : defaultValue;
    return Array.isArray(val) ? val : val ? [val] : [];
  });

  useEffect(() => {
    if (value !== undefined) {
      setSelected(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  const handleToggle = (node: TreeNode, checked: boolean) => {
    let newSelected: string[];

    if (multiple) {
      // 多选：联动逻辑
      const allChildIds = collectAllChildIds(node);
      if (checked) {
        newSelected = Array.from(new Set([...selected, ...allChildIds]));
      } else {
        newSelected = selected.filter((id) => !allChildIds.includes(id));
      }
    } else {
      // 单选：完全独立，选中即关闭
      newSelected = [node.value];
      setOpen(false);
    }

    setSelected(newSelected);

    // 回调逻辑
    if (multiple) {
      // 多选返回合并后的 ID 列表（可选）
      const consolidated = getConsolidatedNodes(treeData, newSelected);
      onChange?.(consolidated.map(n => n.value));
    } else {
      onChange?.(newSelected[0] || "");
    }
  };

  // 顶部 Tag 展示逻辑
  const displayNodes = useMemo(() => {
    if (multiple) {
      return getConsolidatedNodes(treeData, selected);
    }
    // 单选模式展示选中的那个节点
    const findNode = (nodes: TreeNode[], val: string): TreeNode | null => {
      for (const n of nodes) {
        if (n.value === val) return n;
        if (n.children) {
          const found = findNode(n.children, val);
          if (found) return found;
        }
      }
      return null;
    };
    const node = selected[0] ? findNode(treeData, selected[0]) : null;
    return node ? [node] : [];
  }, [treeData, selected, multiple]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "group relative flex min-h-[2.5rem] w-full cursor-pointer flex-wrap items-center gap-1.5 rounded-md border border-input bg-background py-1.5 pl-2 pr-9 text-sm transition-all duration-200",
            "hover:border-primary/50",
            "focus-within:ring-1 focus-within:ring-ring focus-within:border-primary",
            className
          )}
        >
          {displayNodes.length === 0 && (
            <span className="text-muted-foreground select-none">{placeholder}</span>
          )}

          {displayNodes.slice(0, maxTagCount).map((node) => (
            <Badge
              key={node.value}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-0.5 font-normal border-primary/20 text-primary bg-primary/5"
            >
              {node.title}
              {multiple && (
                <X
                  className="h-3.5 w-3.5 cursor-pointer rounded-full p-0.5 hover:bg-destructive hover:text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(node, false);
                  }}
                />
              )}
            </Badge>
          ))}

          {displayNodes.length > maxTagCount && (
            <Badge variant="outline" className="px-1.5 py-0.5 font-normal border-primary/20 text-primary bg-primary/5">
              +{displayNodes.length - maxTagCount}
            </Badge>
          )}

          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 text-muted-foreground/50">
            {selected.length > 0 && (
              <X
                className="h-4 w-4 hover:text-destructive transition-colors cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected([]);
                  onChange?.(multiple ? [] : "");
                }}
              />
            )}
            <div className="w-[1px] h-4 bg-border mx-0.5" />
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", open && "rotate-180 text-primary")} />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[240px] shadow-lg border-muted"
      >
        {filterable && (
          <div className="p-2 border-b border-muted">
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="搜索..."
              className="h-8 text-xs border-none bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary/40 focus-visible:bg-background transition-all"
            />
          </div>
        )}

        <div className="max-h-[320px] overflow-y-auto p-2">
          {treeData.length > 0 ? (
            <Tree
              nodes={treeData}
              selected={selected}
              onToggle={handleToggle}
              filter={filter}
              multiple={multiple}
            />
          ) : (
            <div className="py-10 text-center text-xs text-muted-foreground italic">
              无匹配结果
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}