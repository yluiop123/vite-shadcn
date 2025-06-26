import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AreaChart from "./area-chart";
import BarChart from "./bar-chart";
export default function Index() {
  return (
    <Tabs defaultValue="area">
    <TabsList>
        <TabsTrigger value="area">Area Chart</TabsTrigger>
        <TabsTrigger value="bar">Bar Chart</TabsTrigger>
    </TabsList>
    <TabsContent value="area">
        <AreaChart/>
    </TabsContent>
    <TabsContent value="bar">
        <BarChart/>
    </TabsContent>
    </Tabs>
  );
}
