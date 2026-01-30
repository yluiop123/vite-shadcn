"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { AlertCircle, Eye, EyeOff, Lock, Mail, Search, User } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Validation Schema / 验证规则
const inputSchema = z.object({
  username: z.string()
    .min(2, "用户名至少2个字符 / Username must be at least 2 characters")
    .max(20, "用户名最多20个字符 / Username must be at most 20 characters"),
  email: z.string()
    .email("请输入有效的邮箱 / Please enter a valid email"),
  password: z.string()
    .min(8, "密码至少8位 / Password must be at least 8 characters"),
  phone: z.string()
    .regex(/^[\d\s\-+()]+$/, "请输入有效的电话号码 / Please enter a valid phone number"),
})

type InputFormValues = z.infer<typeof inputSchema>

export default function InputExample() {
  const [controlledValue, setControlledValue] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")

  const form = useForm<InputFormValues>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      phone: "",
    },
  })

  async function onSubmit(data: InputFormValues) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("Form Data:", data)
    toast.success("提交成功 / Submitted Successfully")
    setIsLoading(false)
    form.reset()
  }

  return (
    <div className="space-y-12 p-8 max-w-5xl mx-auto">
      {/* Header / 标题 */}
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Input 输入框组件</h1>
        <p className="text-muted-foreground mt-2">
          展示 Input 组件的基础用法、受控模式、Loading 状态和错误状态
        </p>
      </div>

      {/* 1. 基础用法 Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">基础用法 / Basic Usage</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="basic-text">文本输入 / Text</Label>
            <Input
              id="basic-text"
              type="text"
              placeholder="输入文本 / Enter text..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="basic-email">邮箱输入 / Email</Label>
            <Input
              id="basic-email"
              type="email"
              placeholder="example@email.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="basic-password">密码输入 / Password</Label>
            <Input
              id="basic-password"
              type="password"
              placeholder="输入密码 / Enter password..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="basic-number">数字输入 / Number</Label>
            <Input
              id="basic-number"
              type="number"
              placeholder="输入数字 / Enter number..."
              min="0"
              max="100"
            />
          </div>
        </div>
      </section>

      {/* 2. 受控模式 Controlled Input */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">受控模式 / Controlled Input</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="controlled">实时输入值 / Real-time Value</Label>
            <Input
              id="controlled"
              type="text"
              placeholder="输入内容观察变化 / Type to see the change..."
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
            />
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm">
                <span className="font-semibold">当前值 / Current Value: </span>
                <span className="text-primary">
                  {controlledValue || "（空）/ (Empty)"}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="search-input">搜索框 / Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="search-input"
                className="pl-10"
                type="search"
                placeholder="搜索 / Search..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            {searchValue && (
              <p className="text-sm text-muted-foreground">
                搜索结果: / Search results for "{searchValue}"
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 3. 不同状态 Different States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">不同状态 / Different States</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="state-normal">正常状态 / Normal</Label>
            <Input
              id="state-normal"
              type="text"
              placeholder="正常输入 / Normal input..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state-disabled">禁用状态 / Disabled</Label>
            <Input
              id="state-disabled"
              type="text"
              placeholder="禁用输入框 / Disabled input..."
              disabled
              defaultValue="禁用 / Disabled"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state-readonly">只读状态 / Read Only</Label>
            <Input
              id="state-readonly"
              type="text"
              defaultValue="只读内容 / Read only content"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state-filled">已填充 / Filled</Label>
            <Input
              id="state-filled"
              type="text"
              defaultValue="预填充的值 / Prefilled value"
            />
          </div>
        </div>
      </section>

      {/* 4. 带图标的输入框 Input with Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">带图标的输入框 / Input with Icons</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="icon-user">用户名 / Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="icon-user"
                className="pl-10"
                type="text"
                placeholder="输入用户名 / Enter username..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon-email">邮箱 / Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="icon-email"
                className="pl-10"
                type="email"
                placeholder="邮箱地址 / Email address..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon-password">密码 / Password (可切换显示)</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="icon-password"
                className="pl-10 pr-10"
                type={showPassword ? "text" : "password"}
                placeholder="输入密码 / Enter password..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Loading 状态 Loading State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Loading 状态 / Loading State</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-3">
            <Label>模拟加载表单 / Simulated Loading Form</Label>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="输入... / Type..."
                disabled={isLoading}
              />
              <Input
                type="email"
                placeholder="邮箱 / Email..."
                disabled={isLoading}
              />
              <Button
                onClick={() => {
                  setIsLoading(true)
                  setTimeout(() => {
                    setIsLoading(false)
                    toast.success("加载完成 / Loading Complete")
                  }, 2000)
                }}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "加载中... / Loading..." : "开始加载 / Start Loading"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. 错误状态 Error State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">错误状态 / Error State</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="error-input">验证失败 / Validation Error</Label>
            <Input
              id="error-input"
              type="text"
              placeholder="输入有效内容 / Enter valid content..."
              aria-invalid="true"
              defaultValue="错误 / Error"
              className="border-destructive"
            />
            <div className="flex items-center gap-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span>输入内容不符合要求 / Input does not meet requirements</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. 各种输入类型 Input Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">各种输入类型 / Input Types</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="type-url">URL 输入</Label>
            <Input
              id="type-url"
              type="url"
              placeholder="https://example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type-tel">电话 / Phone</Label>
            <Input
              id="type-tel"
              type="tel"
              placeholder="+86 138 0000 0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type-date">日期 / Date</Label>
            <Input
              id="type-date"
              type="date"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type-time">时间 / Time</Label>
            <Input
              id="type-time"
              type="time"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type-file">文件 / File</Label>
            <Input
              id="type-file"
              type="file"
            />
          </div>
        </div>
      </section>

      {/* 8. 表单验证示例 Form Validation Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">表单验证示例 / Form Validation Example</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* 用户名 Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>用户名 / Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          className="pl-10"
                          placeholder="2-20 个字符 / 2-20 characters"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      用户名必须在2-20个字符之间 / Username must be between 2-20 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 邮箱 Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>邮箱地址 / Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          className="pl-10"
                          type="email"
                          placeholder="example@email.com"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      请输入有效的邮箱地址 / Please enter a valid email address
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 密码 Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>密码 / Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                          className="pl-10"
                          type="password"
                          placeholder="至少8个字符 / At least 8 characters"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription>
                      密码必须至少包含8个字符 / Password must contain at least 8 characters
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 电话 Phone */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>电话号码 / Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+86 138 0000 0000"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      请输入有效的电话号码 / Please enter a valid phone number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

      {/* 9. 自定义样式 Custom Styles */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">自定义样式 / Custom Styles</h2>
        <div className="grid gap-6 bg-card p-6 rounded-lg border">
          <div className="space-y-2">
            <Label htmlFor="style-rounded">圆角输入框 / Rounded Input</Label>
            <Input
              id="style-rounded"
              className="rounded-full"
              type="text"
              placeholder="圆角样式 / Rounded style..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="style-large">大号输入框 / Large Input</Label>
            <Input
              id="style-large"
              className="h-12 text-base"
              type="text"
              placeholder="大号输入框 / Large input..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="style-small">小号输入框 / Small Input</Label>
            <Input
              id="style-small"
              className="h-8 text-xs"
              type="text"
              placeholder="小号输入框 / Small input..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="style-custom">自定义边框 / Custom Border</Label>
            <Input
              id="style-custom"
              className="border-2 border-primary focus-visible:ring-0 focus-visible:border-primary"
              type="text"
              placeholder="自定义样式 / Custom style..."
            />
          </div>
        </div>
      </section>
    </div>
  )
}
