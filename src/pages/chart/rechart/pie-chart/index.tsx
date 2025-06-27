// src/components/ThreeChartLayout.tsx
import { ChartPieSimple } from './pie-chart';
import { ChartPieLabelCustom } from './pie-chart-custom-label';
import { ChartPieDonutText } from './pie-chart-donut';
import { ChartPieInteractive } from './pie-chart-interactive';
import { ChartPieLabel } from './pie-chart-label';
import { ChartPieLabelList } from './pie-chart-label-list';
import { ChartPieLegend } from './pie-chart-legend';
import { ChartPieSeparatorNone } from './pie-chart-separato-none';
import { ChartPieStacked } from './pie-chart-stacked';

export default function Index() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">        
      <ChartPieSimple />
      <ChartPieLabelCustom />
      <ChartPieDonutText />
      <ChartPieInteractive />
      <ChartPieLabelList />
      <ChartPieLabel />
      <ChartPieLegend />
      <ChartPieSeparatorNone />
      <ChartPieStacked />
    </div>
  );
}
