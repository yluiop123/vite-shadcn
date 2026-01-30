"use client"

import { zodResolver } from "@hookform/resolvers/zod"
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

import Upload, { type FileItem } from "@/components/ext/upload"

const schema = z.object({
  avatar: z.array(z.object({ uid: z.string(), name: z.string() })).min(1, "请上传头像 / Please upload avatar"),
  attachments: z.array(z.object({ uid: z.string(), name: z.string() })).optional(),
})

type FormValues = z.infer<typeof schema>

export default function UploadExample() {
  const [basicFiles, setBasicFiles] = React.useState<FileItem[]>([])
  const [dragFiles, setDragFiles] = React.useState<FileItem[]>([])

  // Use basicFiles and dragFiles to display the uploaded files
  React.useEffect(() => {
    console.log("Basic Files:", basicFiles);
  }, [basicFiles]);

  React.useEffect(() => {
    console.log("Drag Files:", dragFiles);
  }, [dragFiles]);
  const [multipleFiles, setMultipleFiles] = React.useState<FileItem[]>([])
  // const [uploadingFiles, setUploadingFiles] = React.useState<FileItem[]>([])
  const [limitedFiles, setLimitedFiles] = React.useState<FileItem[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { avatar: [], attachments: [] },
  })

  // 模拟上传进度
  const simulateUpload = (fileList: FileItem[], setFiles: (files: FileItem[]) => void) => {
    const updated = fileList.map((f) => ({ ...f, status: "uploading" as const, percent: 0 }))
    setFiles(updated)

    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        setFiles(
          updated.map((f) => ({
            ...f,
            status: "done" as const,
            percent: 100,
          }))
        )
        toast.success("上传成功 / Upload successful")
      } else {
        setFiles(
          updated.map((f) => ({
            ...f,
            percent: Math.round(progress),
          }))
        )
      }
    }, 500)
  }

  const handleBasicUpload = (files: FileItem[]) => {
    setBasicFiles(files)
    if (files.length > 0) {
      simulateUpload(files, setBasicFiles)
    }
  }

  const handleDragUpload = (files: FileItem[]) => {
    setDragFiles(files)
    if (files.length > 0) {
      simulateUpload(files, setDragFiles)
    }
  }

  const handleMultipleUpload = (files: FileItem[]) => {
    setMultipleFiles(files)
    if (files.length > 0) {
      simulateUpload(files, setMultipleFiles)
    }
  }

  const handleLimitedUpload = (files: FileItem[]) => {
    setLimitedFiles(files)
    if (files.length > 0) {
      simulateUpload(files, setLimitedFiles)
    }
  }

  async function onSubmit(data: FormValues) {
    await new Promise((r) => setTimeout(r, 600))
    toast.success("已保存 / Saved")
    console.log(data)
  }

  return (
    <div className="space-y-10 p-8 max-w-6xl mx-auto">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Upload / 文件上传</h1>
        <p className="text-muted-foreground mt-2">
          覆盖：基础上传、拖拽上传、多文件、文件限制、表单集成等常见场景。
        </p>
      </div>

      {/* 1. 基础上传 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">基础上传 / Basic Upload</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">选择单个文件 / Select Single File</Label>
          <Upload
            onChange={handleBasicUpload}
            accept=".pdf,.doc,.docx,.txt"
          />
        </div>
      </section>

      {/* 2. 拖拽上传 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">拖拽上传 / Drag & Drop</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">拖拽文件或点击选择 / Drag or click</Label>
          <Upload
            drag
            onChange={handleDragUpload}
            accept="*"
          />
        </div>
      </section>

      {/* 3. 多文件上传 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">多文件上传 / Multiple Files</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">支持同时上传多个文件 / Multiple files supported</Label>
          <Upload
            multiple
            drag
            onChange={handleMultipleUpload}
            accept="image/*,.pdf"
          />
          <p className="text-xs text-muted-foreground mt-3">
            已选择 {multipleFiles.length} 个文件
          </p>
        </div>
      </section>

      {/* 4. 文件限制 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">文件限制 / File Limits</h2>
        <div className="bg-card p-6 rounded-lg border space-y-4">
          <div>
            <Label className="mb-3 block">最多 3 个文件，每个最大 2MB</Label>
            <Upload
              multiple
              maxCount={3}
              maxSize={2 * 1024 * 1024}
              onChange={handleLimitedUpload}
              accept="image/*,.pdf"
            />
          </div>

          <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
            <p>• 最大文件数: 3</p>
            <p>• 最大文件大小: 2MB</p>
            <p>• 已上传: {limitedFiles.length}/3</p>
          </div>
        </div>
      </section>

      {/* 5. 图片上传 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">图片上传 / Image Upload</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">仅支持图片格式 / Image files only</Label>
          <Upload
            drag
            accept="image/*"
            maxSize={5 * 1024 * 1024}
            onChange={(files) => {
              if (files.length > 0) {
                simulateUpload(files, (updated) => {
                  // Use the updated variable to log or handle the updated files
                  console.log("Updated Files:", updated)
                  // 显示预览
                  toast.success(`已上传 ${files[0].name}`)
                })
              }
            }}
          />
        </div>
      </section>

      {/* 6. 禁用状态 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">禁用状态 / Disabled State</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Label className="mb-3 block">禁用的上传器 / Disabled uploader</Label>
          <Upload disabled accept="*" />
        </div>
      </section>

      {/* 7. 表单集成 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">表单集成 / Form Integration</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>上传头像 / Upload Avatar</FormLabel>
                    <FormControl>
                      <Upload
                        accept="image/*"
                        maxSize={5 * 1024 * 1024}
                        onChange={(files) => {
                          field.onChange(
                            files.map((f) => ({
                              uid: f.uid,
                              name: f.name,
                            }))
                          )
                          if (files.length > 0) {
                            simulateUpload(files, () => {})
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      支持 JPG、PNG 格式，最大 5MB
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attachments"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>附件上传（可选）/ Upload Attachments</FormLabel>
                    <FormControl>
                      <Upload
                        multiple
                        drag
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        maxCount={5}
                        onChange={(files) => {
                          field.onChange(
                            files.map((f) => ({
                              uid: f.uid,
                              name: f.name,
                            }))
                          )
                          if (files.length > 0) {
                            simulateUpload(files, () => {})
                          }
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      支持 PDF、Word、Excel，最多 5 个文件
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
    </div>
  )
}
