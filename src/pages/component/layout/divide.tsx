import { Divider } from "@/components/ext/divider"

export default function DividerPage() {
  return (
    <div className="space-y-6 p-20">
      {/* 基础分割线 */}
      <h2 className="text-2xl font-bold">Base Divider 基础分割线</h2>
      <Divider />

      {/* 虚线 */}
      <h2 className="text-2xl font-bold">Dashed Divider 虚线分割线</h2>
      <Divider dashed />

      {/* 带文字 */}
      <h2 className="text-2xl font-bold">居中标题 Centered Title</h2>
      <Divider>居中标题</Divider>

      {/* 左对齐 */}
      <h2 className="text-2xl font-bold">左边标题 Left Aligned Title</h2>
      <Divider orientation="left">左边标题</Divider>

      {/* 右对齐 */}
      <h2 className="text-2xl font-bold">右边标题 Right Aligned Title</h2>
      <Divider orientation="right">右边标题</Divider>

      {/* 垂直分割线 */}
      <h2 className="text-2xl font-bold">Vertical Divider 垂直分割线</h2>
      <div className="flex items-center space-x-4">
        <span>内容A</span>
        <Divider type="vertical" />
        <span>内容B</span>
        <Divider type="vertical" />
        <span>内容C</span>
      </div>
      <h2 className="text-2xl font-bold">Size 分割线大小</h2>
      <Divider size="sm">sm</Divider>
      <Divider size="md">md</Divider>
      <Divider size="lg">lg</Divider>
      <Divider size="xl">xl</Divider>
      <h2 className="text-2xl font-bold">Color 分割线颜色</h2>
      <Divider size="sm" color="border-red-500" >red</Divider>
      <Divider size="md" color="border-green-500">green</Divider>
      <Divider size="lg" color="border-blue-500">blue</Divider>
      <h2 className="text-2xl font-bold">Text Color 分割线文字颜色</h2>
      <Divider size="sm" textClassName="text-red-500">red</Divider>
      <Divider size="md"  textClassName="text-green-500">green</Divider>
      <Divider size="lg" textClassName="text-blue-500">blue</Divider>
    </div>
  )
}
