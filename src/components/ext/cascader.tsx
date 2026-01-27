"use client";

import { cn } from "@/lib/utils";
import * as Popover from "@radix-ui/react-popover";
import * as React from "react";

export type CascaderOption = {
  value: string;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
};

export interface CascaderProps {
  value?: string[];
  options: CascaderOption[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  allowClear?: boolean;
}

export function Cascader({
  value = [],
  options,
  onChange,
  placeholder = "请选择",
  searchPlaceholder = "搜索...",
  allowClear = true,
}: CascaderProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [selectedValues, setSelectedValues] = React.useState<string[]>(value);
  const [activePath, setActivePath] = React.useState<string[]>(value);

  // 搜索逻辑：将树形结构打平为路径数组
  const flattenedOptions = React.useMemo(() => {
    const result: { value: string[]; fullLabel: string }[] = [];
    const traverse = (data: CascaderOption[], pPath: string[], pLabels: string[]) => {
      data.forEach((item) => {
        const cPath = [...pPath, item.value];
        const cLabels = [...pLabels, item.label];
        if (!item.children || item.children.length === 0) {
          result.push({ value: cPath, fullLabel: cLabels.join(" / ") });
        } else {
          traverse(item.children, cPath, cLabels);
        }
      });
    };
    traverse(options, [], []);
    return result;
  }, [options]);

  const filteredOptions = flattenedOptions.filter((opt) =>
    opt.fullLabel.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSelect = (path: string[], isLeaf: boolean) => {
    setActivePath(path);
    if (isLeaf) {
      setSelectedValues(path);
      onChange(path);
      setOpen(false);
      setSearchValue("");
    }
  };

  // 渲染多列级联视图
  const renderColumns = () => {
    const columns = [];
    let currentOptions = options;

    for (let i = 0; i <= activePath.length; i++) {
      if (!currentOptions || currentOptions.length === 0) break;
      const level = i;
      columns.push(
        <div key={level} className="min-w-[140px] max-h-72 overflow-y-auto border-r last:border-r-0 p-1 bg-white">
          {currentOptions.map((opt) => (
            <div
              key={opt.value}
              className={cn(
                "px-2 py-1.5 text-sm rounded cursor-pointer flex justify-between items-center transition-colors",
                activePath[level] === opt.value ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-100",
                opt.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
              )}
              onClick={() => handleSelect([...activePath.slice(0, level), opt.value], !opt.children)}
              onMouseEnter={() => opt.children && setActivePath([...activePath.slice(0, level), opt.value])}
            >
              <span className="truncate">{opt.label}</span>
              {opt.children && <span className="ml-2 text-[10px] text-gray-400">▶</span>}
            </div>
          ))}
        </div>
      );
      const next = currentOptions.find((o) => o.value === activePath[level]);
      currentOptions = next?.children || [];
    }
    return <div className="flex bg-white">{columns}</div>;
  };

  return (
    <div className="w-64">
      <Popover.Root open={open} onOpenChange={(o) => { setOpen(o); if(!o) setSearchValue(""); }}>
        {/* 1. 触发器：确保点击的是整个样式区域 */}
        <Popover.Trigger asChild>
          <div className="flex items-center justify-between w-full px-3 py-2 border rounded-md cursor-pointer hover:border-blue-500 bg-white transition-all text-sm shadow-sm">
            <span className={cn("truncate", selectedValues.length === 0 && "text-gray-400")}>
              {selectedValues.length > 0 ? selectedValues.join(" / ") : placeholder}
            </span>
            <div className="flex items-center gap-1 ml-2">
              {allowClear && selectedValues.length > 0 && (
                <span 
                  onClick={(e) => { e.stopPropagation(); setSelectedValues([]); setActivePath([]); onChange([]); }} 
                  className="text-gray-400 hover:text-gray-600 text-base"
                >
                  ×
                </span>
              )}
              <span className="text-[10px] text-gray-400">▼</span>
            </div>
          </div>
        </Popover.Trigger>

        {/* 2. 传送门：解决位置偏移和遮挡的关键 */}
        <Popover.Portal>
          <Popover.Content 
            align="start" 
            sideOffset={5} 
            className="z-[999] bg-white border border-gray-200 rounded-md shadow-xl overflow-hidden"
          >
            {/* 搜索区域 */}
            <div 
              className="p-2 border-b bg-gray-50" 
              style={{ width: 'var(--radix-popover-trigger-width)' }}
            >
              <input
                autoFocus
                className="w-full px-2 py-1 text-sm border rounded outline-none focus:border-blue-500"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            {/* 内容区域：搜索结果 vs 级联列表 */}
            {searchValue ? (
              <div className="max-h-72 overflow-y-auto p-1" style={{ width: 'var(--radix-popover-trigger-width)' }}>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <div
                      key={opt.value.join("-")}
                      className="px-2 py-2 text-sm hover:bg-blue-50 cursor-pointer rounded"
                      onClick={() => handleSelect(opt.value, true)}
                    >
                      {opt.fullLabel}
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-sm text-gray-400">无匹配结果</div>
                )}
              </div>
            ) : (
              renderColumns()
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}