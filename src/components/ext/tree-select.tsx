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
  id?: string
  name?: string
  value: string
  title: string
  children?: TreeNode[]
  // 添加这一行来解决索引签名缺失的问题
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any 
}

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

// 1. 获取节点的选中状态（用于 UI 渲染 Checkbox）
function getCheckStatus(node: TreeNode, selected: string[]): boolean | "indeterminate" {
  if (!node.children?.length) return selected.includes(node.value);
  const childStatuses = node.children.map((c) => getCheckStatus(c, selected));
  const allChecked = childStatuses.every((s) => s === true);
  const noneChecked = childStatuses.every((s) => s === false);
  if (allChecked) return true;
  if (noneChecked) return false;
  return "indeterminate";
}

// 2. 递归获取该节点下所有的子 ID (包含自身)
function collectAllChildIds(node: TreeNode): string[] {
  const ids: string[] = [node.value];
  if (node.children) {
    node.children.forEach((c) => ids.push(...collectAllChildIds(c)));
  }
  return ids;
}

// 3. 核心压缩逻辑：根据全量选中的 ID，计算出应该显示的“压缩版”节点
// 如果父节点下所有子节点都被选中，则只返回父节点
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
      // 关键步骤：如果是全选，则移除刚才递归加入 result 的子节点，改为加入父节点
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
}: {
  nodes: TreeNode[];
  selected: string[];
  onToggle: (node: TreeNode, checked: boolean) => void;
  filter: string;
  multiple?: boolean;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const filteredNodes = nodes.filter((n) =>
    n.title.toLowerCase().includes(filter.toLowerCase()) || 
    n.children?.some(c => c.title.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <ul className="pl-2 space-y-1">
      {filteredNodes.map((node) => {
        const isExpanded = expanded.includes(node.value) || filter !== "";
        const hasChildren = !!node.children?.length;
        const status = getCheckStatus(node, selected);

        return (
          <li key={node.value}>
            <div className="flex items-center space-x-2 py-0.5 hover:bg-accent/50 rounded px-1 transition-colors">
              <div className="w-4 h-4 flex items-center justify-center">
                {hasChildren && (
                  <button type="button" onClick={(e) => toggleExpand(node.value, e)}>
                    <ChevronRight className={cn("h-3 w-3 text-muted-foreground transition-transform", isExpanded && "rotate-90")} />
                  </button>
                )}
              </div>

              {multiple ? (
                <Checkbox
                  className="h-4 w-4"
                  checked={status}
                  onCheckedChange={(checked) => onToggle(node, checked === true)}
                />
              ) : (
                <RadioGroup
                  value={selected[0] || ""}
                  onValueChange={() => onToggle(node, true)}
                >
                  <RadioGroupItem value={node.value} className="h-4 w-4" />
                </RadioGroup>
              )}
              <span
                className="cursor-pointer text-sm select-none truncate flex-1"
                onClick={() => onToggle(node, status !== true)}
              >
                {node.title}
              </span>
            </div>

            {hasChildren && isExpanded && (
              <div className="pl-4 border-l ml-2 mt-1">
                <Tree
                  nodes={node.children!}
                  selected={selected}
                  onToggle={onToggle}
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
    maxTagCount = 3,
    fieldNames = { value: "value", title: "title", children: "children" },
    className,
  } = props;

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  // ------------- 数据标准化 -------------
  const treeData = useMemo(() => {
    const transform = (nodes: Record<string, unknown>[]): TreeNode[] =>
      nodes.map((item) => {
        const vKey = fieldNames.value || "value";
        const tKey = fieldNames.title || "title";
        const cKey = fieldNames.children || "children";
        const childrenData = item[cKey];
        return {
          value: String(item[vKey]),
          title: String(item[tKey]),
          children: Array.isArray(childrenData) ? transform(childrenData as Record<string, unknown>[]) : undefined,
        };
      });
    return transform(data);
  }, [data, fieldNames]);

  // ------------- 状态管理 -------------
  const [selected, setSelected] = useState<string[]>(() => {
    const val = value !== undefined ? value : defaultValue;
    return Array.isArray(val) ? val : val ? [val] : [];
  });

  useEffect(() => {
    if (value !== undefined) {
      setSelected(Array.isArray(value) ? value : [value]);
    }
  }, [value]);

  // 处理点击选择逻辑
  const handleToggle = (node: TreeNode, checked: boolean) => {
    let newSelected: string[];
    const allChildIds = collectAllChildIds(node);

    if (multiple) {
      if (checked) {
        newSelected = Array.from(new Set([...selected, ...allChildIds]));
      } else {
        newSelected = selected.filter((id) => !allChildIds.includes(id));
      }
    } else {
      newSelected = [node.value];
      setOpen(false);
    }

    setSelected(newSelected);
    
    // 计算压缩后的值（即：全选父节点则只返回父 ID）
    const consolidated = getConsolidatedNodes(treeData, newSelected);
    const finalIds = consolidated.map(n => n.value);
    onChange?.(multiple ? finalIds : (finalIds[0] || ""));
  };

  // 根据当前 selected 计算展示用的 Badge
  const displayNodes = useMemo(() => getConsolidatedNodes(treeData, selected), [treeData, selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "group relative flex min-h-[2.5rem] w-full cursor-pointer flex-wrap items-center gap-1 rounded-md border border-input bg-background py-1.5 pl-2 pr-9 text-sm transition-all hover:border-accent-foreground/30 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
            className
          )}
        >
          {displayNodes.length === 0 && <span className="text-muted-foreground select-none">{placeholder}</span>}

          {displayNodes.slice(0, maxTagCount).map((node) => (
            <Badge key={node.value} variant="secondary" className="flex items-center gap-1 px-1 py-0 font-normal">
              {node.title}
              {/* 仅在多选模式下显示删除叉号 */}
              {multiple && (
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(node, false); 
                  }}
                />
              )}
            </Badge>
          ))}

          {displayNodes.length > maxTagCount && (
            <Badge variant="secondary" className="px-1 py-0 font-normal">
              +{displayNodes.length - maxTagCount}
            </Badge>
          )}

          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-1 text-muted-foreground/50">
            {selected.length > 0 && (
              <X className="h-4 w-4 hover:text-foreground transition-colors" onClick={(e) => { e.stopPropagation(); setSelected([]); onChange?.(multiple ? [] : ""); }} />
            )}
            <div className="w-[1px] h-4 bg-border mx-0.5" />
            <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent align="start" className="p-0 w-[var(--radix-popover-trigger-width)] min-w-[200px]">
        {filterable && (
          <div className="p-2 border-b">
            <Input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="搜索..."
              className="h-8 text-xs border-none bg-muted/50 focus-visible:ring-0"
            />
          </div>
        )}

        <div className="max-h-64 overflow-y-auto p-2">
          {treeData.length > 0 ? (
            <Tree
              nodes={treeData}
              selected={selected}
              onToggle={handleToggle}
              filter={filter}
              multiple={multiple}
            />
          ) : (
            <div className="py-10 text-center text-xs text-muted-foreground italic">无匹配结果</div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}