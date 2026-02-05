"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Thermometer, Volume2, Wind, Zap } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Slider } from "@/components/ui/slider"

// 1. 更加严谨的验证规则
const sliderSchema = z.object({
  volume: z.number().min(0).max(100),
  brightness: z.number().min(0).max(100),
  priceRange: z.array(z.number()).length(2),
  temperature: z.number().min(-10).max(50),
})

type SliderFormValues = z.infer<typeof sliderSchema>

export default function SliderExample() {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<SliderFormValues>({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      volume: 50,
      brightness: 70,
      priceRange: [20, 80],
      temperature: 20,
    },
  })

  // 监听值变化用于实时预览 (Watch values for live preview)
  const watchedValues = form.watch()

  async function onSubmit(data: SliderFormValues) {
    setIsLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    console.log("Submit Data:", data)
    toast.success("配置已保存")
    setIsLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10">
      <header className="space-y-2 border-b pb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">控制中心</h1>
        <p className="text-muted-foreground">通过滑块精密调节您的系统参数</p>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
          
          {/* 交互反馈区 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 音量与亮度 (单滑块示例) */}
            <div className="space-y-6 p-6 rounded-xl border bg-card">
              <h3 className="font-medium flex items-center gap-2 mb-4">
                <Zap className="h-4 w-4 text-yellow-500" /> 基础调节
              </h3>

              <FormField
                control={form.control}
                name="volume"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="flex justify-between">
                      <FormLabel className="flex items-center gap-2">
                        <Volume2 className={field.value > 70 ? "text-destructive" : ""} size={18} />
                        音量 ({field.value}%)
                      </FormLabel>
                    </div>
                    <FormControl>
                      <Slider
                        // 确保传入的是数组
                        value={[field.value]} 
                        // 解决方法：先接收原始参数 v，在内部进行断言并解构
                        onValueChange={(v) => {
                          const [val] = v as number[]; 
                          field.onChange(val);
                        }}
                        max={100}
                        step={1}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 亮度 */}
              <FormField
                control={form.control}
                name="brightness"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel>亮度调节</FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        onValueChange={(v) => {
                          const [val] = v as number[]; 
                          field.onChange(val);
                        }}
                        max={100}
                      />
                    </FormControl>
                    <div 
                      className="h-2 w-full rounded-full transition-all duration-300" 
                      style={{ backgroundColor: `rgba(255, 255, 255, ${field.value / 100})`, filter: 'invert(1)' }}
                    />
                  </FormItem>
                )}
              />
            </div>

            {/* 范围与高级设置 (多滑块示例) */}
            <div className="space-y-6 p-6 rounded-xl border bg-card">
              <h3 className="font-medium flex items-center gap-2 mb-4">
                <Wind className="h-4 w-4 text-blue-500" /> 环境与预算
              </h3>

              {/* 价格范围 */}
              <FormField
                control={form.control}
                name="priceRange"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="flex justify-between">
                      <FormLabel>预算区间</FormLabel>
                      <span className="text-xs font-mono bg-secondary px-2 py-1 rounded">
                        ${field.value[0]} - ${field.value[1]}
                      </span>
                    </div>
                    <FormControl>
                      <Slider
                        value={field.value}
                        onValueChange={field.onChange} // 数组对数组，无需解构
                        min={0}
                        max={500}
                        step={5}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* 温度 */}
              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="flex items-center gap-2">
                      <Thermometer className={field.value > 30 ? "text-orange-500" : "text-blue-400"} size={18} />
                      环境温度 ({field.value}°C)
                    </FormLabel>
                    <FormControl>
                      <Slider
                        value={[field.value]}
                        onValueChange={(v) => {
                          const [val] = v as number[]; 
                          field.onChange(val);
                        }}
                        min={-10}
                        max={50}
                        step={1}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full shadow-lg" disabled={isLoading}>
            {isLoading ? "正在应用配置..." : "保存当前设置"}
          </Button>
        </form>
      </Form>

      {/* 底部摘要预览 */}
      <footer className="bg-muted/50 p-4 rounded-lg border border-dashed text-sm">
        <h4 className="font-semibold mb-2 italic">实时配置快照 (JSON):</h4>
        <pre className="text-[11px] overflow-auto">
          {JSON.stringify(watchedValues, null, 2)}
        </pre>
      </footer>
    </div>
  )
}