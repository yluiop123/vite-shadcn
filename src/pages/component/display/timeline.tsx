// src/pages/component/display/timeline.tsx
import Timeline from "@/components/ext/timeline";
import { Clock, MapPin, Star } from "lucide-react";

const TimelineDemo = () => {
  const timelineEvents = [
    {
      id: "1",
      title: "Project Started / 项目启动",
      description: "确定项目需求和范围，组建开发团队 / Define project requirements and scope, form development team",
      date: "2024-01-15",
      icon: Star,
      status: 'success' as const
    },
    {
      id: "2",
      title: "Design Phase / 设计阶段",
      description: "UI/UX 设计完成，原型评审通过 / UI/UX design completed, prototype review passed",
      date: "2024-02-01",
      icon: MapPin,
      status: 'success' as const
    },
    {
      id: "3",
      title: "Development Started / 开发开始",
      description: "前端和后端开发同步进行 / Frontend and backend development proceed simultaneously",
      date: "2024-02-20",
      icon: Clock,
      status: 'process' as const
    },
    {
      id: "4",
      title: "Testing Phase / 测试阶段",
      description: "功能测试、性能测试和安全测试 / Functional, performance and security testing",
      date: "2024-04-05",
      status: 'pending' as const
    },
    {
      id: "5",
      title: "Release / 发布",
      description: "产品正式上线，向用户开放使用 / Product officially launched, open for user access",
      date: "2024-05-10",
      status: 'pending' as const
    }
  ];

  return (
    <div className="space-y-10 p-8 max-w-4xl mx-auto">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold">Timeline / 时间线</h1>
        <p className="text-muted-foreground mt-2">
          展示一系列按时间顺序排列的事件或步骤 / Display a series of events or steps arranged in chronological order.
        </p>
      </div>

      {/* 基础时间线 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Basic Timeline / 基础时间线</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Timeline items={timelineEvents.filter(item => item.id !== "5")} />
        </div>
      </section>

      {/* 带图标的事件 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Icons / 带图标的时间线</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Timeline 
            items={[
              {
                id: "icon-1",
                title: "Event with Icon / 带图标的事件",
                description: "This event has a custom icon / 此事件带有自定义图标",
                date: "2024-01-01",
                icon: Star,
                status: 'success'
              },
              {
                id: "icon-2",
                title: "Another Event / 另一个事件",
                description: "This event also has an icon / 此事件也有图标",
                date: "2024-01-15",
                icon: Clock,
                status: 'process'
              }
            ]} 
          />
        </div>
      </section>

      {/* 不同模式的时间线 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Alternate Mode / 交替模式</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Timeline 
            mode="alternate"
            items={[
              {
                id: "alt-1",
                title: "Left Event / 左侧事件",
                description: "This event appears on the left / 此事件出现在左侧",
                date: "2024-01-01",
                status: 'success'
              },
              {
                id: "alt-2",
                title: "Right Event / 右侧事件",
                description: "This event appears on the right / 此事件出现在右侧",
                date: "2024-01-15",
                status: 'process'
              },
              {
                id: "alt-3",
                title: "Left Event Again / 再次左侧事件",
                description: "Back to the left / 回到左侧",
                date: "2024-02-01",
                status: 'pending'
              }
            ]} 
          />
        </div>
      </section>

      {/* 状态时间线 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Status Timeline / 状态时间线</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Timeline 
            items={[
              {
                id: "status-1",
                title: "Success Status / 成功状态",
                description: "This event has success status / 此事件具有成功状态",
                date: "2024-01-01",
                status: 'success'
              },
              {
                id: "status-2",
                title: "Process Status / 进行中状态",
                description: "This event is in progress / 此事件正在进行中",
                date: "2024-01-15",
                status: 'process'
              },
              {
                id: "status-3",
                title: "Pending Status / 待处理状态",
                description: "This event is pending / 此事件待处理",
                date: "2024-02-01",
                status: 'pending'
              },
              {
                id: "status-4",
                title: "Error Status / 错误状态",
                description: "This event has error status / 此事件具有错误状态",
                date: "2024-02-15",
                status: 'error'
              }
            ]} 
          />
        </div>
      </section>

      {/* 挂起时间线 */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Pending Timeline / 挂起时间线</h2>
        <div className="bg-card p-6 rounded-lg border">
          <Timeline 
            items={[
              {
                id: "pending-1",
                title: "Completed / 已完成",
                description: "Previous step completed / 上一步已完成",
                date: "2024-01-01",
                status: 'success'
              },
              {
                id: "pending-2",
                title: "In Progress / 进行中",
                description: "Current step in progress / 当前步骤进行中",
                date: "2024-01-15",
                status: 'process'
              }
            ]}
            pending={true}
            pendingDot={<div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />}
          />
        </div>
      </section>
    </div>
  );
};

export default TimelineDemo;