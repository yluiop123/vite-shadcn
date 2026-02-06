import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldLabel
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import axios from "@/lib/axios"
import { cn } from "@/lib/utils"
import { useUserStore } from '@/store'
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2Icon } from "lucide-react"
import React, { useState } from 'react'
import { Controller, useForm } from "react-hook-form"
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>{intl.formatMessage({ id: 'page.login.username' })}</FieldLabel>
                        <Input placeholder="super" {...field} id={field.name} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>{intl.formatMessage({ id: 'page.login.password' })}</FieldLabel>
                        <Input type="password" placeholder="super" {...field} id={field.name} aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                      </Field>
                    )}
                  />
                  <Button type="submit" >
                    {loading && <Loader2Icon className='animate-spin' />}
                    {intl.formatMessage({ id: 'page.login.login' })}
                  </Button>
                </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
