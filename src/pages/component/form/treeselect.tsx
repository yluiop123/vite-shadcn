"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
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

import TreeSelect from "@/components/ext/tree-select"

// 示例树形数据
interface TreeNode {
  id?: string
  name?: string
  value: string
  title: string
  children?: TreeNode[]
}

const treeData: TreeNode[] = [
  {
    value: "asia",
    title: "Asia / 亚洲",
    children: [
      { value: "cn", title: "China / 中国" },
      { value: "jp", title: "Japan / 日本" },
      { value: "in", title: "India / 印度" },
    ],
  },
  {
    value: "europe",
    title: "Europe / 欧洲",
    children: [
      { value: "de", title: "Germany / 德国" },
      { value: "fr", title: "France / 法国" },
      {
        value: "uk",
        title: "UK / 英国",
        children: [
          { value: "eng", title: "England / 英格兰" },
          { value: "sct", title: "Scotland / 苏格兰" },
        ],
      },
    ],
  },
  {
    value: "americas",
    title: "Americas / 美洲",
    children: [
      { value: "us", title: "United States / 美国" },
      { value: "ca", title: "Canada / 加拿大" },
    ],
  },
]

const schema = z.object({
  countries: z.array(z.string()).min(1, "请选择至少一项 / Please select at least one"),
  region: z.string().min(1, "请选择一个地区 / Select a region"),
})

type FormValues = z.infer<typeof schema>

