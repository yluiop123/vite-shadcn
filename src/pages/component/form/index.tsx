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
const MentionsDemo = lazy(() => import('./mentions'));
const RadioDemo = lazy(() => import('./radio'));
const RateDemo = lazy(() => import('./rate'));
const SelectDemo = lazy(() => import('./select'));
const SliderDemo = lazy(() => import('./slider'));
const SwitchDemo = lazy(() => import('./switch'));
const TimePickerDemo = lazy(() => import('./timepicker'));
const TransferDemo = lazy(() => import('./transfer'));
const TreeSelectDemo = lazy(() => import('./treeselect'));
const UploadDemo = lazy(() => import('./upload'));
export default function FormDemoPage() {
  return (
        <Tabs defaultValue="autocomplete" className="flex-wrap h-auto justify-start gap-2 p-1">
            <TabsList >
                <TabsTrigger value="autocomplete">AutoComplete</TabsTrigger>
                <TabsTrigger value="cascader">Cascader</TabsTrigger>
                <TabsTrigger value="checkbox">Checkbox</TabsTrigger>
                <TabsTrigger value="colorpicker">ColorPicker</TabsTrigger>
                <TabsTrigger value="datepicker">DatePicker</TabsTrigger>
                <TabsTrigger value="form">Form</TabsTrigger>
                <TabsTrigger value="input">Input</TabsTrigger>
                <TabsTrigger value="input-number">InputNumber</TabsTrigger>
                <TabsTrigger value="mentions">Mentions</TabsTrigger>
                <TabsTrigger value="radio">Radio</TabsTrigger>
                <TabsTrigger value="rate">Rate</TabsTrigger>
                <TabsTrigger value="select">Select</TabsTrigger>
                <TabsTrigger value="slider">Slider</TabsTrigger>
                <TabsTrigger value="switch">Switch</TabsTrigger>
                <TabsTrigger value="timepicker">TimePicker</TabsTrigger>
                <TabsTrigger value="transfer">Transfer</TabsTrigger>
                <TabsTrigger value="treeselect">TreeSelect</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
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
            <TabsContent value="mentions">
                <MentionsDemo />
            </TabsContent>
            <TabsContent value="radio">
                <RadioDemo />
            </TabsContent>
            <TabsContent value="rate">
                <RateDemo />
            </TabsContent>
            <TabsContent value="select">
                <SelectDemo />
            </TabsContent>
            <TabsContent value="slider">
                <SliderDemo />
            </TabsContent>
            <TabsContent value="switch">
                <SwitchDemo />
            </TabsContent>
            <TabsContent value="timepicker">
                <TimePickerDemo />
            </TabsContent>
            <TabsContent value="transfer">
                <TransferDemo />
            </TabsContent>
            <TabsContent value="treeselect">
                <TreeSelectDemo />
            </TabsContent>
            <TabsContent value="upload">
                <UploadDemo />
            </TabsContent>
        </Tabs>
  );
}