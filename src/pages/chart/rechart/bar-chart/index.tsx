// src/components/ThreeChartLayout.tsx
import { ChartBarActive } from "./active";
import { ChartBarLabelCustom } from "./custom-label";
import { ChartBarDefault } from "./default";
import { ChartBarHorizontal } from "./horizontal";
import { ChartBarMixed } from "./mixed";
import { ChartBarMultiple } from "./multiple";
import { ChartBarNegative } from "./negative";
import { ChartBarStacked } from "./stacked-legend";
import { ChartBarLabel } from "./with-label";

export default function Index() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">        
      <ChartBarDefault />
      <ChartBarActive />
      <ChartBarLabelCustom />
      <ChartBarHorizontal />
      <ChartBarMixed />
      <ChartBarMultiple />
      <ChartBarNegative />
      <ChartBarStacked />
      <ChartBarLabel />
    </div>
  );
}
