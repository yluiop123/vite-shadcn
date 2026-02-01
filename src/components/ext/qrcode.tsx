"use client"

import { cn } from "@/lib/utils"
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react"
import * as React from "react"

// 定义基础 Props，直接复用 qrcode.react 的部分类型定义
interface QRCodeProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  size?: number
  bgColor?: string
  fgColor?: string
  level?: "L" | "M" | "Q" | "H"
  includeMargin?: boolean
  // 新版本通过组件名区分，这里我们保留 renderAs 逻辑用于内部判断
  renderAs?: "svg" | "canvas"
  imageSettings?: {
    src: string
    x?: number
    y?: number
    height?: number
    width?: number
    excavate?: boolean
  }
}

const QRCodeComponent = React.forwardRef<HTMLDivElement, QRCodeProps>(
  (
    {
      value = "",
      size = 128,
      bgColor = "#ffffff",
      fgColor = "#000000",
      level = "M",
      includeMargin = false,
      renderAs = "svg",
      imageSettings,
      className,
      ...props
    },
    ref
  ) => {
    // 统一 Props 传递
    const qrProps = {
      value,
      size,
      bgColor,
      fgColor,
      level,
      includeMargin,
      imageSettings,
    }

    return (
      <div ref={ref} className={cn("inline-block bg-white p-1", className)} {...props}>
        {renderAs === "svg" ? (
          <QRCodeSVG {...qrProps} />
        ) : (
          <QRCodeCanvas {...qrProps} />
        )}
      </div>
    )
  }
)
QRCodeComponent.displayName = "QRCode"

export { QRCodeComponent as QRCode }
