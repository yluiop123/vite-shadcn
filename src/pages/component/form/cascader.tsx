// src/pages/component/form/cascader.tsx
import { Cascader, CascaderOption } from "@/components/ext/cascader";
import { useState } from "react";

const OPTIONS: CascaderOption[] = [
  {
    value: "clothes",
    label: "服装",
    children: [
      { value: "mens", label: "男装", children: [{ value: "tshirt", label: "T恤" }, { value: "suit", label: "西装" }] },
      { value: "womens", label: "女装", children: [{ value: "dress", label: "连衣裙" }] },
    ],
  },
  {
    value: "food",
    label: "食物",
    children: [
      { value: "fruit", label: "水果", children: [{ value: "apple", label: "苹果" }, { value: "banana", label: "香蕉" }] },
      { value: "vegetables", label: "蔬菜", children: [{ value: "carrot", label: "胡萝卜" }, { value: "broccoli", label: "西兰花" }] },
    ],
  },
  {
    value: "electronics",
    label: "电子产品",
    children: [
      { 
        value: "mobile", 
        label: "手机", 
        children: [
          { value: "iphone", label: "iPhone" }, 
          { value: "android", label: "Android" }
        ] 
      },
      { 
        value: "computers", 
        label: "电脑", 
        children: [
          { value: "laptop", label: "笔记本" }, 
          { value: "desktop", label: "台式机" }
        ] 
      },
    ],
  },
];

export default function CascaderDemo() {
  const [singleValue, setSingleValue] = useState<string[]>([]);
  const [multiValue, setMultiValue] = useState<string[][]>([]);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">单选级联选择器</h3>
        <Cascader
          options={OPTIONS}
          value={singleValue}
          onChange={(val) => setSingleValue(val as string[])}
          placeholder="请选择分类..."
        />
        <p className="mt-2 text-sm text-gray-500">
          当前选中值: {singleValue.length > 0 ? singleValue.join(' / ') : '未选择'}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">多选级联选择器</h3>
        <Cascader
          options={OPTIONS}
          value={multiValue}
          onChange={(val) => setMultiValue(val as string[][])}
          multiple={true}
          placeholder="请选择多个分类..."
        />
        <p className="mt-2 text-sm text-gray-500">
          当前选中值: {multiValue.length > 0 
            ? multiValue.map(v => v[v.length - 1]).join(', ') 
            : '未选择'}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">禁用状态级联选择器</h3>
        <Cascader
          options={OPTIONS}
          value={singleValue}
          onChange={() => {}}
          placeholder="此为禁用状态"
          disabled={true}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">带自定义类名的级联选择器</h3>
        <Cascader
          options={OPTIONS}
          value={singleValue}
          onChange={(val) => setSingleValue(val as string[])}
          placeholder="自定义样式..."
          className="border-2 border-purple-500 rounded-lg"
        />
      </div>
    </div>
  );
}