export default function TreeSelectExample() {
  const [controlledValue, setControlledValue] = React.useState<string[]>(["cn", "de"])
  const [maxTagCount, setMaxTagCount] = React.useState(3)
  const [loadingRemote, setLoadingRemote] = React.useState(false)
  const [remoteError, setRemoteError] = React.useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { countries: controlledValue, region: "asia" },
  })

  React.useEffect(() => {
    form.setValue("countries", controlledValue)
  }, [controlledValue, form])

  // 模拟异步加载树数据
  const [remoteData, setRemoteData] = React.useState<TreeNode[] | null>(null)
  const loadRemote = async (fail = false) => {
    setLoadingRemote(true)
    setRemoteError(null)
    setRemoteData(null)
    try {
      await new Promise((r) => setTimeout(r, 900))
      if (fail) throw new Error("Failed to fetch")
      setRemoteData(treeData)
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "加载失败 / Failed to load"
      setRemoteError(errorMessage)
    } finally {
      setLoadingRemote(false)
    }
  }

  React.useEffect(() => {
    loadRemote()
  }, [])

  async function onSubmit(data: FormValues) {
    await new Promise((r) => setTimeout(r, 600))
    toast.success("已保存 / Saved")
    console.log(data)
  }

  return (
    <div className="space-y-10 p-8 max-w-6xl mx-auto">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">TreeSelect / 树形选择</h1>
        <p className="text-muted-foreground mt-2">
          覆盖：基础用法、单选/多选、受控、搜索、异步加载、错误状态、表单集成等常见场景。
        </p>
      </div>

      {/* 1. 基础用法 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">基础用法 / Basic Usage</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">默认多选 / Default Multiple</Label>
          <TreeSelect
            data={treeData}
            placeholder="请选择国家 / Choose country"
          />
        </div>
      </section>

      {/* 2. 单选模式 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">单选模式 / Single Select</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">单选一个地区 / Select Single Region</Label>
          <TreeSelect
            data={treeData}
            multiple={false}
            placeholder="请选择地区 / Select region"
          />
        </div>
      </section>

      {/* 3. 受控模式 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">受控模式 / Controlled</h2>
        <div className="bg-card p-6 rounded-lg border space-y-4">
          <div className="space-y-3">
            <Label>受控多选 / Controlled Multiple</Label>
            <TreeSelect
              data={treeData}
              value={controlledValue}
              onChange={(v) => setControlledValue(Array.isArray(v) ? v : [v])}
              maxTagCount={maxTagCount}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-3 border-t">
            <Button
              size="sm"
              onClick={() =>
                setControlledValue(
                  treeData.flatMap((n) => (n.children ?? []).map((c: TreeNode) => c.value))
                )
              }
            >
              全选示例 / Select All
            </Button>
            <Button size="sm" variant="outline" onClick={() => setControlledValue([])}>
              清空 / Clear
            </Button>
            <label className="flex items-center gap-2 text-sm">
              <span>最大标签数 / maxTagCount:</span>
              <input
                type="number"
                min={1}
                max={10}
                value={maxTagCount}
                onChange={(e) => setMaxTagCount(Number(e.target.value))}
                className="w-16 rounded border px-2 py-1"
              />
            </label>
          </div>

          <div className="pt-3 border-t">
            <p className="text-sm text-muted-foreground">
              当前选中值: <code className="bg-muted px-2 py-1 rounded text-xs">{JSON.stringify(controlledValue)}</code>
            </p>
          </div>
        </div>
      </section>

      {/* 4. 搜索与过滤 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">搜索功能 / Search</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">支持搜索过滤 / Search Enabled</Label>
          <TreeSelect
            data={treeData}
            placeholder="输入搜索 / Type to search..."
          />
          <p className="text-xs text-muted-foreground mt-3">
            输入任意关键字（如 "China" 或 "中国"）可快速查找
          </p>
        </div>
      </section>

      {/* 5. 异步加载 & 错误状态 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">异步加载 / Async Load & Error</h2>
        <div className="bg-card p-6 rounded-lg border">
          <div className="flex items-center gap-3 mb-4">
            <Button size="sm" onClick={() => loadRemote(false)}>
              重新加载 / Reload
            </Button>
            <Button size="sm" variant="outline" onClick={() => loadRemote(true)}>
              模拟失败 / Simulate Error
            </Button>
          </div>

          {loadingRemote && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="animate-spin h-4 w-4" />
              加载中 / Loading...
            </div>
          )}
          {remoteError && <div className="text-destructive text-sm">错误: {remoteError}</div>}
          {remoteData && (
            <TreeSelect
              data={remoteData}
              placeholder="远程数据 / Remote data"
            />
          )}
        </div>
      </section>

      {/* 6. 表单集成 & 验证 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">表单集成 / Form Integration</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="countries"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>已选国家 / Selected Countries</FormLabel>
                    <FormControl>
                      <TreeSelect
                        data={treeData}
                        value={field.value}
                        onChange={field.onChange}
                        maxTagCount={4}
                      />
                    </FormControl>
                    <FormDescription>
                      选择一个或多个国家 / Select one or more countries
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>选择区域 / Choose Region</FormLabel>
                    <FormControl>
                      <TreeSelect
                        data={treeData}
                        multiple={false}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormDescription>
                      仅支持单选 / Single selection only
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                提交 / Submit
              </Button>
            </form>
          </Form>
        </div>
      </section>

      {/* 7. 自定义字段名 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">自定义字段名 / Custom Field Names</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">
            当数据结构不同时 / Custom Field Structure
          </Label>
          <TreeSelect
            data={[
              {
                id: "custom-a",
                name: "Custom Item A / 自定义项 A",
                children: [
                  { id: "custom-a-1", name: "Sub Item 1 / 子项 1" },
                  { id: "custom-a-2", name: "Sub Item 2 / 子项 2" },
                ],
              },
            ] as TreeNode[]}
            fieldNames={{ value: "id", title: "name", children: "children" }}
            placeholder="自定义字段 / Custom fields"
          />
          <p className="text-xs text-muted-foreground mt-3">
            使用 fieldNames 属性映射不同的字段名 / Use fieldNames to map custom field names
          </p>
        </div>
      </section>

      {/* 8. 禁用状态 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">禁用状态 / Disabled State</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">禁用的选择器 / Disabled Selector</Label>
          <div className="opacity-50 pointer-events-none">
            <TreeSelect
              data={treeData}
              placeholder="此选择器已禁用 / This selector is disabled"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
