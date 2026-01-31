import { Divider } from "@/components/ext/divider"

export default function DividerPage() {
  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Divider 分割线</h1>
        <p className="text-gray-600 dark:text-gray-400">用于分割不同区域的线条组件</p>
      </div>

      {/* 基础分割线 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">基础分割线</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">最简单的分割线，用于分隔内容区域。</p>
        <Divider />
      </div>

      {/* 虚线分割线 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">虚线分割线</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">使用虚线样式的分割线。</p>
        <Divider dashed />
      </div>

      {/* 带文字的分割线 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">带文字的分割线</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">在分割线上显示文字说明。</p>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">居中文字：</p>
            <Divider>居中标题</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">左对齐文字：</p>
            <Divider orientation="left">左边标题</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">右对齐文字：</p>
            <Divider orientation="right">右边标题</Divider>
          </div>
        </div>
      </div>

      {/* 垂直分割线 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">垂直分割线</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">用于行内元素之间的垂直分隔。</p>
        <div className="flex items-center space-x-4">
          <span className="text-gray-700 dark:text-gray-300">内容A</span>
          <Divider type="vertical" />
          <span className="text-gray-700 dark:text-gray-300">内容B</span>
          <Divider type="vertical" />
          <span className="text-gray-700 dark:text-gray-300">内容C</span>
        </div>
      </div>

      {/* 分割线尺寸 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">分割线尺寸</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">不同尺寸的分割线，适用于不同的场景。</p>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">小尺寸 (sm)：</p>
            <Divider size="sm">sm</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">中尺寸 (md)：</p>
            <Divider size="md">md</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">大尺寸 (lg)：</p>
            <Divider size="lg">lg</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">特大尺寸 (xl)：</p>
            <Divider size="xl">xl</Divider>
          </div>
        </div>
      </div>

      {/* 分割线颜色 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">分割线颜色</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">自定义分割线颜色，以适应不同主题。</p>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">红色分割线：</p>
            <Divider size="sm" color="border-red-500">red</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">绿色分割线：</p>
            <Divider size="md" color="border-green-500">green</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">蓝色分割线：</p>
            <Divider size="lg" color="border-blue-500">blue</Divider>
          </div>
        </div>
      </div>

      {/* 文字颜色 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">文字颜色</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">自定义分割线中文字的颜色。</p>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">红色文字：</p>
            <Divider size="sm" textClassName="text-red-500">red</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">绿色文字：</p>
            <Divider size="md" textClassName="text-green-500">green</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">蓝色文字：</p>
            <Divider size="lg" textClassName="text-blue-500">blue</Divider>
          </div>
        </div>
      </div>

      {/* 自定义长度 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">自定义长度</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">通过 length 属性设置分割线的长度。</p>
        <div className="space-y-4">
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">设置宽度为 200px 的分割线：</p>
            <Divider length={200}>200px</Divider>
          </div>
          <div>
            <p className="mb-2 text-gray-600 dark:text-gray-400">设置宽度为 50% 的分割线：</p>
            <Divider length="50%">50%</Divider>
          </div>
        </div>
      </div>
    </div>
  )
}