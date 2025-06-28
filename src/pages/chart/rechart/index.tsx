import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy } from "react";

const AreaChart = lazy(() => import('./area-chart/area-chart-index'));
const BarChart = lazy(() => import('./bar-chart/bar-chart-index'));
const LineChart = lazy(() => import('./line-chart/line-chart-index'));
const PieChart = lazy(() => import('./pie-chart/pie-chart-index'));
const RadarChart = lazy(() => import('./radar-chart/radar-chart-index'));
const RadialChart = lazy(() => import('./radial-chart/radial-chart-index'));
const Tooltips = lazy(() => import('./tooltips/tooltips-index'));
export default function Index() {
  return (
    <Tabs defaultValue="area">
    <TabsList>
        <TabsTrigger value="area">Area Chart</TabsTrigger>
        <TabsTrigger value="bar">Bar Chart</TabsTrigger>
        <TabsTrigger value="line">Line Chart</TabsTrigger>
        <TabsTrigger value="pie">Pie Chart</TabsTrigger>
        <TabsTrigger value="radar">Radar Chart</TabsTrigger>
        <TabsTrigger value="radial">Radial Chart</TabsTrigger>
        <TabsTrigger value="tooltip">Tooltip</TabsTrigger>
    </TabsList>
    <TabsContent value="area">
        <AreaChart/>
    </TabsContent>
    <TabsContent value="bar">
        <BarChart/>
    </TabsContent>
    <TabsContent value="line">
        <LineChart/>
    </TabsContent>
    <TabsContent value="pie">
        <PieChart/>
    </TabsContent>
    <TabsContent value="radar">
        <RadarChart/>
    </TabsContent>
    <TabsContent value="radial">
        <RadialChart/>
    </TabsContent>
    <TabsContent value="tooltip">
        <Tooltips/>
    </TabsContent>
    </Tabs>
  );
}
