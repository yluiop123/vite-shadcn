import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy } from "react";
const AutoCompleteDemo = lazy(() => import('./autocomplete'));
const CascaderDemo = lazy(() => import('./cascader'));
const CheckboxDemo = lazy(() => import('./checkbox'));
const ColorPickerDemo = lazy(() => import('./colorpicker'));
const DatePickerDemo = lazy(() => import('./datepicker'));
const FormDemo = lazy(() => import('./form'));
const InputDemo = lazy(() => import('./input'));
const InputNumberDemo = lazy(() => import('./input-number'));

export default function FormDemoPage() {
  return (
        <Tabs defaultValue="autocomplete" className="p-3">
            <TabsList >
                <TabsTrigger value="autocomplete">AutoComplete</TabsTrigger>
                <TabsTrigger value="cascader">Cascader</TabsTrigger>
                <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
                <TabsTrigger value="colorpicker">ColorPicker</TabsTrigger>
                <TabsTrigger value="datepicker">DatePicker</TabsTrigger>
                <TabsTrigger value="form">Form</TabsTrigger>
                <TabsTrigger value="input">Input</TabsTrigger>
                <TabsTrigger value="input-number">InputNumber</TabsTrigger>
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
            <TabsContent value="datepicker">
                <DatePickerDemo />
            </TabsContent>
            <TabsContent value="form">
                <FormDemo />
            </TabsContent>
            <TabsContent value="input">
                <InputDemo />
            </TabsContent>
            <TabsContent value="input-number">
                <InputNumberDemo />
            </TabsContent>
        </Tabs>
  );
}