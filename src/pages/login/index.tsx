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
import { useIntl } from "react-intl"
import { useNavigate } from 'react-router'
import { z } from "zod"


export default function Login({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const intl = useIntl();
  const formSchema = z.object({
    username: z.string().min(4, {
      message: intl.formatMessage({ id: 'page.login.username.valid' }),
    }),
    password: z.string().min(4, {
      message: intl.formatMessage({ id: 'page.login.password.valid' }),
    })
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "super",
      password: "super"
    },
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { login } = useUserStore();

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    axios
      .post('user/login', values)
      .then((res) => {
        const { status, msg, field, token } = res.data.data;
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
              <CardTitle>{intl.formatMessage({ id: 'page.login.title' })}</CardTitle>
              <CardDescription>
                {intl.formatMessage({ id: 'page.login.desc' })}
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
                        <FormLabel>{intl.formatMessage({ id: 'page.login.username' })}</FormLabel>
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
                        <FormLabel>{intl.formatMessage({ id: 'page.login.password' })}</FormLabel>
                        <FormControl>
                          <Input placeholder="super" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" >
                    {loading && <Loader2Icon className='animate-spin' />}
                    {intl.formatMessage({ id: 'page.login.login' })}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
