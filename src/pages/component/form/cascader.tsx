"use client";

import { Cascader, CascaderOption } from "@/components/ext/cascader"; // 导入封装好的组件
import React from "react";

export default function CascaderDemo() {
  const options: CascaderOption[] = [
    {
      value: "fruits",
      label: "水果",
      children: [
        { value: "apple", label: "苹果" },
        { value: "banana", label: "香蕉" },
      ],
    },
    {
      value: "vegetables",
      label: "蔬菜",
      children: [
        { value: "carrot", label: "胡萝卜" },
        { value: "potato", label: "土豆" },
      ],
    },
    {
      value: "electronics",
      label: "电子产品",
      children: [
        { value: "laptop", label: "笔记本" },
        { value: "phone", label: "手机" },
      ],
    },
  ];

  const [selected, setSelected] = React.useState<string[]>([]);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">级联选择器 (Cascader)</h2>
      <Cascader
        value={selected}
        options={options}
        onChange={setSelected}
        placeholder="请选择"
        searchPlaceholder="搜索"
        allowClear={true}
      />
      <div className="mt-4">
        <strong>当前选中项: </strong>
        {selected.length > 0 ? selected.join(" > ") : "未选择"}
      </div>
    </div>
  );
}