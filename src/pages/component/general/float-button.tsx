import FloatingButton from "@/components/ext/float-button";
import { Edit, Plus, Trash } from "lucide-react";

export default function FloatButtonPage() {
  return (
    <div className="h-[2000px] bg-gray-50 p-6 w-full">
      <p className="mb-96">页面内容很长，可以滚动</p>

      {/* 回到顶部按钮 */}
      <FloatingButton scrollToTop preset="bottom-center" />

      {/* 按钮组示例 */}
      <FloatingButton
        icon={Plus}
        size="lg"
        preset="bottom-right"
        group={[
          { icon: Edit, onClick: () => alert("编辑"), badgeCount: 2 },
          { icon: Trash, onClick: () => alert("删除"), badgeCount: 5 },
        ]}
      />
    </div>
  );
}
