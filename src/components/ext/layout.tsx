import { ReactNode } from "react";

interface LayoutChildProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children }: { children: ReactNode }) {
  return <div className="flex flex-col min-h-screen">{children}</div>;
}

export function Header({ children, className = "" }: LayoutChildProps) {
  return <header className={`h-16 flex items-center px-4 shadow-md ${className}`}>{children}</header>;
}

export function Footer({ children, className = "" }: LayoutChildProps) {
  return <footer className={`text-center p-4 ${className}`}>{children}</footer>;
}

// Sider（四角折叠图标 + 点击可用）
interface SiderProps extends LayoutChildProps {
  collapsed: boolean;
  onToggle: () => void;
  collapseIcon?: ReactNode;
  expandIcon?: ReactNode;
  iconPosition?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

export function Sider({
  children,
  collapsed,
  onToggle,
  collapseIcon,
  expandIcon,
  iconPosition = "top-left",
  className = "",
}: SiderProps) {
  const icon = collapsed ? expandIcon : collapseIcon;

  // 用 flex 布局控制图标位置，保证折叠状态也能点击
  const iconContainerClass = (() => {
    switch (iconPosition) {
      case "top-left":
        return "justify-start items-start";
      case "top-right":
        return "justify-end items-start";
      case "bottom-left":
        return "justify-start items-end";
      case "bottom-right":
        return "justify-end items-end";
      default:
        return "justify-start items-start";
    }
  })();

  return (
    <aside
      className={`flex flex-col relative bg-gray-50 border-r transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      } ${className}`}
    >
      <div
        className={`flex ${iconContainerClass} p-2 cursor-pointer z-10`}
        onClick={onToggle}
      >
        {icon}
      </div>

      <div className="flex-1 overflow-hidden transition-all duration-300 px-2">
        <div className={`${collapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}>
          {children}
        </div>
      </div>
    </aside>
  );
}

export function Content({ children, className = "" }: LayoutChildProps) {
  return <main className={`flex-1 p-6 ${className}`}>{children}</main>;
}
