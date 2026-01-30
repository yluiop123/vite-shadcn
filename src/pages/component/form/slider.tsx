"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Volume2, Wind, Zap } from "lucide-react"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

// Validation Schema / 验证规则
const sliderSchema = z.object({
  volume: z.number().min(0).max(100),
  brightness: z.number().min(0).max(100),
  priceRange: z.array(z.number()).length(2),
  temperature: z.number().min(-10).max(50),
})

type SliderFormValues = z.infer<typeof sliderSchema>

export default function SliderExample() {
  const [volume, setVolume] = React.useState(50)
  const [brightness, setBrightness] = React.useState(70)
  const [speed, setSpeed] = React.useState(1)
  const [priceRange, setPriceRange] = React.useState([20, 80])
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

  async function onSubmit(data: SliderFormValues) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    console.log("Form Data:", data)
    toast.success("提交成功 / Submitted Successfully")
    setIsLoading(false)
    form.reset()
  }

  return (
    <div className="space-y-12 p-8 max-w-5xl mx-auto">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Slider 滑块组件</h1>
        <p className="text-muted-foreground mt-2">用于在某个范围内选择一个或多个值的滑块输入器</p>
      </div>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">基础用法 / Basic Usage</h2>
        <div className="space-y-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label>简单滑块 / Simple Slider</Label>
            <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
          </div>

          <div className="space-y-2">
            <Label>带标签的滑块 / Slider with Label</Label>
            <Slider defaultValue={[60]} max={100} step={1} className="w-full" />
          </div>
        </div>
      </section>

      {/* Controlled Mode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">受控模式 / Controlled Mode</h2>
        <div className="space-y-4 bg-card p-6 rounded-lg border">
          <div className="space-y-3">
            <Label className="flex items-center gap-2"><Volume2 className="h-4 w-4" /> 音量控制 / Volume Control</Label>
            <Slider value={[volume]} onValueChange={(v) => setVolume(v[0])} max={100} step={1} className="w-full" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>当前: {volume}%</span>
              <span>状态: {volume === 0 ? "静音 / Muted" : volume < 30 ? "低音 / Low" : volume < 70 ? "正常 / Normal" : "高音 / High"}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2"><Zap className="h-4 w-4" /> 亮度调节 / Brightness</Label>
            <Slider value={[brightness]} onValueChange={(v) => setBrightness(v[0])} max={100} step={1} className="w-full" />
            <div className="w-full h-20 rounded-md border bg-gradient-to-r from-black to-white" style={{ opacity: brightness / 100 }} />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2"><Wind className="h-4 w-4" /> 速度调节 / Speed</Label>
            <div className="flex items-center gap-4">
              <Slider value={[speed]} onValueChange={(v) => setSpeed(v[0])} max={3} step={0.1} className="flex-1" />
              <span className="text-sm font-semibold min-w-16 text-right">{speed.toFixed(1)}x</span>
            </div>
          </div>
        </div>
      </section>

      {/* Range Selection */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">范围选择 / Range Selection</h2>
        <div className="space-y-4 bg-card p-6 rounded-lg border">
          <div className="space-y-3">
            <Label>价格范围 / Price Range</Label>
            <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={100} step={1} className="w-full" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">最低: ${priceRange[0]}</span>
              <span className="font-semibold text-primary">${priceRange[0]} - ${priceRange[1]}</span>
              <span className="text-muted-foreground">最高: ${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Disabled and Steps */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">禁用与步长 / Disabled & Steps</h2>
        <div className="space-y-6 bg-card p-6 rounded-lg border">
          <div className="space-y-3">
            <Label>禁用的滑块 / Disabled</Label>
            <Slider defaultValue={[50]} max={100} step={1} disabled className="w-full" />
          </div>
          <div className="space-y-3">
            <Label>粗步长 (10) / Large Step</Label>
            <Slider defaultValue={[50]} max={100} step={10} className="w-full" />
          </div>
        </div>
      </section>

      {/* Form Validation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">表单验证 / Form Validation</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField control={form.control} name="volume" render={({ field }) => (
                <FormItem>
                  <FormLabel>音量 / Volume</FormLabel>
                  <FormControl>
                    <Slider value={[field.value]} onValueChange={(v) => field.onChange(v[0])} max={100} step={1} className="w-full" />
                  </FormControl>
                  <FormDescription>调整音量 / Adjust volume</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="brightness" render={({ field }) => (
                <FormItem>
                  <FormLabel>亮度 / Brightness</FormLabel>
                  <FormControl>
                    <Slider value={[field.value]} onValueChange={(v) => field.onChange(v[0])} max={100} step={1} className="w-full" />
                  </FormControl>
                  <FormDescription>调整屏幕亮度 / Adjust screen brightness</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="priceRange" render={({ field }) => (
                <FormItem>
                  <FormLabel>价格范围 / Price Range</FormLabel>
                  <FormControl>
                    <Slider value={field.value} onValueChange={field.onChange} min={0} max={100} step={1} className="w-full" />
                  </FormControl>
                  <FormDescription>选择价格区间 / Select price range</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="temperature" render={({ field }) => (
                <FormItem>
                  <FormLabel>温度 / Temperature</FormLabel>
                  <FormControl>
                    <Slider value={[field.value]} onValueChange={(v) => field.onChange(v[0])} min={-10} max={50} step={1} className="w-full" />
                  </FormControl>
                  <FormDescription>设置温度 / Set temperature</FormDescription>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "提交中..." : "提交表单 / Submit"}</Button>
            </form>
          </Form>
        </div>
      </section>

      {/* Real-world Scenarios */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">实际应用场景 / Real-world Scenarios</h2>
        <div className="space-y-6 bg-card p-6 rounded-lg border">
          <div className="space-y-3 p-4 border rounded-lg">
            <h3 className="font-semibold">音频编辑器 / Audio Editor</h3>
            <div className="space-y-2">
              <Label>音量 / Volume</Label>
              <Slider defaultValue={[70]} max={100} step={1} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label>播放速度 / Playback Speed</Label>
              <Slider defaultValue={[1]} min={0.5} max={2} step={0.1} className="w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
