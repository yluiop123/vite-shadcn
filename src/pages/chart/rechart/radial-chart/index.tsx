// src/components/ThreeChartLayout.tsx
import { ChartRadialSimple } from './radial-chart';
import { ChartRadialGrid } from './radial-chart-grid';
import { ChartRadialLabel } from './radial-chart-label';
import { ChartRadialShape } from './radial-chart-shape';
import { ChartRadialStacked } from './radial-chart-stacked';
import { ChartRadialText } from './radial-chart-text';


export default function Index() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">        
      <ChartRadialSimple />
      <ChartRadialGrid />
      <ChartRadialLabel />
      <ChartRadialShape />
      <ChartRadialStacked />
      <ChartRadialText />
    </div>
  );
}
