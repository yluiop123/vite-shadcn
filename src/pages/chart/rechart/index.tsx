import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AreaChart from "./area-chart";
import BarChart from "./bar-chart";
import LineChart from "./line-chart";
import PieChart from "./pie-chart";
import RadarChart from "./radar-chart";
import RadialChart from "./radial-chart";
import Tooltips from "./tooltips";
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
