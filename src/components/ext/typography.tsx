import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Check, Copy, Edit } from "lucide-react"
import * as React from "react"

// ----------------- Title -----------------
export function Title({
  level = 1,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & { level?: 1 | 2 | 3 | 4 | 5 }) {
  const Tag: React.ElementType = `h${level}`
  const sizes: Record<number, string> = {
    1: "text-4xl font-bold",
    2: "text-3xl font-semibold",
    3: "text-2xl font-semibold",
    4: "text-xl font-medium",
    5: "text-lg font-medium",
  }
  return (
    <Tag className={cn(sizes[level], className)} {...props}>
      {children}
    </Tag>
  )
}

// ----------------- Paragraph -----------------
export function Paragraph({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-base leading-7 text-muted-foreground", className)} {...props}>
      {children}
    </p>
  )
}

// ----------------- Text -----------------
export interface EllipsisProps {
  rows?: number
  expandable?: boolean
  expanded?: boolean
  onExpand?: (expanded: boolean) => void
  type?: "end" | "middle" | "start"
  expandNode?: React.ReactNode
  collapseNode?: React.ReactNode
  expandText?: string
  collapseText?: string
}

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  strong?: boolean
  underline?: boolean
  delete?: boolean
  code?: boolean
  italic?: boolean
  copyable?: boolean
  copyIcon?: React.ReactNode
  copiedIcon?: React.ReactNode
  editable?: boolean
  ellipsis?: boolean | EllipsisProps
  children?: React.ReactNode
  copyTip?: string
  copiedTip?: string
  editTip?: string
}

export function Text({
  as: As = "span",
  strong,
  underline,
  delete: del,
  code,
  italic,
  copyable,
  copyIcon,
  copiedIcon,
  editable,
  ellipsis,
  className,
  children,
  copyTip,
  copiedTip,
  editTip,
  ...props
}: TextProps) {
  const isChildString = typeof children === "string"
  const initialValue = isChildString ? (children as string) : ""
  const [value, setValue] = React.useState(initialValue)
  const originalValueRef = React.useRef(initialValue)
  const [editing, setEditing] = React.useState(false)
  const [internalExpanded, setInternalExpanded] = React.useState(false)
  const [copied, setCopied] = React.useState(false)
  const spanRef = React.useRef<HTMLSpanElement>(null)
  const [maxHeight, setMaxHeight] = React.useState<string | undefined>()

  const ellipsisObj: EllipsisProps | undefined = typeof ellipsis === "object" ? ellipsis : undefined

  const isExpanded = ellipsisObj?.expanded !== undefined ? ellipsisObj.expanded : internalExpanded

  // ----------------- 行高折叠逻辑 -----------------
  React.useEffect(() => {
    if (!spanRef.current) return
    const lineHeight = parseFloat(getComputedStyle(spanRef.current).lineHeight)
    if (!isExpanded && ellipsisObj?.rows) {
      setMaxHeight(`${lineHeight * ellipsisObj.rows}px`)
    } else {
      setMaxHeight(`${spanRef.current.scrollHeight}px`)
    }
  }, [isExpanded, ellipsisObj?.rows, value])

  const handleExpand = () => {
    if (!ellipsisObj) return
    if (ellipsisObj.onExpand) ellipsisObj.onExpand(!isExpanded)
    else setInternalExpanded(!isExpanded)
  }

  const handleCopy = async () => {
    if (!isChildString) return
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (e) {
      // ignore
    }
  }

  const renderEllipsisContent = () => {
    const text = isChildString ? (children as string) : String(children ?? "")
    if (!ellipsisObj) return text
    if (isExpanded) return text
    const { type = "end" } = ellipsisObj
    switch (type) {
      case "middle": {
        const head = text.slice(0, 15)
        const tail = text.slice(-15)
        return `${head}...${tail}`
      }
      case "start": {
        const tail = text.slice(-30)
        return `...${tail}`
      }
      case "end":
      default:
        return text
    }
  }

  const renderExpandBtn = () => {
    if (!ellipsisObj?.expandable) return null
    const content = isExpanded ? ellipsisObj.collapseNode ?? <span className="text-primary font-medium">{ellipsisObj.collapseText ?? "收起"}</span> : ellipsisObj.expandNode ?? <span className="text-primary font-medium">{ellipsisObj.expandText ?? "展开"}</span>
    return (
      <div className="mt-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleExpand} className="hover:underline">
                {content}
              </button>
            </TooltipTrigger>
            <TooltipContent>{isExpanded ? "收起" : "展开"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    )
  }

  let base = "text-base inline-flex items-center gap-2"
  if (strong) base += " font-semibold"
  if (underline) base += " underline"
  if (del) base += " line-through text-muted-foreground"
  if (italic) base += " italic"
  if (code) base += " px-1 py-0.5 rounded bg-muted font-mono text-sm"

  const singleLineEllipsis = ellipsisObj?.rows === 1 && !isExpanded

  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {/* 文本 + 功能按钮同一行 */}
      {editing ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter") (e.target as HTMLInputElement).blur()
            if (e.key === "Escape") {
              setValue(originalValueRef.current)
              setEditing(false)
            }
          }}
          aria-label={editTip ?? "编辑文本"}
          className={cn(base, "border px-1 py-0.5 rounded text-sm")}
        />
      ) : (
        <As className={base}>
          <span
            ref={spanRef}
            style={{
              maxHeight,
              overflow: "hidden",
              display: "inline-block",
              transition: "max-height 0.3s ease",
              verticalAlign: "middle",
              ...(singleLineEllipsis ? { whiteSpace: "nowrap", textOverflow: "ellipsis" } : {}),
            }}
          >
            {renderEllipsisContent()}
          </span>

          {copyable && isChildString && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button aria-label={copyTip ?? "复制"} onClick={handleCopy} className="text-muted-foreground hover:text-primary">
                    {copied ? copiedIcon ?? <Check size={14} className="text-green-500" /> : copyIcon ?? <Copy size={14} />}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{copied ? copiedTip ?? "已复制" : copyTip ?? "复制"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {editable && !editing && isChildString && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button aria-label={editTip ?? "编辑"} title="edit" onClick={() => {
                    originalValueRef.current = value
                    setEditing(true)
                  }} className="text-muted-foreground hover:text-primary">
                    <Edit size={14} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>{editTip ?? "编辑"}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </As>
      )}

      {/* 无障碍提示：复制状态 */}
      <div aria-live="polite" className="sr-only">
        {copied ? copiedTip ?? "已复制" : ""}
      </div>

      {/* 折叠/展开按钮独占一行 */}
      {renderExpandBtn()}
    </div>
  )
}

// ----------------- Typography Root -----------------
interface TypographyComponent extends React.FC<{ children: React.ReactNode }> {
  Title: typeof Title
  Paragraph: typeof Paragraph
  Text: typeof Text
}

export const Typography = Object.assign(
  function Typography({ children }: { children: React.ReactNode }) {
    return <div className="space-y-2">{children}</div>
  },
  { Title, Paragraph, Text }
) as TypographyComponent
