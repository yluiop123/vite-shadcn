"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState } from "react"

// 定义选项数据
const items = [
  { id: "react", label: "React.js" },
  { id: "vue", label: "Vue.js" },
  { id: "typescript", label: "TypeScript" },
  { id: "tailwind", label: "Tailwind CSS" },
] as const

export default function MultiCheckboxDemo() {
  // 状态：存储选中的 ID 数组
  // State: Array of selected IDs
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      // 选中：添加到数组 (Add to array)
      setSelectedItems((prev) => [...prev, id])
    } else {
      // 取消选中：从数组移除 (Remove from array)
      setSelectedItems((prev) => prev.filter((item) => item !== id))
    }
  }

  return (
    <div className="p-6 max-w-sm mx-auto border rounded-xl shadow-sm bg-white mt-10">
      <h3 className="text-lg font-semibold mb-4 text-slate-800">
        选择你的技术栈 (Select Stack)
      </h3>
      
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-3 group">
            <Checkbox
              id={item.id}
              checked={selectedItems.includes(item.id)}
              onCheckedChange={(checked) => handleCheckboxChange(item.id, checked as boolean)}
            />
            <Label
              htmlFor={item.id}
              className="text-sm font-medium leading-none cursor-pointer group-hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Label>
          </div>
        ))}
      </div>

      {/* 交互结果展示区 - Interaction Result Area */}
      <div className="mt-6 pt-4 border-t border-dashed">
        <p className="text-xs text-slate-500 mb-2 font-mono">
          Selected Data: {JSON.stringify(selectedItems)}
        </p>
        <div className="flex flex-wrap gap-2">
          {selectedItems.length > 0 ? (
            selectedItems.map((id) => (
              <span key={id} className="bg-blue-50 text-blue-600 text-[10px] px-2 py-1 rounded border border-blue-200 uppercase font-bold">
                {id}
              </span>
            ))
          ) : (
            <span className="text-xs text-slate-400 italic">暂未选择 (No selection)</span>
          )}
        </div>
      </div>
    </div>
  )
}