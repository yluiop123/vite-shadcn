// src/components/ThreeChartLayout.tsx
import { ChartBarActive } from "./bar-chart-active";
import { ChartBarLabelCustom } from "./bar-chart-custom-label";
import { ChartBarDefault } from "./bar-chart-default";
import { ChartBarHorizontal } from "./bar-chart-horizontal";
import { ChartBarMixed } from "./bar-chart-mixed";
import { ChartBarMultiple } from "./bar-chart-multiple";
import { ChartBarNegative } from "./bar-chart-negative";
import { ChartBarStacked } from "./bar-chart-stacked-legend";
import { ChartBarLabel } from "./bar-chart-label";

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
