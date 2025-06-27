// src/components/ThreeChartLayout.tsx
import { ChartTooltipAdvanced } from './tooltip-advanced';
import { ChartTooltipLabelCustom } from './tooltip-custom-label';
import { ChartTooltipDefault } from './tooltip-default';
import { ChartTooltipFormatter } from './tooltip-formatter';
import { ChartTooltipIcons } from './tooltip-icons';
import { ChartTooltipLabelFormatter } from './tooltip-label-formatter';
import { ChartTooltipIndicatorLine } from './tooltip-line-indicator';
import { ChartTooltipIndicatorNone } from './tooltip-no-indicator';
import { ChartTooltipLabelNone } from './tooltip-no-label';


export default function Index() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">        
      <ChartTooltipDefault />
      <ChartTooltipAdvanced />
      <ChartTooltipLabelCustom />
      <ChartTooltipFormatter />
      <ChartTooltipIcons />
      <ChartTooltipLabelFormatter />
      <ChartTooltipIndicatorLine />
      <ChartTooltipIndicatorNone />
      <ChartTooltipLabelNone />
    </div>
  );
}
