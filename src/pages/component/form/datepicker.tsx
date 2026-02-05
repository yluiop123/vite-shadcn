"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { enUS, zhCN } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react"; // 增加图标
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

/**
 * 1. Zod Schema
 */
const eventSchema = z.object({
  birthday: z.date({
    required_error: "Please select a date / 请选择日期",
  }),
  eventTime: z.string().min(1, "Please set a time / 请设置时间"),
  duration: z.object({
    from: z.date(),
    to: z.date(),
  }, {
    required_error: "Please select a range / 请选择日期区间",
  }).refine(data => data.from < data.to, {
    message: "End date must be after start date / 结束日期必须晚于开始日期",
    path: ["to"]
  }),
})

type EventFormValues = z.infer<typeof eventSchema>

export default function GlobalDateForm() {
  const locale = "zh"

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      eventTime: "12:00",
    }
  })

  function onSubmit(data: EventFormValues) {
    console.log("Submit Data:", data)
    toast.success(locale === "zh" ? "提交成功" : "Success")
  }

  return (
    // 修复点：bg-white -> bg-card，border -> border-border
    <div className="mx-auto max-w-2xl p-6 border border-border rounded-xl shadow-lg bg-card text-card-foreground transition-colors">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">
          {locale === "zh" ? "活动计划表单" : "Event Planning Form"}
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* 1. Basic Date Picker */}
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-medium">Birthday / 出生日期</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <Button 
                        variant="outline" 
                        // 修复点：优化交互背景色
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-background hover:bg-accent transition-colors",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: locale === "zh" ? zhCN : enUS })
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-70" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-border shadow-xl" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={locale === "zh" ? zhCN : enUS}
                      initialFocus
                      className="rounded-md border border-border bg-popover"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 2. Date + Time Selection */}
          <div className="space-y-2">
            <FormLabel className="text-sm font-medium">Event Time / 活动具体时间</FormLabel>
            <div className="flex flex-wrap gap-4">
              <FormField
                control={form.control}
                name="eventTime"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-[140px]">
                    <FormControl>
                      <div className="relative group">
                        <Input 
                          type="time" 
                          {...field} 
                          // 修复点：适配深色模式的时间输入框，美化原生图标
                          className="pl-9 bg-background border-border focus:ring-primary transition-all [color-scheme:light] dark:[color-scheme:dark]" 
                        />
                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-1 items-center px-4 py-2 rounded-md bg-muted/50 border border-dashed border-border">
                <span className="text-xs text-muted-foreground">
                   {locale === "zh" ? "此时间将与上述日期合并处理" : "Will be combined with date in logic"}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Date Range Picker */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-medium">Project Duration / 项目周期</FormLabel>
                <Popover>
                  <PopoverTrigger>
                    <FormControl>
                      <Button 
                        variant="outline" 
                        className={cn(
                          "w-full pl-3 text-left font-normal bg-background hover:bg-accent",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                        {field.value?.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, "LLL dd, y") + " - " + format(field.value.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(field.value.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a range / 选择区间</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 border-border" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      locale={locale === "zh" ? zhCN : enUS}
                      className="bg-popover"
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription className="text-[12px]">Select start and end dates / 选择起止日期</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Separator className="my-6 opacity-50" />

          <Button type="submit" className="w-full shadow-lg hover:shadow-primary/20 transition-all font-semibold">
            Submit / 提交
          </Button>
        </form>
      </Form>
    </div>
  )
}

// 辅助组件：简单的分隔线
function Separator({ className }: { className?: string }) {
  return <div className={cn("h-[1px] w-full bg-border", className)} />
}