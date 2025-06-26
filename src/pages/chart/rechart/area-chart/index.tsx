// src/components/ThreeChartLayout.tsx
import { ChartAreaAxes } from "./axes";
import { ChartAreaDefault } from "./default";
import { ChartAreaGradient } from "./gradient";
import { ChartAreaIcons } from "./icons";
import { ChartAreaLegend } from "./legend";
import { ChartAreaLinear } from "./linear";
import { ChartAreaStacked } from "./stacked";
import { ChartAreaStackedExpand } from "./stacked-expanded";
import { ChartAreaStep } from "./step";
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
