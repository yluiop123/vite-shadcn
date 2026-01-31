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

export interface CascaderProps extends React.HTMLAttributes<HTMLDivElement> {
  options: CascaderOption[];
  value: string[] | string[][];
  onChange: (value: string[] | string[][]) => void;
  multiple?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
}

export function Cascader({
  options,
  value = [],
  onChange,
  multiple = false,
  placeholder = "请选择",
  searchPlaceholder = "搜索...",
  allowClear = true,
  disabled = false,
  className,
  ...props
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
    if (!isLeaf || disabled) {
      if (!disabled) setActivePath(path);
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
    if (disabled) return;
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
        <div key={level} className="min-w-[160px] max-h-72 overflow-y-auto border-r border-border dark:border-border last:border-r-0 p-1 bg-background dark:bg-popover">
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
                  active 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-accent",
                  opt.disabled || disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                )}
                onMouseEnter={() => !isLeaf && !disabled && setActivePath(currentPath)}
                onClick={() => handleSelect(currentPath, isLeaf)}
              >
                {multiple && isLeaf && (
                  <div className={cn(
                    "w-4 h-4 border rounded mr-2 flex items-center justify-center text-[10px]",
                    checked 
                      ? "bg-primary border-primary text-primary-foreground" 
                      : "border-input"
                  )}>{checked && "✓"}</div>
                )}
                <span className="flex-1 truncate text-foreground dark:text-foreground">{opt.label}</span>
                {!isLeaf && <span className="ml-2 text-muted-foreground dark:text-muted-foreground text-[10px]">▶</span>}
                {!multiple && isLeaf && checked && <span className="ml-2 text-primary">✓</span>}
              </div>
            );
          })}
        </div>
      );
      currentOptions = currentOptions.find(o => o.value === activePath[level])?.children || [];
    }
    return <div className="flex bg-background dark:bg-popover">{columns}</div>;
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <Popover.Root open={open} onOpenChange={(val) => { 
        if (!disabled) {
          setOpen(val); 
          if(!val) setSearchValue("");
        }
      }}>
        <Popover.Trigger asChild>
          <div className={cn(
            "flex flex-wrap gap-1.5 items-center w-full p-2 border border-input rounded-md bg-background dark:bg-input/20 cursor-pointer shadow-sm min-h-[40px] transition-all",
            disabled ? "opacity-50 cursor-not-allowed" : "hover:border-primary/50"
          )}>
            {multiple ? (
              (value as string[][]).length > 0 ? (
                (value as string[][]).map(p => (
                  <span key={p.join(',')} className="px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded text-xs flex items-center gap-1">
                    {p[p.length - 1]}
                    <span onClick={(e) => { e.stopPropagation(); if (!disabled) handleSelect(p, true); }} className="hover:text-destructive font-bold">×</span>
                  </span>
                ))
              ) : <span className="text-muted-foreground text-sm ml-1">{placeholder}</span>
            ) : (
              <span className={cn("text-sm ml-1", (value as string[]).length === 0 && "text-muted-foreground")}>
                {(value as string[]).length > 0 ? (value as string[]).join(" / ") : placeholder}
              </span>
            )}
            <div className="ml-auto flex items-center gap-2">
               {allowClear && !disabled && (multiple ? (value as string[][]).length > 0 : (value as string[]).length > 0) && (
                 <span onClick={handleClear} className="text-muted-foreground hover:text-foreground">×</span>
               )}
               <span className="text-[10px] text-muted-foreground">▼</span>
            </div>
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content align="start" sideOffset={5} className="z-[999] bg-popover dark:bg-popover border border-border dark:border-border rounded-lg shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-1">
            {/* 搜索框 */}
            <div className="p-2 border-b bg-muted dark:bg-accent" style={{ width: 'var(--radix-popover-trigger-width)' }}>
              <input
                autoFocus
                className="w-full px-3 py-1.5 text-sm border border-input rounded-md outline-none focus:border-primary focus:ring-0 bg-background dark:bg-input/20 dark:text-foreground transition-all"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                disabled={disabled}
              />
            </div>

            {/* 内容区 */}
            {searchValue ? (
              <div className="max-h-72 overflow-y-auto p-1 bg-popover dark:bg-popover" style={{ width: 'var(--radix-popover-trigger-width)' }}>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((opt) => (
                    <div
                      key={opt.path.join(",")}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm hover:bg-accent cursor-pointer rounded-md",
                        isPathSelected(opt.path) && "text-primary font-medium",
                        disabled ? "opacity-50 cursor-not-allowed" : ""
                      )}
                      onClick={() => !disabled && handleSelect(opt.path, true)}
                    >
                      {multiple && (
                        <div className={cn(
                          "w-4 h-4 border rounded mr-3 flex items-center justify-center text-[10px]",
                          isPathSelected(opt.path) 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "border-input"
                        )}>{isPathSelected(opt.path) && "✓"}</div>
                      )}
                      <span className="text-foreground dark:text-foreground">{opt.fullLabel}</span>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-muted-foreground text-sm">无匹配结果</div>
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