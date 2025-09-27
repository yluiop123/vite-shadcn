import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { LucideIcon } from "lucide-react"
import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

interface FloatingButtonProps {
  icon?: LucideIcon
  size?: "sm" | "md" | "lg"
  preset?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right"
    | "left-center"
    | "right-center"
  badgeCount?: number
  scrollToTop?: boolean
  group?: {
    icon: LucideIcon
    onClick: () => void
    badgeCount?: number
  }[]
  onClick?: () => void
}

export default function FloatingButton({
  icon,
  size = "md",
  preset = "bottom-right",
  badgeCount,
  scrollToTop,
  group,
  onClick,
}: FloatingButtonProps) {
  const [visible, setVisible] = useState(!scrollToTop)
  const [open, setOpen] = useState(false)

  // 回到顶部逻辑
  useEffect(() => {
    if (!scrollToTop) return
    const handler = () => setVisible(window.scrollY > 200)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [scrollToTop])

  const iconSize = size === "sm" ? 16 : size === "md" ? 24 : 28
  const padding = size === "sm" ? "p-2" : size === "md" ? "p-3" : "p-4"

  // 位置 & 容器样式
  let containerClass = "fixed flex flex-col gap-2 z-50"
  let presetStyle: React.CSSProperties = {}

  switch (preset) {
    case "top-left":
      presetStyle = { top: 24, left: 24 }
      containerClass += " items-start"
      break
    case "top-center":
      presetStyle = { top: 24, left: "50%", transform: "translateX(-50%)" } // ✅ 居中
      containerClass += " items-center"
      break
    case "top-right":
      presetStyle = { top: 24, right: 24 }
      containerClass += " items-end"
      break
    case "bottom-left":
      presetStyle = { bottom: 24, left: 24 }
      containerClass += " items-start"
      break
    case "bottom-center":
      presetStyle = { bottom: 24, left: "50%", transform: "translateX(-50%)" } // ✅ 居中
      containerClass += " items-center"
      break
    case "bottom-right":
      presetStyle = { bottom: 24, right: 24 }
      containerClass += " items-end"
      break
    case "left-center":
      presetStyle = { top: "50%", left: 24, transform: "translateY(-50%)" }
      containerClass += " items-start"
      break
    case "right-center":
      presetStyle = { top: "50%", right: 24, transform: "translateY(-50%)" }
      containerClass += " items-end"
      break
  }

  const IconComponent = icon

  return (
    <div style={presetStyle} className={containerClass}>
      {/* 按钮组 */}
      {open &&
        group &&
        group.map((item, i) => (
          <div key={i} className="relative">
            <Button
              variant="default"
              size="icon"
              className={`rounded-full shadow-lg ${padding}`}
              onClick={item.onClick}
            >
              <item.icon size={iconSize} />
            </Button>
            {item.badgeCount ? (
              <Badge className="absolute -top-1 -right-1 px-1.5 py-0 text-xs rounded-full">
                {item.badgeCount}
              </Badge>
            ) : null}
          </div>
        ))}

      {/* 主按钮 */}
      {visible && (
        <div className="relative">
          <Button
            variant="default"
            size="icon"
            className={`rounded-full shadow-lg ${padding}`}
            onClick={() => {
              if (scrollToTop) {
                window.scrollTo({ top: 0, behavior: "smooth" })
              } else if (group) {
                setOpen(!open)
              } else {
                onClick?.()
              }
            }}
          >
            {scrollToTop ? (
              <ArrowUp size={iconSize} />
            ) : (
              IconComponent && <IconComponent size={iconSize} />
            )}
          </Button>
          {badgeCount ? (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0 text-xs rounded-full">
              {badgeCount}
            </Badge>
          ) : null}
        </div>
      )}
    </div>
  )
}
