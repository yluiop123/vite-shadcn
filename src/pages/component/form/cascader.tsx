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
      { value: "fruit", label: "水果", children: [{ value: "apple", label: "苹果" }] },
    ],
  },
];

export default function App() {
  const [single, setSingle] = useState<string[]>([]);
  const [multi, setMulti] = useState<string[][]>([]);

  return (
    <div className="p-20 space-y-10 bg-gray-50 min-h-screen">
      <div className="max-w-xs space-y-2">
        <label className="text-sm font-bold">单选示例</label>
        <Cascader options={OPTIONS} value={single} onChange={setSingle} multiple={false} />
      </div>

      <div className="max-w-sm space-y-2">
        <label className="text-sm font-bold">多选示例</label>
        <Cascader options={OPTIONS} value={multi} onChange={setMulti} multiple={true} />
      </div>
    </div>
  );
}