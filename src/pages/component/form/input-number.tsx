"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import * as React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { InputNumber } from "@/components/ext/input-number"
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

// Validation Schema / 验证规则
const inputNumberSchema = z.object({
  age: z.number()
    .min(0, "年龄不能为负数 / Age cannot be negative")
    .max(150, "年龄不合理 / Invalid age"),
  price: z.number()
    .min(0, "价格不能为负数 / Price cannot be negative")
    .max(999999, "价格过高 / Price too high"),
  quantity: z.number()
    .min(1, "数量至少为1 / Quantity must be at least 1")
    .max(1000, "数量过多 / Quantity too high"),
  discount: z.number()
    .min(0, "折扣不能为负数 / Discount cannot be negative")
    .max(100, "折扣不能超过100% / Discount cannot exceed 100%"),
})

type InputNumberFormValues = z.infer<typeof inputNumberSchema>

export default function InputNumberExample() {
  const [basicValue, setBasicValue] = React.useState<number | null>(5)
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<InputNumberFormValues>({
    resolver: zodResolver(inputNumberSchema),
    defaultValues: {
      age: 25,
      price: 99.99,
      quantity: 1,
      discount: 10,
    },
  })

  async function onSubmit(data: InputNumberFormValues) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Form Data:", data)
    toast.success("提交成功 / Submitted Successfully")
    setIsLoading(false)
  }

  return (
    <div className="space-y-12 p-8 max-w-5xl mx-auto">
      {/* Header / 标题 */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">InputNumber 数字输入框</h1>
        <p className="text-muted-foreground mt-2">
          数字输入框组件，支持增减、范围限制、精度控制等功能
        </p>
      </div>

      {/* 1. 基础用法 Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">基础用法 / Basic Usage</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label>默认输入框 / Default</Label>
            <InputNumber
              value={basicValue}
              onChange={setBasicValue}
              placeholder="输入数字..."
            />
            <p className="text-sm text-muted-foreground">
              当前值: {basicValue}
            </p>
          </div>

          <div className="space-y-2">
            <Label>带步长 / With Step</Label>
            <InputNumber
              defaultValue={10}
              step={5}
              placeholder="步长为 5..."
            />
            <p className="text-sm text-muted-foreground">
              单次增减步长为 5
            </p>
          </div>

          <div className="space-y-2">
            <Label>带范围限制 / With Min/Max</Label>
            <InputNumber
              defaultValue={50}
              min={0}
              max={100}
              placeholder="0-100 之间"
            />
            <p className="text-sm text-muted-foreground">
              范围限制在 0 - 100
            </p>
          </div>
        </div>
      </section>

      {/* 2. 显示操作按钮 Show Buttons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">显示操作按钮 / Show Buttons</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label>左侧按钮 / Left Buttons</Label>
            <InputNumber
              defaultValue={5}
              min={0}
              max={10}
              showLeftButtons
              placeholder="点击按钮增减..."
            />
            <p className="text-sm text-muted-foreground">
              在输入框左侧显示 +/- 按钮
            </p>
          </div>

          <div className="space-y-2">
            <Label>右侧微调器 / Right Spinner</Label>
            <InputNumber
              defaultValue={5}
              min={0}
              max={10}
              showSpinner
              placeholder="悬停显示上下箭头..."
            />
            <p className="text-sm text-muted-foreground">
              右侧显示上下微调按钮（悬停时显示）
            </p>
          </div>

          <div className="space-y-2">
            <Label>同时显示两种按钮 / Both Buttons</Label>
            <InputNumber
              defaultValue={5}
              min={0}
              max={10}
              step={2}
              showLeftButtons
              showSpinner
              placeholder="完整的交互..."
            />
            <p className="text-sm text-muted-foreground">
              同时显示左侧 +/- 和右侧微调器
            </p>
          </div>
        </div>
      </section>

      {/* 3. 小数精度 Decimal Precision */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">小数精度 / Decimal Precision</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label>整数 / Integer (precision: 0)</Label>
            <InputNumber
              defaultValue={42}
              step={1}
              precision={0}
              showSpinner
              placeholder="仅整数..."
            />
          </div>

          <div className="space-y-2">
            <Label>小数点后两位 / Decimal (precision: 2)</Label>
            <InputNumber
              defaultValue={99.99}
              step={0.01}
              precision={2}
              showSpinner
              placeholder="两位小数..."
            />
          </div>

          <div className="space-y-2">
            <Label>小数点后三位 / Decimal (precision: 3)</Label>
            <InputNumber
              defaultValue={3.14159}
              step={0.001}
              precision={3}
              showSpinner
              placeholder="三位小数..."
            />
          </div>
        </div>
      </section>

      {/* 4. 尺寸变体 Size Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">尺寸变体 / Size Variants</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label>小号 / Small</Label>
            <InputNumber
              defaultValue={5}
              size="sm"
              showSpinner
              placeholder="小号输入框..."
            />
          </div>

          <div className="space-y-2">
            <Label>标准号 / Default</Label>
            <InputNumber
              defaultValue={5}
              size="default"
              showSpinner
              placeholder="标准输入框..."
            />
          </div>

          <div className="space-y-2">
            <Label>大号 / Large</Label>
            <InputNumber
              defaultValue={5}
              size="lg"
              showSpinner
              placeholder="大号输入框..."
            />
          </div>
        </div>
      </section>

      {/* 5. 样式变体 Style Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">样式变体 / Style Variants</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label>默认样式 / Default</Label>
            <InputNumber
              defaultValue={5}
              variant="default"
              showSpinner
              placeholder="默认样式..."
            />
          </div>

          <div className="space-y-2">
            <Label>紧凑样式 / Compact</Label>
            <InputNumber
              defaultValue={5}
              variant="compact"
              showSpinner
              placeholder="紧凑样式..."
            />
          </div>
        </div>
      </section>

      {/* 6. 不同状态 Different States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">不同状态 / Different States</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label>正常状态 / Normal</Label>
            <InputNumber
              defaultValue={5}
              showSpinner
              placeholder="正常状态..."
            />
          </div>

          <div className="space-y-2">
            <Label>禁用状态 / Disabled</Label>
            <InputNumber
              defaultValue={5}
              disabled
              showSpinner
              placeholder="禁用状态..."
            />
          </div>

          <div className="space-y-2">
            <Label>允许清空 / Allow Clear</Label>
            <InputNumber
              defaultValue={5}
              allowClear
              showSpinner
              placeholder="允许清空..."
            />
            <p className="text-sm text-muted-foreground">
              可以将值设置为空
            </p>
          </div>

          <div className="space-y-2">
            <Label>只读状态 / Read Only</Label>
            <InputNumber
              defaultValue={5}
              readOnly
              placeholder="只读状态..."
            />
          </div>
        </div>
      </section>

      {/* 7. 实际应用场景 Real-world Scenarios */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">实际应用场景 / Real-world Scenarios</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label>购物车数量 / Cart Quantity</Label>
            <InputNumber
              defaultValue={1}
              min={1}
              max={999}
              step={1}
              showLeftButtons
              placeholder="购买数量..."
            />
          </div>

          <div className="space-y-2">
            <Label>折扣百分比 / Discount Percentage</Label>
            <InputNumber
              defaultValue={10}
              min={0}
              max={100}
              step={5}
              precision={0}
              showSpinner
              placeholder="折扣比例..."
            />
            <p className="text-sm text-muted-foreground">
              0% - 100% 之间
            </p>
          </div>

          <div className="space-y-2">
            <Label>商品价格 / Product Price</Label>
            <InputNumber
              defaultValue={99.99}
              min={0}
              step={0.01}
              precision={2}
              showSpinner
              placeholder="输入价格..."
            />
            <p className="text-sm text-muted-foreground">
              精确到分 / Precision to 2 decimal places
            </p>
          </div>

          <div className="space-y-2">
            <Label>评分 / Rating</Label>
            <InputNumber
              defaultValue={4.5}
              min={0}
              max={5}
              step={0.5}
              precision={1}
              showSpinner
              placeholder="评分..."
            />
            <p className="text-sm text-muted-foreground">
              0 - 5 分，步长 0.5
            </p>
          </div>
        </div>
      </section>

      {/* 8. 表单验证示例 Form Validation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">表单验证示例 / Form Validation</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 年龄 Age */}
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>年龄 / Age</FormLabel>
                    <FormControl>
                      <InputNumber
                        min={0}
                        max={150}
                        step={1}
                        showSpinner
                        placeholder="输入年龄..."
                        value={field.value}
                        onChange={(val) => field.onChange(val ?? 0)}
                        onBlur={() => field.onBlur()}
                      />
                    </FormControl>
                    <FormDescription>
                      请输入有效的年龄 / Please enter a valid age
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 价格 Price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>商品价格 / Product Price</FormLabel>
                    <FormControl>
                      <InputNumber
                        min={0}
                        max={999999}
                        step={0.01}
                        precision={2}
                        showSpinner
                        placeholder="输入价格..."
                        value={field.value}
                        onChange={(val) => field.onChange(val ?? 0)}
                        onBlur={() => field.onBlur()}
                      />
                    </FormControl>
                    <FormDescription>
                      精确到分 / Up to 2 decimal places
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 数量 Quantity */}
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>购买数量 / Purchase Quantity</FormLabel>
                    <FormControl>
                      <InputNumber
                        min={1}
                        max={1000}
                        step={1}
                        showLeftButtons
                        showSpinner
                        placeholder="输入数量..."
                        value={field.value}
                        onChange={(val) => field.onChange(val ?? 1)}
                        onBlur={() => field.onBlur()}
                      />
                    </FormControl>
                    <FormDescription>
                      至少购买 1 件 / Minimum purchase is 1
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 折扣 Discount */}
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>折扣百分比 / Discount Percentage</FormLabel>
                    <FormControl>
                      <InputNumber
                        min={0}
                        max={100}
                        step={5}
                        precision={0}
                        showSpinner
                        placeholder="输入折扣..."
                        value={field.value}
                        onChange={(val) => field.onChange(val ?? 0)}
                        onBlur={() => field.onBlur()}
                      />
                    </FormControl>
                    <FormDescription>
                      0% - 100% 之间 / Between 0% - 100%
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 计算结果 Calculation Result */}
              <div className="p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm font-semibold">预算计算 / Budget Calculation</p>
                <p className="text-sm">
                  小计: ¥
                  {(form.watch("price") * form.watch("quantity")).toFixed(2)}
                </p>
                <p className="text-sm">
                  折扣: {form.watch("discount")}%
                </p>
                <p className="text-base font-bold text-primary">
                  总价: ¥
                  {(
                    form.watch("price") *
                    form.watch("quantity") *
                    (1 - form.watch("discount") / 100)
                  ).toFixed(2)}
                </p>
              </div>

              {/* 提交按钮 Submit Button */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "提交中... / Submitting..." : "提交表单 / Submit Form"}
              </Button>
            </form>
          </Form>
        </div>
      </section>

      {/* 9. 受控vs非受控 Controlled vs Uncontrolled */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">受控vs非受控 / Controlled vs Uncontrolled</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label>非受控组件 / Uncontrolled</Label>
            <InputNumber
              defaultValue={5}
              showSpinner
              placeholder="初始值为 5..."
            />
            <p className="text-sm text-muted-foreground">
              使用 defaultValue，组件自己管理状态
            </p>
          </div>

          <div className="space-y-2">
            <Label>受控组件 / Controlled</Label>
            <InputNumber
              value={basicValue}
              onChange={setBasicValue}
              showSpinner
              placeholder="通过 React state 控制..."
            />
            <p className="text-sm text-muted-foreground">
              使用 value 和 onChange，由父组件管理状态
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
