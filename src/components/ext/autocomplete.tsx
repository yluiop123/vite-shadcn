import * as React from "react";
import { Check, X } from "lucide-react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/* ===================== */
/* 类型定义 */
/* ===================== */

export interface AutoCompleteOption {
  label: string;
  value: string;
}

interface AutoCompleteProps {
  value?: string | string[];
  onChange?: (value: string | string[]) => void;

  options?: AutoCompleteOption[];
  fetchOptions?: (keyword: string) => Promise<AutoCompleteOption[]>;

  placeholder?: string;
  multiple?: boolean;
  debounce?: number;
}

/* ===================== */
/* 防抖 Hook */
/* ===================== */

function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value);

  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/* ===================== */
/* 高亮文本 */
/* ===================== */

function Highlight({
  text,
  keyword,
}: {
  text: string;
  keyword: string;
}) {
  if (!keyword) return <>{text}</>;

  const parts = text.split(new RegExp(`(${keyword})`, "gi"));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === keyword.toLowerCase() ? (
          <span key={i} className="text-primary font-medium">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ===================== */
/* AutoComplete 主组件 */
/* ===================== */

export function AutoComplete({
  value,
  onChange,
  options = [],
  fetchOptions,
  placeholder,
  multiple = false,
  debounce = 300,
}: AutoCompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [list, setList] = React.useState<AutoCompleteOption[]>(options);

  const debouncedInput = useDebounce(input, debounce);

  const values = React.useMemo(
    () => (Array.isArray(value) ? value : value ? [value] : []),
    [value]
  );

  /* 异步加载 */
  React.useEffect(() => {
    if (!fetchOptions) {
      setList(
        options.filter((o) =>
          o.label.toLowerCase().includes(debouncedInput.toLowerCase())
        )
      );
      return;
    }

    setLoading(true);
    fetchOptions(debouncedInput)
      .then(setList)
      .finally(() => setLoading(false));
  }, [debouncedInput]);

  const select = (v: string) => {
    if (multiple) {
      const next = values.includes(v)
        ? values.filter((i) => i !== v)
        : [...values, v];
      onChange?.(next);
    } else {
      onChange?.(v);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className="min-h-10 w-full rounded-md border px-3 py-1 flex flex-wrap gap-1 cursor-text"
          onClick={() => setOpen(true)}
        >
          {multiple &&
            values.map((v) => {
              const opt = options.find((o) => o.value === v);
              return (
                <Badge key={v} variant="secondary">
                  {opt?.label}
                  <X
                    className="ml-1 h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      select(v);
                    }}
                  />
                </Badge>
              );
            })}

          <Input
            className="border-0 shadow-none focus-visible:ring-0 p-0 h-7"
            placeholder={placeholder}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setOpen(true);
            }}
          />
        </div>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[--radix-popover-trigger-width]">
        <Command>
          <CommandEmpty>
            {loading ? "加载中 (Loading)..." : "无结果 (No results)"}
          </CommandEmpty>

          <CommandGroup>
            {list.map((item) => (
              <CommandItem
                key={item.value}
                onSelect={() => select(item.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    values.includes(item.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <Highlight
                  text={item.label}
                  keyword={debouncedInput}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
