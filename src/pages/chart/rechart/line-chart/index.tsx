// src/components/ThreeChartLayout.tsx
import { ChartLineLinear } from './line-char-linear';
import { ChartLineStep } from './line-char-step';
import { ChartLineDefault } from "./line-chart";
import { ChartLineDotsCustom } from './line-chart-custom-dots';
import { ChartLineLabelCustom } from './line-chart-custom-label';
import { ChartLineDots } from './line-chart-dots';
import { ChartLineDotsColors } from './line-chart-dots-colors';
import { ChartLineLabel } from './line-chart-label';
import { ChartLineMultiple } from './line-chart-multiple';


export default function Index() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">        
      <ChartLineDefault />
      <ChartLineLinear />
      <ChartLineStep />
      <ChartLineDotsCustom />
      <ChartLineLabelCustom />
      <ChartLineDotsColors />
      <ChartLineDots />
      <ChartLineMultiple />
      <ChartLineLabel />
    </div>
  );
}
