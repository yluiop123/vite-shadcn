"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { enUS, zhCN } from "date-fns/locale"; // Multi-language support
import { CalendarIcon } from "lucide-react";
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
 * 1. Zod Schema (Bilingual/双语)
 */
const eventSchema = z.object({
  // Scene A: Basic Date / 场景 A: 基础日期
  birthday: z.date({
    required_error: "Please select a date / 请选择日期",
  }),

  // Scene B: Date + Time / 场景 B: 日期 + 时间
  // Note: HTML5 time input returns a string "HH:mm"
  eventTime: z.string().min(1, "Please set a time / 请设置时间"),

  // Scene C: Date Range / 场景 C: 日期区间
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
  const locale = "zh" // Can be toggled dynamically / 可动态切换

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
    <div className="mx-auto max-w-2xl p-6 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-6">
        {locale === "zh" ? "活动计划表单" : "Event Planning Form"}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          {/* 1. Basic Date Picker / 基础日期 */}
          <FormField
            control={form.control}
            name="birthday"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Birthday / 出生日期</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                        {field.value ? format(field.value, "PPP", { locale: locale === "zh" ? zhCN : enUS }) : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={locale === "zh" ? zhCN : enUS}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 2. Date + Time Selection / 日期 + 时间 */}
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <FormLabel>Event Time / 活动具体时间</FormLabel>
              <div className="flex gap-2 mt-2">
                {/* Time string input integrated with react-hook-form */}
                <FormField
                  control={form.control}
                  name="eventTime"
                  render={({ field }) => (
                    <FormControl>
                      <Input type="time" {...field} className="w-[150px]" />
                    </FormControl>
                  )}
                />
                <span className="text-sm text-muted-foreground self-center">
                  (Combine with the date above in logic)
                </span>
              </div>
              <FormMessage />
            </div>
          </div>

          {/* 3. Date Range Picker / 日期区间 */}
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Project Duration / 项目周期</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant="outline" className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
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
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                      locale={locale === "zh" ? zhCN : enUS}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select start and end dates / 选择起止日期</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">Submit / 提交</Button>
        </form>
      </Form>
    </div>
  )
}