import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy } from "react";
const BasicPage = lazy(() => import('./basic'));
const HeaderGroupsPage = lazy(() => import('./header-groups'));
const FiltersPage = lazy(() => import('./filters'));
const FacetedFiltersPage = lazy(() => import('./filters-faceted'));

export default function General() {
  return (
        <Tabs defaultValue="static" className="p-3">
            <TabsList >
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="header-groups">Header Groups</TabsTrigger>
                <TabsTrigger value="filters">Filters</TabsTrigger>
                <TabsTrigger value="filters-faceted">Faceted Filters</TabsTrigger>
            </TabsList>
             <TabsContent value="basic">
                <BasicPage />
            </TabsContent>
             <TabsContent value="header-groups">
                <HeaderGroupsPage />
            </TabsContent>
             <TabsContent value="filters">
                <FiltersPage />
            </TabsContent>
             <TabsContent value="filters-faceted">
                <FacetedFiltersPage />
            </TabsContent>
        </Tabs>
  );
}