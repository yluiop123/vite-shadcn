import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "@/lib/axios"
import { cn } from "@/lib/utils"
import { useUserStore } from '@/store'
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router'
import { z } from "zod"
const formSchema = z.object({
  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  })
})
export default function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "super",
      password: "super"
    },
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {login} = useUserStore();
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    axios
      .post('user/login', values)
      .then((res) => {
        const { status, msg, field,token } = res.data;
        if (status === 'ok') {
          login(token);
          navigate('/');
        } else if (['password', 'username'].includes(field)) {
          form.setError(field, {
            message: msg
          })
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>欢迎使用</CardTitle>
              <CardDescription>
                请输入您的账户信息以登录
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="super" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input placeholder="super" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" >
                    {loading&&<Loader2Icon className='animate-spin'/>}             
                    Submit</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
