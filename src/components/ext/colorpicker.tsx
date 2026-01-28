"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HexColorPicker } from "react-colorful"

// 1. 定义丰富的内置色盘 (Tailwind-inspired color groups)
const COLOR_GROUPS = [
  { name: "Neutral", colors: ["#000000", "#334155", "#64748b", "#94a3b8", "#f8fafc", "#ffffff"] },
  { name: "Red", colors: ["#ef4444", "#dc2626", "#b91c1c", "#991b1b", "#7f1d1d"] },
  { name: "Blue", colors: ["#3b82f6", "#2563eb", "#1d4ed8", "#1e40af", "#1e3a8a"] },
  { name: "Green", colors: ["#22c55e", "#16a34a", "#15803d", "#166534", "#064e3b"] },
  { name: "Yellow", colors: ["#eab308", "#ca8a04", "#a16207", "#854d0e", "#713f12"] },
  { name: "Purple", colors: ["#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#581c87"] },
]

export function ColorPicker({ color, onChange }: { color: string, onChange: (c: string) => void }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[280px] justify-start gap-3">
          <div className="h-5 w-5 rounded-full border shadow-sm" style={{ backgroundColor: color }} />
          <span className="font-mono">{color.toUpperCase()}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0 overflow-hidden shadow-2xl border-none">
        <Tabs defaultValue="picker">
          <TabsList className="w-full rounded-none h-12 bg-muted/50">
            <TabsTrigger value="picker" className="flex-1">拾色器 (Picker)</TabsTrigger>
            <TabsTrigger value="presets" className="flex-1">调色盘 (Palette)</TabsTrigger>
          </TabsList>

          {/* 自由拾色页 (Free Pick) */}
          <TabsContent value="picker" className="p-4 space-y-4 mt-0">
            <HexColorPicker color={color} onChange={onChange} className="!w-full !h-40" />
            <div className="flex gap-2 items-center">
              <span className="text-xs font-bold text-muted-foreground uppercase">Hex</span>
              <Input 
                value={color} 
                onChange={(e) => onChange(e.target.value)} 
                className="h-8 font-mono"
              />
            </div>
          </TabsContent>

          {/* 丰富预设页 (Rich Presets) */}
          <TabsContent value="presets" className="mt-0">
            <ScrollArea className="h-[240px] p-4">
              <div className="space-y-4">
                {COLOR_GROUPS.map((group) => (
                  <div key={group.name} className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      {group.name}
                    </p>
                    <div className="grid grid-cols-6 gap-2">
                      {group.colors.map((c) => (
                        <button
                          key={c}
                          className="h-8 w-8 rounded-md border border-black/5 hover:scale-110 transition-transform active:scale-95"
                          style={{ backgroundColor: c }}
                          onClick={() => onChange(c)}
                          title={c}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
        
        {/* 底部当前预览 (Footer Preview) */}
        <div className="bg-muted/30 p-3 border-t flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded border" style={{ backgroundColor: color }} />
            <span className="text-xs font-mono uppercase font-medium">{color}</span>
          </div>
          <span className="text-[10px] text-muted-foreground italic underline decoration-dotted">
            Selected Color
          </span>
        </div>
      </PopoverContent>
    </Popover>
  )
}