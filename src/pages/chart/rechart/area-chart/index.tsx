// src/components/ThreeChartLayout.tsx
import { ChartAreaAxes } from "./area-chart-axes";
import { ChartAreaDefault } from "./area-chart-default";
import { ChartAreaGradient } from "./area-chart-gradient";
import { ChartAreaIcons } from "./area-chart-icons";
import { ChartAreaLegend } from "./area-chart-legend";
import { ChartAreaLinear } from "./area-chart-linear";
import { ChartAreaStacked } from "./area-chart-stacked";
import { ChartAreaStackedExpand } from "./area-chart-stacked-expanded";
import { ChartAreaStep } from "./area-chart-step";
export default function Index() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">        
        <ChartAreaDefault/>
        <ChartAreaGradient/>
        <ChartAreaAxes/>
        <ChartAreaStep/>
        <ChartAreaLinear/>
        <ChartAreaStacked/>
        <ChartAreaStackedExpand/>
        <ChartAreaLegend/>
        <ChartAreaIcons/>
    </div>
  );
}
