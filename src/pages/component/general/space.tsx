import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function SpaceDemo() {
  const [gap, setGap] = useState("4");

  const gapOptions = [
    { label: "Gap-2 / 8px", value: "2" },
    { label: "Gap-4 / 16px", value: "4" },
    { label: "Gap-6 / 24px", value: "6" },
    { label: "Custom 32px / 自定义32px", value: "32" },
  ];

  const gapClass = gap === "32" ? "gap-[32px]" : `gap-${gap}`;
  return (
    <div className="p-6 space-y-8">
      {/* Page title / 页面标题 */}
      <h1 className="text-2xl font-bold">Tailwind + ShadCN Space Demo / 空间布局示例</h1>

      {/* Horizontal layout / 横向排列 */}
      <h2 className="text-xl font-semibold">Horizontal layout / 横向排列</h2>
      <Card className="p-4 flex flex-row items-center gap-4">
        <Button variant="secondary">One</Button>
        <Button variant="secondary">Two</Button>
        <Button variant="secondary">Three</Button>
      </Card>

      {/* Vertical layout / 纵向排列 */}
      <h2 className="text-xl font-semibold">Vertical layout / 纵向排列</h2>
      <Card className="p-4 flex flex-col gap-3">
        <div className="p-2 bg-muted rounded">Row 1</div>
        <div className="p-2 bg-muted rounded">Row 2</div>
        <div className="p-2 bg-muted rounded">Row 3</div>
      </Card>

      {/* Horizontal layout with dynamic gap / 横向排列，可选间距 */}
      <h2 className="text-xl font-semibold">Horizontal layout with dynamic gap / 横向排列，可选间距</h2>
      {/* Select gap / 选择间距 */}
      <div className="flex items-center gap-4">
        <span>Choose gap / 选择间距:</span>
        <Select value={gap} onValueChange={setGap}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Select gap" />
          </SelectTrigger>
          <SelectContent>
            {gapOptions.map(opt => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Card className={`p-4 flex flex-row items-center ${gapClass}`}>
        <Button variant="secondary">One</Button>
        <Button variant="secondary">Two</Button>
        <Button variant="secondary">Three</Button>
      </Card>

      {/* Wrap layout / 自动换行 */}
      <h2 className="text-xl font-semibold">Wrap layout / 自动换行</h2>
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {Array.from({ length: 20 }).map((_, i) => (
            <Button key={i} variant="outline">
              Item {i + 1}
            </Button>
          ))}
        </div>
      </Card>

      <h2 className="text-xl font-semibold mb-4">
        Alignment example / 对齐方式示例
      </h2>

      {/* Start / 顶部对齐 */}
      <div>
        <h3 className="font-medium mb-2">Start / 顶部对齐</h3>
        <Card className="flex flex-row items-start gap-4 p-4 border">
          <Button className="!inline-flex h-8" variant="outline">A</Button>
          <Button className="!inline-flex h-12" variant="outline">B</Button>
          <Button className="!inline-flex h-8" variant="outline">C</Button>
        </Card>
      </div>

      {/* Center / 居中对齐 */}
      <div>
        <h3 className="font-medium mb-2">Center / 居中对齐</h3>
        <Card className="flex flex-row items-center gap-4 p-4 border">
          <Button className="!inline-flex h-8" variant="outline">A</Button>
          <Button className="!inline-flex h-12" variant="outline">B</Button>
          <Button className="!inline-flex h-8" variant="outline">C</Button>
        </Card>
      </div>

      {/* End / 底部对齐 */}
      <div>
        <h3 className="font-medium mb-2">End / 底部对齐</h3>
        <Card className="flex flex-row items-end gap-4 p-4 border">
          <Button className="!inline-flex h-8" variant="outline">A</Button>
          <Button className="!inline-flex h-12" variant="outline">B</Button>
          <Button className="!inline-flex h-8" variant="outline">C</Button>
        </Card>
      </div>

      {/* Baseline / 基线对齐 */}
      <div>
        <h3 className="font-medium mb-2">Baseline / 基线对齐</h3>
        <Card className="flex flex-row items-baseline gap-4 p-4 border">
          <Button className="!inline-flex h-8" variant="outline">A</Button>
          <Button className="!inline-flex h-12" variant="outline">B</Button>
          <Button className="!inline-flex h-8" variant="outline">C</Button>
        </Card>
      </div>

      {/* Divider example / 分隔符示例 */}
      <h2 className="text-xl font-semibold">Divider example / 分隔符示例</h2>

      {/* 文字分隔符 */}
      <Card className="flex flex-row items-center p-4 border rounded gap-0">
        <span className="px-4">Apple</span>
        <span className="border-l border-gray-300 h-6"></span>
        <span className="px-4">Orange</span>
        <span className="border-l border-gray-300 h-6"></span>
        <span className="px-4">Banana</span>
      </Card>

      {/* 按钮分隔符 */}
      <Card className="flex flex-row items-center p-4 border rounded gap-3">
        <Button className="!inline-flex px-4" variant="outline">Apple</Button>
        <span className="border-l border-gray-300 h-6"></span>
        <Button className="!inline-flex px-4" variant="outline">Orange</Button>
        <span className="border-l border-gray-300 h-6"></span>
        <Button className="!inline-flex px-4" variant="outline">Banana</Button>
      </Card>


      {/* Custom spacing (px) / 自定义间距（像素级） */}
      <h2 className="text-xl font-semibold">Custom spacing (px) / 自定义间距</h2>
      <Card className="p-4 flex flex-row gap-[12px]">
        <div className="p-2 bg-primary/10 rounded">Custom 12px gap / 自定义 12px 间距</div>
        <div className="p-2 bg-primary/10 rounded">Looks good / 效果不错</div>
      </Card>

      {/* Responsive layout / 响应式布局 */}
      <h2 className="text-xl font-semibold">Responsive layout / 响应式布局</h2>
      <Card className="p-4 flex flex-row sm:flex-row gap-4">
        <div className="p-2 bg-rose-100 rounded">Vertical on small screens / 小屏垂直排列</div>
        <div className="p-2 bg-rose-100 rounded">Horizontal on medium screens / 中屏水平排列</div>
      </Card>
    </div>
  );
}
