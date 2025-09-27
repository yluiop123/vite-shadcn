import { cn } from "@/lib/utils"
import * as React from "react"

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "horizontal" | "vertical"
  orientation?: "left" | "center" | "right"
  dashed?: boolean
  children?: React.ReactNode
  color?: string // Tailwind class，如 border-red-500
  size?: "sm" | "md" | "lg" | "xl"
  length?: string | number // 横向宽度 / 纵向高度
  textClassName?: string
}

export function Divider({
  type = "horizontal",
  orientation = "center",
  dashed = false,
  children,
  className,
  color,
  size = "sm",
  length,
  textClassName,
  ...props
}: DividerProps) {
  // Tailwind 边框宽度映射
const sizeClass =
  size === "sm"
    ? "border"      // 1px
    : size === "md"
    ? "border-2"    // 2px
    : size === "lg"
    ? "border-4"    // 4px
    : size === "xl"
    ? "border-8"    // 8px
    : "border"

  // Tailwind 长度类映射
  const lengthClass =
    typeof length === "number"
      ? `[${length}px]`
      : typeof length === "string"
      ? `[${length}]`
      : undefined

if (type === "vertical") {
  const verticalSizeClass =
    size === "sm"
      ? "border-r"
      : size === "md"
      ? "border-r-2"
      : size === "lg"
      ? "border-r-4"
      : size === "xl"
      ? "border-r-8"
      : "border-r"

  return (
    <div
      className={cn(
        "inline-block",
        verticalSizeClass,
        dashed && "border-dashed",
        color || "border-border",
        length
          ? typeof length === "number"
            ? `h-[${length}px]`
            : `h-[${length}]`
          : "h-6", // 默认高度
        className
      )}
      {...props}
    />
  )
}


  return (
    <div className={cn("relative flex items-center", className)} {...props}>
      <div
        className={cn(
          "flex-1 border-t",
          sizeClass,
          dashed && "border-dashed",
          color,
          lengthClass && `w-${lengthClass}`
        )}
      />
      {children && (
        <span
          className={cn(
            "px-3 text-sm text-muted-foreground bg-background",
            orientation === "left" && "absolute left-0 -translate-x-1/2",
            orientation === "right" && "absolute right-0 translate-x-1/2",
            textClassName
          )}
        >
          {children}
        </span>
      )}
      <div
        className={cn(
          "flex-1 border-t",
          sizeClass,
          dashed && "border-dashed",
          color,
          lengthClass && `w-${lengthClass}`
        )}
      />
    </div>
  )
}
