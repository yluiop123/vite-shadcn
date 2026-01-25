import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy } from "react";
const AutoCompleteDemo = lazy(() => import('./autocomplete'));
export default function FormDemoPage() {
  return (
        <Tabs defaultValue="autocomplete" className="p-3">
            <TabsList >
                <TabsTrigger value="autocomplete">AutoComplete</TabsTrigger>
            </TabsList>
            <TabsContent value="autocomplete">
                <AutoCompleteDemo />
            </TabsContent>
        </Tabs>
  );
}