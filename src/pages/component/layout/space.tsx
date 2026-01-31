import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

export default function SpacePage() {
  const [gap, setGap] = useState("4");

  const gapOptions = [
    { label: "Gap-2 / 8px", value: "2" },
    { label: "Gap-4 / 16px", value: "4" },
    { label: "Gap-6 / 24px", value: "6" },
    { label: "Custom 32px / 自定义32px", value: "32" },
  ];

  const gapClass = gap === "32" ? "gap-[32px]" : `gap-${gap}`;
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Space 间距布局</h1>
      <p className="text-lg text-muted-foreground">
        Space 组件用于控制元素之间的间距，支持水平、垂直、响应式等多种布局方式。
      </p>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>水平间距布局</CardTitle>
          <CardDescription>
            使用 flex 和 gap 类控制元素之间的水平间距
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex flex-row items-center gap-4">
                <Button variant="secondary">按钮一</Button>
                <Button variant="secondary">按钮二</Button>
                <Button variant="secondary">按钮三</Button>
              </div>
            </div>

      <Card>
        <CardHeader>
          <CardTitle>垂直间距布局</CardTitle>
          <CardDescription>
            使用 flex-col 和 gap 类控制元素之间的垂直间距
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg inline-block">
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-background rounded shadow-sm">项目 1</div>
              <div className="p-3 bg-background rounded shadow-sm">项目 2</div>
              <div className="p-3 bg-background rounded shadow-sm">项目 3</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Horizontal layout with dynamic gap / 横向排列，可选间距 */}
      <h2 className="text-xl font-semibold">Horizontal layout with dynamic gap / 横向排列，可选间距</h2>
            <div>
              <h3 className="font-medium mb-2">动态间距控制</h3>
              <div className="flex items-center gap-4 mb-4">
                <span>选择间距:</span>
                <Select value={gap} onValueChange={setGap}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="选择间距" />
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
              
              <div className={`p-4 bg-muted rounded-lg flex flex-row items-center ${gapClass}`}>
                <Button variant="secondary">按钮一</Button>
                <Button variant="secondary">按钮二</Button>
                <Button variant="secondary">按钮三</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>自动换行布局</CardTitle>
          <CardDescription>
            当元素超出容器宽度时自动换行
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex flex-wrap items-center gap-4">
              {Array.from({ length: 15 }).map((_, i) => (
                <Button key={i} variant="outline" size="sm">
                  项目 {i + 1}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>对齐方式示例</CardTitle>
          <CardDescription>
            不同的对齐方式在有不同高度元素时的表现
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="font-medium mb-3">顶部对齐 (items-start)</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex flex-row items-start gap-4">
                  <Button className="h-8" variant="outline">短</Button>
                  <Button className="h-12" variant="outline">中等</Button>
                  <Button className="h-16" variant="outline">较长</Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">居中对齐 (items-center)</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex flex-row items-center gap-4">
                  <Button className="h-8" variant="outline">短</Button>
                  <Button className="h-12" variant="outline">中等</Button>
                  <Button className="h-16" variant="outline">较长</Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">底部对齐 (items-end)</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex flex-row items-end gap-4">
                  <Button className="h-8" variant="outline">短</Button>
                  <Button className="h-12" variant="outline">中等</Button>
                  <Button className="h-16" variant="outline">较长</Button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">基线对齐 (items-baseline)</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex flex-row items-baseline gap-4">
                  <Button className="h-8" variant="outline">短</Button>
                  <Button className="h-12" variant="outline">中等</Button>
                  <Button className="h-16" variant="outline">较长</Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>分隔符示例</CardTitle>
          <CardDescription>
            使用间距和边框创建视觉分隔效果
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">文字分隔符</h3>
              <div className="p-4 bg-muted rounded-lg inline-flex items-center">
                <span className="px-3">苹果</span>
                <span className="border-l border-gray-300 h-6 mx-1"></span>
                <span className="px-3">橙子</span>
                <span className="border-l border-gray-300 h-6 mx-1"></span>
                <span className="px-3">香蕉</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">按钮分隔符</h3>
              <div className="p-4 bg-muted rounded-lg inline-flex items-center gap-3">
                <Button variant="outline" size="sm">苹果</Button>
                <span className="border-l border-gray-300 h-6"></span>
                <Button variant="outline" size="sm">橙子</Button>
                <span className="border-l border-gray-300 h-6"></span>
                <Button variant="outline" size="sm">香蕉</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      <Card>
        <CardHeader>
          <CardTitle>自定义间距</CardTitle>
          <CardDescription>
            使用精确的像素值控制间距
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">像素级间距</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex flex-row gap-[12px]">
                  <div className="p-3 bg-primary/10 rounded text-sm">自定义 12px 间距</div>
                  <div className="p-3 bg-primary/10 rounded text-sm">精确控制</div>
                  <div className="p-3 bg-primary/10 rounded text-sm">视觉效果</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">渐进式间距</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex flex-col gap-y-1">
                  <div className="p-2 bg-blue-100 rounded text-sm">间距 1</div>
                  <div className="p-2 bg-blue-200 rounded text-sm">间距 2</div>
                  <div className="p-2 bg-blue-300 rounded text-sm">间距 3</div>
                  <div className="p-2 bg-blue-400 rounded text-sm">间距 4</div>
                  <div className="p-2 bg-blue-500 rounded text-sm text-white">间距 5</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>响应式间距</CardTitle>
          <CardDescription>
            在不同屏幕尺寸下使用不同的间距
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">移动端垂直，桌面端水平</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="p-3 bg-rose-100 rounded text-sm">小屏垂直排列</div>
                  <div className="p-3 bg-rose-200 rounded text-sm">大屏水平排列</div>
                  <div className="p-3 bg-rose-300 rounded text-sm">响应式间距</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">不同断点的间距</h3>
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="p-3 bg-indigo-100 rounded text-sm">
                      项目 {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}