import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy } from "react";
const AutoCompleteDemo = lazy(() => import('./autocomplete'));
const CascaderDemo = lazy(() => import('./cascader'));
const CheckboxDemo = lazy(() => import('./checkbox'));
const ColorPickerDemo = lazy(() => import('./colorpicker'));

export default function FormDemoPage() {
  return (
        <Tabs defaultValue="autocomplete" className="p-3">
            <TabsList >
                <TabsTrigger value="autocomplete">AutoComplete</TabsTrigger>
                <TabsTrigger value="cascader">Cascader</TabsTrigger>
                <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
                <TabsTrigger value="colorpicker">ColorPicker</TabsTrigger>
            </TabsList>
            <TabsContent value="autocomplete">
                <AutoCompleteDemo />
            </TabsContent>
            <TabsContent value="cascader">
                <CascaderDemo />
            </TabsContent>
            <TabsContent value="checkbox">
                <CheckboxDemo />
            </TabsContent>
            <TabsContent value="colorpicker">
                <ColorPickerDemo />
            </TabsContent>
        </Tabs>
  );
}