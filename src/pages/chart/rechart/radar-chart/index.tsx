// src/components/ThreeChartLayout.tsx
import { ChartRadarDefault } from './radar-chart';
import { ChartRadarLabelCustom } from './radar-chart-custom-label';
import { ChartRadarDots } from './radar-chart-dots';
import { ChartRadarGridCircle } from './radar-chart-grid-circle';
import { ChartRadarGridCircleFill } from './radar-chart-grid-circle-filled';
import { ChartRadarGridCircleNoLines } from './radar-chart-grid-circle-nolines';
import { ChartRadarGridCustom } from './radar-chart-grid-custom';
import { ChartRadarGridFill } from './radar-chart-grid-filled';
import { ChartRadarGridNone } from './radar-chart-grid-none';
import { ChartRadarLegend } from './radar-chart-legend';
import { ChartRadarLinesOnly } from './radar-chart-lines-only';
import { ChartRadarMultiple } from './radar-chart-multiple';


export default function Index() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">        
      <ChartRadarDefault />
      <ChartRadarLabelCustom />
      <ChartRadarDots />
      <ChartRadarGridCircleFill />
      <ChartRadarGridCircleNoLines />
      <ChartRadarGridCircle />
      <ChartRadarGridCustom />
      <ChartRadarGridFill />
      <ChartRadarGridNone />
      <ChartRadarLegend />
      <ChartRadarLinesOnly />
      <ChartRadarMultiple />
    </div>
  );
}
