import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight, X } from "lucide-react";
import React, { useMemo, useState } from "react";

// ------------------- 类型定义 -------------------

export type TreeNode = {
  value: string;
  title: string;
  children?: TreeNode[];
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

const toArray = (val?: string | string[]) =>
  Array.isArray(val) ? val : val ? [val] : [];

function getCheckStatus(
  node: TreeNode,
  selected: string[],
  multiple: boolean
): boolean | "indeterminate" {
  if (!multiple) {
    return selected.includes(node.value);
  }

  if (!node.children?.length) {
    return selected.includes(node.value);
  }

  const childStatuses = node.children.map((c) =>
    getCheckStatus(c, selected, true)
  );

  const allChecked = childStatuses.every((s) => s === true);
  const noneChecked = childStatuses.every((s) => s === false);

  if (allChecked) return true;
  if (noneChecked) return false;
  return "indeterminate";
}

function collectAllChildIds(node: TreeNode): string[] {
  let ids: string[] = [node.value];
  if (node.children) {
    node.children.forEach((c) => {
      ids = ids.concat(collectAllChildIds(c));
    });
  }
  return ids;
}

function getConsolidatedNodes(
  nodes: TreeNode[],
  selectedIds: string[]
): TreeNode[] {
  const result: TreeNode[] = [];

  function traverse(node: TreeNode): boolean {
    if (!node.children?.length) {
      const isSelected = selectedIds.includes(node.value);
      if (isSelected) result.push(node);
      return isSelected;
    }

    const selectedCount = node.children.filter((c) =>
      traverse(c)
    ).length;

    if (selectedCount === node.children.length) {
      const childIds = collectAllChildIds(node).filter(
        (id) => id !== node.value
      );
      for (let i = result.length - 1; i >= 0; i--) {
        if (childIds.includes(result[i].value)) {
          result.splice(i, 1);
        }
      }
      result.push(node);
      return true;
    }

    return selectedCount > 0;
  }

  nodes.forEach(traverse);
  return result;
}

// ------------------- Tree 子组件 -------------------

function Tree({
  nodes,
  selected,
  onToggle,
  filter,
  multiple,
  level = 0,
}: {
  nodes: TreeNode[];
  selected: string[];
  onToggle: (node: TreeNode, checked: boolean) => void;
  filter: string;
  multiple: boolean;
  level?: number;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpand = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpanded((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const filteredNodes = nodes.filter((n) => {
    const matchSelf = n.title
      .toLowerCase()
      .includes(filter.toLowerCase());
    const matchChildren = n.children?.some((c) =>
      c.title.toLowerCase().includes(filter.toLowerCase())
    );
    return matchSelf || matchChildren;
  });

  return (
    <ul
      className={cn(
        "space-y-1",
        level > 0 && "ml-3 pl-2 border-l"
      )}
    >
      {filteredNodes.map((node) => {
        const isExpanded =
          expanded.includes(node.value) || filter !== "";
        const hasChildren = !!node.children?.length;
        const status = getCheckStatus(
          node,
          selected,
          multiple
        );

        return (
          <li key={node.value}>
            <div className="flex items-center gap-2 py-1 px-1 rounded hover:bg-accent/50">
              <div className="w-4 h-4 flex items-center justify-center">
                {hasChildren && (
                  <button
                    type="button"
                    onClick={(e) =>
                      toggleExpand(node.value, e)
                    }
                  >
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 transition-transform",
                        isExpanded && "rotate-90"
                      )}
                    />
                  </button>
                )}
              </div>

              {multiple ? (
                <Checkbox
                  checked={status !== false}
                  indeterminate={status === "indeterminate"}
                  onCheckedChange={(checked) =>
                    onToggle(node, checked === true)
                  }
                />
              ) : (
                <RadioGroup
                  value={selected[0] || ""}
                  onValueChange={() =>
                    onToggle(node, true)
                  }
                >
                  <RadioGroupItem value={node.value} />
                </RadioGroup>
              )}

              <span
                className="cursor-pointer"
                onClick={() =>
                  onToggle(node, status !== true)
                }
              >
                {node.title}
              </span>
            </div>

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

// ------------------- 主组件 -------------------

export default function TreeSelect(props: TreeSelectProps) {
  const {
    data,
    multiple = true,
    value,
    defaultValue,
    onChange,
    placeholder,
    filterable = true,
    maxTagCount = 3,
    fieldNames = {
      value: "value",
      title: "title",
      children: "children",
    },
    className,
  } = props;

  const isControlled = value !== undefined;

  const [innerSelected, setInnerSelected] = useState<string[]>(
    toArray(defaultValue)
  );

  const mergedSelected = isControlled
    ? toArray(value)
    : innerSelected;

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");

  const treeData = useMemo(() => {
    const transform = (nodes: any[]): TreeNode[] =>
      nodes.map((item) => {
        const v = fieldNames.value!;
        const t = fieldNames.title!;
        const c = fieldNames.children!;
        return {
          ...item,
          value: String(item[v]),
          title: String(item[t]),
          children: item[c]
            ? transform(item[c])
            : undefined,
        };
      });
    return transform(data);
  }, [data, fieldNames]);

  const handleToggle = (node: TreeNode, checked: boolean) => {
    let next: string[];

    if (multiple) {
      const ids = collectAllChildIds(node);
      next = checked
        ? Array.from(new Set([...mergedSelected, ...ids]))
        : mergedSelected.filter((id) => !ids.includes(id));
    } else {
      next = [node.value];
      setOpen(false);
    }

    if (!isControlled) {
      setInnerSelected(next);
    }

    onChange?.(
      multiple ? next : next[0] || ""
    );
  };

  const displayNodes = useMemo(() => {
    if (multiple) {
      return getConsolidatedNodes(
        treeData,
        mergedSelected
      );
    }

    const find = (
      nodes: TreeNode[],
      val: string
    ): TreeNode | null => {
      for (const n of nodes) {
        if (n.value === val) return n;
        if (n.children) {
          const r = find(n.children, val);
          if (r) return r;
        }
      }
      return null;
    };

    return mergedSelected[0]
      ? [find(treeData, mergedSelected[0])!]
      : [];
  }, [treeData, mergedSelected, multiple]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <div
          className={cn(
            "min-h-10 w-full border rounded flex flex-wrap items-center gap-1.5 px-2 py-1.5 cursor-pointer",
            className
          )}
        >
          {displayNodes.length === 0 && (
            <span className="text-muted-foreground">
              {placeholder}
            </span>
          )}

          {displayNodes.slice(0, maxTagCount).map((n) => (
            <Badge key={n.value} variant="secondary">
              {n.title}
              {multiple && (
                <X
                  className="ml-1 h-3 w-3 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(n, false);
                  }}
                />
              )}
            </Badge>
          ))}

          {displayNodes.length > maxTagCount && (
            <Badge variant="outline">
              +{displayNodes.length - maxTagCount}
            </Badge>
          )}

          <ChevronDown className="ml-auto h-4 w-4" />
        </div>
      </PopoverTrigger>

      <PopoverContent className="p-0 min-w-60">
        {filterable && (
          <div className="p-2 border-b">
            <Input
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
              className="h-8 text-xs"
            />
          </div>
        )}

        <div className="max-h-80 overflow-auto p-2">
          <Tree
            nodes={treeData}
            selected={mergedSelected}
            onToggle={handleToggle}
            filter={filter}
            multiple={multiple}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
