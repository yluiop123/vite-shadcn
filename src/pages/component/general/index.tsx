import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy } from "react";
const ButtonPage = lazy(() => import('./button'));
const FloatButtonPage = lazy(() => import('./float-button'));
const DividerPage  = lazy(() => import('./divide'));
const ResizablePage = lazy(() => import('./resizable'));
export default function General() {
  return (
        <Tabs defaultValue="button" className="p-3">
            <TabsList>
                <TabsTrigger value="button">Button</TabsTrigger>
                <TabsTrigger value="floatButton">FloatButton</TabsTrigger>
                <TabsTrigger value="divider">Divider</TabsTrigger>
                <TabsTrigger value="resizable">Resizable</TabsTrigger>
            </TabsList>
            <TabsContent value="button">
                <ButtonPage />
            </TabsContent>
             <TabsContent value="floatButton">
                <FloatButtonPage />
            </TabsContent>
             <TabsContent value="divider">
                <DividerPage />
            </TabsContent>
             <TabsContent value="resizable">
                <ResizablePage />
            </TabsContent>
        </Tabs>
  );
}