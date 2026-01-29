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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

/**
 * 1. Zod Schema - 错误信息直接写成双语
 * Schema Error Messages in both languages
 */
const profileSchema = z.object({
  username: z.string()
    .min(2, "用户名至少2个字符 / Username must be at least 2 characters")
    .max(20, "名字太长 / Name is too long"),
  email: z.string()
    .email("请输入有效的邮箱 / Please enter a valid email"),
  password: z.string()
    .min(8, "密码至少8位 / Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "两次输入的密码不一致 / Passwords do not match",
      path: ["confirmPassword"],
    })
  }
})

type ProfileFormValues = z.infer<typeof profileSchema>

export default function DualLanguageForm() {
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Submitted:", data)
    setIsLoading(false)
    toast.success("注册成功 / Registration Successful")
    form.reset()
  }

  return (
    <div className="max-w-xl mx-auto p-8 border rounded-xl shadow-md bg-card">
      <div className="mb-8 border-b pb-4">
        <h2 className="text-2xl font-bold">创建账户 / Create Account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          请填写以下信息完成注册 / Please fill in the details to register
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* 用户名 Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between">
                  用户名 / Username
                </FormLabel>
                <FormControl>
                  <Input placeholder="Nickname..." {...field} />
                </FormControl>
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
                <FormLabel className="flex justify-between">
                  电子邮箱/Email Address
                </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="example@domain.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 密码组 Password Group */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-col">
                    密码/Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex flex-col">
                  确认密码/Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                提交中 / Submitting...
              </>
            ) : (
              "提交注册 / Submit Registration"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}