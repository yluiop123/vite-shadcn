"use client"

import { cn } from "@/lib/utils"
import * as React from "react"

export type TransferItem = {
  key: string
  title: string
  description?: string
  disabled?: boolean
}

export interface TransferProps {
  dataSource: TransferItem[]
  /** 右侧（已选中）keys */
  targetKeys?: string[]
  onChange?: (targetKeys: string[]) => void
  /** 左右面板标题 */
  titles?: [string, string]
  /** 是否显示搜索框 */
  showSearch?: boolean
  /** 是否禁用整个组件 */
  disabled?: boolean
  className?: string
}

export function Transfer({
  dataSource,
  targetKeys: _targetKeys,
  onChange,
  titles = ["可选项 / Available", "已选择 / Selected"],
  showSearch = true,
  disabled = false,
  className,
}: TransferProps) {
  const [selectedKeys, setSelectedKeys] = React.useState<string[]>([])
  const [leftFilter, setLeftFilter] = React.useState("")
  const [rightFilter, setRightFilter] = React.useState("")

  const [targetKeys, setTargetKeys] = React.useState<string[]>(_targetKeys || [])

  React.useEffect(() => {
    if (Array.isArray(_targetKeys)) setTargetKeys(_targetKeys)
  }, [_targetKeys])

  const leftData = dataSource.filter((item) => !targetKeys.includes(item.key))
  const rightData = dataSource.filter((item) => targetKeys.includes(item.key))

  const filteredLeft = leftData.filter((item) => item.title.toLowerCase().includes(leftFilter.toLowerCase()))
  const filteredRight = rightData.filter((item) => item.title.toLowerCase().includes(rightFilter.toLowerCase()))

  const moveToRight = () => {
    const moveKeys = selectedKeys.filter((k) => leftData.some((it) => it.key === k))
    const newTarget = Array.from(new Set([...targetKeys, ...moveKeys]))
    setTargetKeys(newTarget)
    setSelectedKeys([])
    onChange?.(newTarget)
  }

  const moveToLeft = () => {
    const moveKeys = selectedKeys.filter((k) => rightData.some((it) => it.key === k))
    const newTarget = targetKeys.filter((k) => !moveKeys.includes(k))
    setTargetKeys(newTarget)
    setSelectedKeys([])
    onChange?.(newTarget)
  }

  const toggleSelect = (key: string) => {
    setSelectedKeys((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]))
  }

  return (
    <div className={cn("flex gap-4", className)}>
      {/* Left */}
      <div className="flex-1 rounded border bg-card p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">{titles[0]}</div>
          <div className="text-sm text-muted-foreground">{filteredLeft.length}/{leftData.length}</div>
        </div>
        {showSearch && (
          <input
            placeholder="搜索 / Search"
            value={leftFilter}
            onChange={(e) => setLeftFilter(e.target.value)}
            className="mb-2 w-full rounded border px-2 py-1 text-sm"
            disabled={disabled}
          />
        )}
        <div className="h-64 overflow-auto">
          {filteredLeft.map((item) => (
            <div
              key={item.key}
              className={cn(
                "flex items-center justify-between gap-2 px-2 py-2 hover:bg-accent/50 cursor-pointer",
                selectedKeys.includes(item.key) ? "bg-accent/30" : "",
                item.disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
              onClick={() => !item.disabled && toggleSelect(item.key)}
            >
              <div>
                <div className="font-medium">{item.title}</div>
                {item.description && <div className="text-xs text-muted-foreground">{item.description}</div>}
              </div>
              <div className="text-sm text-muted-foreground">{item.key}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center justify-center gap-2">
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded border bg-background disabled:opacity-50"
          onClick={moveToRight}
          disabled={disabled}
          aria-label="move to right"
        >
          &gt;
        </button>
        <button
          className="inline-flex h-10 w-10 items-center justify-center rounded border bg-background disabled:opacity-50"
          onClick={moveToLeft}
          disabled={disabled}
          aria-label="move to left"
        >
          &lt;
        </button>
      </div>

      {/* Right */}
      <div className="flex-1 rounded border bg-card p-3">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">{titles[1]}</div>
          <div className="text-sm text-muted-foreground">{filteredRight.length}/{rightData.length}</div>
        </div>
        {showSearch && (
          <input
            placeholder="搜索 / Search"
            value={rightFilter}
            onChange={(e) => setRightFilter(e.target.value)}
            className="mb-2 w-full rounded border px-2 py-1 text-sm"
            disabled={disabled}
          />
        )}
        <div className="h-64 overflow-auto">
          {filteredRight.map((item) => (
            <div
              key={item.key}
              className={cn(
                "flex items-center justify-between gap-2 px-2 py-2 hover:bg-accent/50 cursor-pointer",
                selectedKeys.includes(item.key) ? "bg-accent/30" : "",
                item.disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
              onClick={() => !item.disabled && toggleSelect(item.key)}
            >
              <div>
                <div className="font-medium">{item.title}</div>
                {item.description && <div className="text-xs text-muted-foreground">{item.description}</div>}
              </div>
              <div className="text-sm text-muted-foreground">{item.key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transfer
