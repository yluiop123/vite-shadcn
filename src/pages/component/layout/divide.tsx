import { Divider } from "@/components/ext/divider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DividerPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Divider 分割线 / Divider Component</h1>
      <p className="text-lg text-muted-foreground">
        Divider 组件用于分割不同区域的内容，提供视觉上的分隔效果。
        <span className="block mt-1 text-sm">
          The Divider component is used to separate different content areas, providing visual separation effects.
        </span>
      </p>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>基础分割线 / Basic Divider</CardTitle>
          <CardDescription>
            最简单的分割线，用于分隔内容区域
            <span className="block mt-1">Simplest divider for separating content areas</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              最简单的分割线，用于分隔内容区域。
              <span className="block mt-1">Simplest divider for separating content areas.</span>
            </p>
            <Divider />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>虚线分割线 / Dashed Divider</CardTitle>
          <CardDescription>
            使用虚线样式的分割线
            <span className="block mt-1">Divider with dashed line style</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              使用虚线样式的分割线。
              <span className="block mt-1">Divider with dashed line style.</span>
            </p>
            <Divider dashed />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>带文字的分割线 / Divider with Text</CardTitle>
          <CardDescription>
            在分割线上显示文字说明
            <span className="block mt-1">Display text description on the divider</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">居中文字 / Center Text</h3>
              <Divider>居中标题 / Center Title</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">左对齐文字 / Left Text</h3>
              <Divider orientation="left">左边标题 / Left Title</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">右对齐文字 / Right Text</h3>
              <Divider orientation="right">右边标题 / Right Title</Divider>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>垂直分割线 / Vertical Divider</CardTitle>
          <CardDescription>
            用于行内元素之间的垂直分隔
            <span className="block mt-1">Used for vertical separation between inline elements</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              用于行内元素之间的垂直分隔。
              <span className="block mt-1">Used for vertical separation between inline elements.</span>
            </p>
            <div className="flex items-center gap-4">
              <span className="text-sm">内容A / Item A</span>
              <Divider type="vertical" />
              <span className="text-sm">内容B / Item B</span>
              <Divider type="vertical" />
              <span className="text-sm">内容C / Item C</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>分割线尺寸 / Divider Sizes</CardTitle>
          <CardDescription>
            不同尺寸的分割线，适用于不同的场景
            <span className="block mt-1">Different sized dividers for various scenarios</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">小尺寸 (sm) / Small Size (sm)</h3>
              <Divider size="sm">sm</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">中尺寸 (md) / Medium Size (md)</h3>
              <Divider size="md">md</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">大尺寸 (lg) / Large Size (lg)</h3>
              <Divider size="lg">lg</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">特大尺寸 (xl) / Extra Large (xl)</h3>
              <Divider size="xl">xl</Divider>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>分割线颜色 / Divider Colors</CardTitle>
          <CardDescription>
            自定义分割线颜色，以适应不同主题
            <span className="block mt-1">Custom divider colors to adapt to different themes</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">红色分割线 / Red Divider</h3>
              <Divider size="sm" color="border-red-500">red</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">绿色分割线 / Green Divider</h3>
              <Divider size="md" color="border-green-500">green</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">蓝色分割线 / Blue Divider</h3>
              <Divider size="lg" color="border-blue-500">blue</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">自定义颜色 / Custom Color</h3>
              <Divider size="md" color="border-purple-500">purple</Divider>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>文字颜色 / Text Colors</CardTitle>
          <CardDescription>
            自定义分割线中文字的颜色
            <span className="block mt-1">Custom text colors on the divider</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">红色文字 / Red Text</h3>
              <Divider size="sm" textClassName="text-red-500">red</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">绿色文字 / Green Text</h3>
              <Divider size="md" textClassName="text-green-500">green</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">蓝色文字 / Blue Text</h3>
              <Divider size="lg" textClassName="text-blue-500">blue</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">自定义文字颜色 / Custom Text Color</h3>
              <Divider size="md" textClassName="text-purple-600">purple</Divider>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>自定义长度 / Custom Length</CardTitle>
          <CardDescription>
            通过 length 属性设置分割线的长度
            <span className="block mt-1">Set divider length using the length property</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">固定像素宽度 / Fixed Pixel Width</h3>
              <Divider length={200}>200px</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">百分比宽度 / Percentage Width</h3>
              <Divider length="50%">50%</Divider>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">相对单位宽度 / Relative Unit Width</h3>
              <Divider length="75%">75%</Divider>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>实际应用场景 / Practical Use Cases</CardTitle>
          <CardDescription>
            Divider 组件在实际应用中的典型场景
            <span className="block mt-1">Typical scenarios for Divider component in practical applications</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="font-medium mb-3">表单分组 / Form Grouping</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">用户名 / Username</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded" 
                    placeholder="输入用户名 / Enter username"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">邮箱 / Email</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border rounded" 
                    placeholder="输入邮箱 / Enter email"
                  />
                </div>
                <Divider>账户信息 / Account Information</Divider>
                <div>
                  <label className="block text-sm font-medium mb-1">密码 / Password</label>
                  <input 
                    type="password" 
                    className="w-full p-2 border rounded" 
                    placeholder="输入密码 / Enter password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">确认密码 / Confirm Password</label>
                  <input 
                    type="password" 
                    className="w-full p-2 border rounded" 
                    placeholder="确认密码 / Confirm password"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3">内容分段 / Content Segmentation</h3>
              <div className="space-y-3">
                <p>
                  这是一段关于产品功能的描述。它提供了详细的介绍和说明，帮助用户更好地理解产品的特点。
                  <span className="block mt-1">This is a description of product features. It provides detailed introduction and explanation to help users better understand the product's characteristics.</span>
                </p>
                <Divider dashed>产品特色 / Product Features</Divider>
                <p>
                  这是另一段关于产品优势的说明。它突出了产品的核心竞争力和独特价值，让用户了解到为什么选择我们的产品。
                  <span className="block mt-1">This is another explanation about product advantages. It highlights the product's core competitiveness and unique value, letting users understand why to choose our product.</span>
                </p>
                <Divider orientation="left">客户评价 / Customer Reviews</Divider>
                <p>
                  这里是客户的正面反馈和评价，展示了产品在实际使用中的表现和用户的满意度。
                  <span className="block mt-1">Here are positive feedback and reviews from customers, showcasing the product's performance in actual use and user satisfaction.</span>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}