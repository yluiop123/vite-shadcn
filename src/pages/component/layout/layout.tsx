import { Content, Footer, Header, Layout, Sider } from "@/components/ext/layout";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Header className="bg-blue-500 text-white flex items-center justify-between">
        我的应用
      </Header>

      <div className="flex flex-1">
        <Sider
          collapsed={collapsed}
          onToggle={() => 
            { setCollapsed(!collapsed)}}
          collapseIcon={<ChevronLeft size={20} />}
          expandIcon={<ChevronRight size={20} />}
          iconPosition="top-right" // 可选: top-left | top-right | bottom-left | bottom-right
          className="bg-gray-200"
        >
          <div className="space-y-2">
            <Button variant="ghost" className="w-full">
              首页
            </Button>
            <Button variant="ghost" className="w-full">
              用户管理
            </Button>
            <Button variant="ghost" className="w-full">
              设置
            </Button>
          </div>
        </Sider>

        <Content>
          <h1 className="text-2xl font-bold mb-4">Sider 折叠图标四角位置</h1>
          <p>折叠/展开图标可以放在四个角，通过 iconPosition 设置。</p>
        </Content>
      </div>

      <Footer className="bg-blue-500 text-white">© 2025 MyApp</Footer>
    </Layout>
  );
}
