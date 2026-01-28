"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useMemo } from "react"
import { HexColorPicker } from "react-colorful"

// 丰富的内置色盘数据 (Tailwind Palette)
const PRESET_COLORS = [
  { group: "Neutral", colors: ["#000000", "#64748b", "#cbd5e1", "#ffffff"] },
  { group: "Status", colors: ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#6366f1"] },
  { group: "Pastel", colors: ["#fecaca", "#fed7aa", "#fef08a", "#bbf7d0", "#bfdbfe", "#ddd6fe"] },
]

export function ColorPicker({ color, onChange }: { color: string, onChange: (c: string) => void }) {
  // HEX 转 RGB 逻辑
  const rgb = useMemo(() => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } 
                  : { r: 0, g: 0, b: 0 }
  }, [color])

  const handleRgbChange = (channel: 'r' | 'g' | 'b', value: string) => {
    const num = Math.max(0, Math.min(255, parseInt(value) || 0))
    const newRgb = { ...rgb, [channel]: num }
    onChange(`#${newRgb.r.toString(16).padStart(2, "0")}${newRgb.g.toString(16).padStart(2, "0")}${newRgb.b.toString(16).padStart(2, "0")}`)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[280px] justify-between shadow-sm hover:bg-slate-50 transition-all">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border shadow-inner" style={{ backgroundColor: color }} />
            <span className="font-mono text-xs font-bold uppercase">{color}</span>
          </div>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-red-400/80" />
            <div className="h-2 w-2 rounded-full bg-green-400/80" />
            <div className="h-2 w-2 rounded-full bg-blue-400/80" />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-4 space-y-4 shadow-2xl border-slate-200">
        {/* 1. 拾色器 (Color Picker) */}
        <HexColorPicker color={color} onChange={onChange} className="!w-full !h-36" />

        {/* 2. 数值输入区 (HEX & RGB Inputs) */}
        <div className="flex flex-col gap-3">
          {/* 第一行：HEX 独占一行 (First Row: HEX only) */}
          <div className="space-y-1">
            <Label className="text-[10px] uppercase text-muted-foreground font-bold">Hex Code</Label>
            <Input 
              value={color.toUpperCase()} 
              onChange={(e) => onChange(e.target.value)} 
              className="h-8 font-mono text-[11px]"
            />
          </div>

          {/* 第二行：RGB 平分一行 (Second Row: RGB split) */}
          <div className="grid grid-cols-3 gap-2">
            {(['r', 'g', 'b'] as const).map((ch) => (
              <div key={ch} className="space-y-1">
                <Label className="text-[10px] uppercase text-muted-foreground font-bold text-center block">
                  {ch}
                </Label>
                <Input 
                  type="number"
                  value={rgb[ch]}
                  onChange={(e) => handleRgbChange(ch, e.target.value)}
                  className="h-8 px-1 text-center font-mono text-[11px]"
                />
              </div>
            ))}
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* 3. 内置丰富色盘 (Preset Palette) */}
        <div className="space-y-3">
          <Label className="text-[10px] uppercase text-muted-foreground font-bold flex justify-between">
            <span>常用预设 (Presets)</span>
            <span className="opacity-50 tracking-tighter">TAILWIND COLORS</span>
          </Label>
          <ScrollArea className="h-24 pr-2">
            <div className="space-y-3">
              {PRESET_COLORS.map((group) => (
                <div key={group.group} className="flex flex-wrap gap-2">
                  {group.colors.map((c) => (
                    <button
                      key={c}
                      className={cn(
                        "h-6 w-6 rounded-md border border-slate-200 transition-all hover:scale-125 active:scale-90 shadow-sm",
                        color.toLowerCase() === c.toLowerCase() && "ring-2 ring-offset-1 ring-slate-400"
                      )}
                      style={{ backgroundColor: c }}
                      onClick={() => onChange(c)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}