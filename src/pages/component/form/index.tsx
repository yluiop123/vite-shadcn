import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";

const components = [
  { id: "autocomplete", label: "AutoComplete", component: lazy(() => import('./autocomplete')) },
  { id: "cascader", label: "Cascader", component: lazy(() => import('./cascader')) },
  { id: "checkbox", label: "Checkbox", component: lazy(() => import('./checkbox')) },
  { id: "colorpicker", label: "ColorPicker", component: lazy(() => import('./colorpicker')) },
  { id: "datepicker", label: "DatePicker", component: lazy(() => import('./datepicker')) },
  { id: "form", label: "Form", component: lazy(() => import('./form')) },
  { id: "input", label: "Input", component: lazy(() => import('./input')) },
  { id: "input-number", label: "InputNumber", component: lazy(() => import('./input-number')) },
  { id: "mentions", label: "Mentions", component: lazy(() => import('./mentions')) },
  { id: "radio", label: "Radio", component: lazy(() => import('./radio')) },
  { id: "rate", label: "Rate", component: lazy(() => import('./rate')) },
  { id: "select", label: "Select", component: lazy(() => import('./select')) },
  { id: "slider", label: "Slider", component: lazy(() => import('./slider')) },
  { id: "switch", label: "Switch", component: lazy(() => import('./switch')) },
  { id: "timepicker", label: "TimePicker", component: lazy(() => import('./timepicker')) },
  { id: "transfer", label: "Transfer", component: lazy(() => import('./transfer')) },
  { id: "treeselect", label: "TreeSelect", component: lazy(() => import('./treeselect')) },
  { id: "upload", label: "Upload", component: lazy(() => import('./upload')) },
];

export default function FormDemoPage() {
  return (
    // 使用 flex-row 将布局分为左右两列，h-[calc(100vh-100px)] 确保容器高度固定可滚动
    <Tabs defaultValue="autocomplete" className="flex flex-row gap-4 p-4 h-full min-h-[600px]">
      
      {/* 左侧栏：固定宽度，支持垂直滚动 */}
      <TabsList className="flex flex-col h-fit w-52 min-w-[200px] justify-start items-stretch bg-slate-100/50 p-2 rounded-lg border">
        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          表单组件列表
        </div>
        <div className="flex flex-col gap-1">
          {components.map((item) => (
            <TabsTrigger 
              key={item.id} 
              value={item.id}
              className="justify-start px-4 py-2.5 text-sm transition-all data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {item.label}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>

      {/* 右侧内容区：占据剩余空间，且内容过多时可独立滚动 */}
      <div className="flex-1 overflow-y-auto bg-white rounded-lg border p-6 shadow-sm">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full text-muted-foreground">
            正在加载组件...
          </div>
        }>
          {components.map((item) => (
            <TabsContent key={item.id} value={item.id} className="mt-0 focus-visible:outline-none">
              <item.component />
            </TabsContent>
          ))}
        </Suspense>
      </div>
    </Tabs>
  );
}