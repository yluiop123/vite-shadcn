"use client"

import { cn } from "@/lib/utils"
import * as React from "react"

export interface TimePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** 值，格式 HH:MM 或 HH:MM:SS */
  value?: string
  /** 受控变更回调，返回时间字符串 */
  onChange?: (value: string) => void
  /** 步长（秒），默认 60（按分钟步进） */
  step?: number
  /** 是否显示秒 */
  showSeconds?: boolean
}

export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(
  ({ className, value, onChange, step = 60, showSeconds = false, ...props }, ref) => {
    const inputStep = Math.max(1, Number(step))

    return (
      <input
        ref={ref}
        type="time"
        step={inputStep}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        className={cn(
          "inline-flex h-10 w-full max-w-xs items-center rounded-md border px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    )
  }
)

TimePicker.displayName = "TimePicker"

export default TimePicker
