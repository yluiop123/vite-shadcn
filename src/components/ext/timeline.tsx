// src/components/ext/timeline.tsx
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

export type TimelineItem = {
  id: string;
  title: string;
  description?: string;
  date?: string;
  icon?: LucideIcon;
  status?: 'pending' | 'process' | 'success' | 'error';
  dotColor?: string;
};

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItem[];
  mode?: 'left' | 'right' | 'alternate';
  pending?: boolean;
  pendingDot?: React.ReactNode;
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({
  items,
  mode = 'left',
  pending = false,
  pendingDot,
  className,
  ...props
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'text-green-500';
      case 'error': return 'text-red-500';
      case 'process': return 'text-blue-500';
      case 'pending': return 'text-gray-400';
      default: return 'text-blue-500';
    }
  };

  const getBgStatusColor = (status?: string) => {
    switch (status) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      case 'process': return 'bg-blue-500';
      case 'pending': return 'bg-gray-400';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className={cn("space-y-6", className)} {...props}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const showLeft = mode === 'left' || (mode === 'alternate' && index % 2 === 0);
        const IconComponent = item.icon;
        const statusColor = getStatusColor(item.status);
        const bgColor = getBgStatusColor(item.status);
        
        return (
          <div 
            key={item.id} 
            className={cn(
              "flex gap-4",
              !showLeft && "flex-row-reverse"
            )}
          >
            {/* 时间轴点 */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "p-2 rounded-full",
                `${statusColor.replace('text', 'bg')}/10`
              )}>
                {IconComponent ? (
                  <IconComponent className={`w-4 h-4 ${statusColor}`} />
                ) : (
                  <div className={cn("w-2 h-2 rounded-full", bgColor)} />
                )}
              </div>
              {!isLast && !pending ? (
                <div className="h-full w-0.5 bg-border my-2"></div>
              ) : pending && (
                <div className="h-full w-0.5 bg-border my-2"></div>
              )}
            </div>
            
            {/* 内容区域 */}
            <div className="flex-1 pb-8">
              <div className={cn(
                "bg-muted/50 p-4 rounded-lg",
                showLeft ? "mr-auto" : "ml-auto"
              )}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  {item.date && (
                    <span className="text-sm text-muted-foreground">{item.date}</span>
                  )}
                </div>
                {item.description && (
                  <p className="text-muted-foreground mt-2">{item.description}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
      
      {/* 挂起项目 */}
      {pending && (
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-full bg-gray-200/10">
              {pendingDot || <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />}
            </div>
          </div>
          <div className="flex-1 pb-8">
            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg text-muted-foreground">加载中 / Loading</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;