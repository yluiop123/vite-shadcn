"use client";

import { cn } from "@/lib/utils"; // 拼接 className 的工具函数
import * as Popover from "@radix-ui/react-popover";
import * as React from "react";

export type CascaderOption = {
  value: string;
  label: string;
  children?: CascaderOption[];
  disabled?: boolean;
};

// 使用函数重载或联合类型确保类型安全
export interface CascaderProps {
  options: CascaderOption[];
  value: string[] | string[][]; // 单选是路径，多选是路径数组
  onChange: (value: any) => void;
  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  allowClear?: boolean;
}

export function Cascader({
  options,
  value = [],
  onChange,
  multiple = false,
  placeholder = "请选择",
  searchPlaceholder = "搜索...",
  allowClear = true,
}: CascaderProps) {
  const [open, setOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [activePath, setActivePath] = React.useState<string[]>([]);

  // --- 1. 数据打平（用于搜索和回显） ---
  const flattenedOptions = React.useMemo(() => {
    const result: { path: string[]; label: string; fullLabel: string }[] = [];
    const traverse = (opts: CascaderOption[], pPath: string[], pLabels: string[]) => {
      opts.forEach((o) => {
        const cPath = [...pPath, o.value];
        const cLabels = [...pLabels, o.label];
        if (!o.children || o.children.length === 0) {
          result.push({ path: cPath, label: o.label, fullLabel: cLabels.join(" / ") });
        } else {
          traverse(o.children, cPath, cLabels);
        }
      });
    };
    traverse(options, [], []);
    return result;
  }, [options]);

  const filteredOptions = flattenedOptions.filter((opt) =>
    opt.fullLabel.toLowerCase().includes(searchValue.toLowerCase())
  );

  // --- 2. 选中状态判断逻辑 ---
  const isPathSelected = (path: string[]) => {
    const pathStr = path.join(",");
    if (multiple) {
      return (value as string[][]).some((v) => v.join(",") === pathStr);
    }
    return (value as string[]).join(",") === pathStr;
  };

  // --- 3. 选择逻辑 ---
  const handleSelect = (path: string[], isLeaf: boolean) => {
    if (!isLeaf) {
      setActivePath(path);
      return;
    }

    if (multiple) {
      const currentVal = value as string[][];
      const alreadySelected = currentVal.some((v) => v.join(",") === path.join(","));
      const newVal = alreadySelected
        ? currentVal.filter((v) => v.join(",") !== path.join(","))
        : [...currentVal, path];
      onChange(newVal);
    } else {
      onChange(path);
      setOpen(false);
      setSearchValue("");
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(multiple ? [] : []);
    setActivePath([]);
  };

  // --- 4. 级联列渲染 ---
  const renderColumns = () => {
    const columns = [];
    let currentOptions = options;

    for (let i = 0; i <= activePath.length; i++) {
      if (!currentOptions || currentOptions.length === 0) break;
      const level = i;
      columns.push(
        <div key={level} className="min-w-[160px] max-h-72 overflow-y-auto border-r last:border-r-0 p-1">
          {currentOptions.map((opt) => {
            const currentPath = [...activePath.slice(0, level), opt.value];
            const isLeaf = !opt.children;
            const active = activePath[level] === opt.value;
            const checked = isPathSelected(currentPath);

            return (
              <div
                key={opt.value}
                className={cn(
                  "flex items-center px-2 py-1.5 text-sm rounded cursor-pointer mb-0.5 transition-colors",
                  active ? "bg-blue-50 text-blue-600 font-medium" : "hover:bg-gray-100",
                  opt.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                )}
                onMouseEnter={() => !isLeaf && setActivePath(currentPath)}
                onClick={() => handleSelect(currentPath, isLeaf)}
              >
                {multiple && isLeaf && (
                  <div className={cn(
                    "w-4 h-4 border rounded mr-2 flex items-center justify-center text-[10px]",
                    checked ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300"
                  )}>{checked && "✓"}</div>
                )}
                <span className="flex-1 truncate">{opt.label}</span>
                {!isLeaf && <span className="ml-2 text-gray-400 text-[10px]">▶</span>}
                {!multiple && isLeaf && checked && <span className="ml-2 text-blue-500">✓</span>}
              </div>
            );
          })}
        </div>
      );
      currentOptions = currentOptions.find(o => o.value === activePath[level])?.children || [];
    }
    return <div className="flex bg-white">{columns}</div>;
  };

  return (
    <div className="w-full">
      <Popover.Root open={open} onOpenChange={(val) => { setOpen(val); if(!val) setSearchValue(""); }}>
        <Popover.Trigger asChild>
          <div className="flex flex-wrap gap-1.5 items-center w-full p-2 border rounded-md bg-white cursor-pointer hover:border-blue-400 shadow-sm min-h-[40px] transition-all">
            {multiple ? (
              (value as string[][]).length > 0 ? (
                (value as string[][]).map(p => (
                  <span key={p.join(',')} className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-xs flex items-center gap-1">
                    {p[p.length - 1]}
                    <span onClick={(e) => { e.stopPropagation(); handleSelect(p, true); }} className="hover:text-blue-900 font-bold">×</span>
                  </span>
                ))
              ) : <span className="text-gray-400 text-sm ml-1">{placeholder}</span>
            ) : (
              <span className={cn("text-sm ml-1", (value as string[]).length === 0 && "text-gray-400")}>
                {(value as string[]).length > 0 ? (value as string[]).join(" / ") : placeholder}
              </span>
            )}
            <div className="ml-auto flex items-center gap-2">
               {allowClear && (multiple ? (value as string[][]).length > 0 : (value as string[]).length > 0) && (
                 <span onClick={handleClear} className="text-gray-400 hover:text-gray-600">×</span>
               )}
               <span className="text-[10px] text-gray-300">▼</span>
            </div>
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content align="start" sideOffset={5} className="z-[999] bg-white border border-gray-200 rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-1">
            {/* 搜索框 */}
            <div className="p-2 border-b bg-gray-50/50" style={{ width: 'var(--radix-popover-trigger-width)' }}>
              <input
                autoFocus
                className="w-full px-3 py-1.5 text-sm border rounded-md outline-none focus:border-blue-500 transition-all"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>

            {/* 内容区 */}
            {searchValue ? (
              <div className="max-h-72 overflow-y-auto p-1" style={{ width: 'var(--radix-popover-trigger-width)' }}>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <div
                      key={opt.path.join(",")}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm hover:bg-blue-50 cursor-pointer rounded-md",
                        isPathSelected(opt.path) && "text-blue-600 font-medium"
                      )}
                      onClick={() => handleSelect(opt.path, true)}
                    >
                      {multiple && (
                        <div className={cn(
                          "w-4 h-4 border rounded mr-3 flex items-center justify-center text-[10px]",
                          isPathSelected(opt.path) ? "bg-blue-500 border-blue-500 text-white" : "border-gray-300"
                        )}>{isPathSelected(opt.path) && "✓"}</div>
                      )}
                      {opt.fullLabel}
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-400 text-sm">无匹配结果</div>
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