import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy } from "react";
const ButtonPage = lazy(() => import('./button'));
const FloatButtonPage = lazy(() => import('./float-button'));
const DividerPage  = lazy(() => import('./divide'));
const ResizablePage = lazy(() => import('./resizable'));
const TypographyPage = lazy(() => import('./typography'));
const FlexPage = lazy(() => import('./flex'));
const GridPage = lazy(() => import('./grid'));
const LayoutPage = lazy(() => import('./layout'));
const SpacePage = lazy(() => import('./space'));
const AnchorPage = lazy(() => import('./anchor'));
export default function General() {
  return (
        <Tabs defaultValue="button" className="p-3">
            <TabsList>
                <TabsTrigger value="button">Button</TabsTrigger>
                <TabsTrigger value="floatButton">FloatButton</TabsTrigger>
                <TabsTrigger value="typography">Typography</TabsTrigger>
                <TabsTrigger value="divider">Divider</TabsTrigger>
                <TabsTrigger value="resizable">Resizable</TabsTrigger>   
                <TabsTrigger value="flex">Flex</TabsTrigger>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="space">Space</TabsTrigger>
                <TabsTrigger value="anchor">Anchor</TabsTrigger>
            </TabsList>
            <TabsContent value="button">
                <ButtonPage />
            </TabsContent>
             <TabsContent value="floatButton">
                <FloatButtonPage />
            </TabsContent>
            <TabsContent value="typography">
                <TypographyPage />
            </TabsContent>
             <TabsContent value="divider">
                <DividerPage />
            </TabsContent>
             <TabsContent value="resizable">
                <ResizablePage />
            </TabsContent>
             <TabsContent value="flex">
                <FlexPage />
            </TabsContent>
             <TabsContent value="grid">
                <GridPage />
            </TabsContent>
             <TabsContent value="layout">
                <LayoutPage />
            </TabsContent>
             <TabsContent value="space">
                <SpacePage />
            </TabsContent>
             <TabsContent value="anchor">
                <AnchorPage />
            </TabsContent>
        </Tabs>
  );
}