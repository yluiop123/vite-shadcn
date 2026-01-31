import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy } from "react";
const AvatarPage = lazy(() => import('./avatar'));
const BadgePage = lazy(() => import('./badge'));
const CalendarPage = lazy(() => import('./calendar'));

export default function Display() {
  return (
    <Tabs defaultValue="avatar" className="p-3">
      <TabsList>
        <TabsTrigger value="avatar">Avatar</TabsTrigger>
        <TabsTrigger value="badge">Badge</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>
      <TabsContent value="avatar">
        <AvatarPage />
      </TabsContent>
      <TabsContent value="badge">
        <BadgePage />
      </TabsContent>
      <TabsContent value="calendar">
        <CalendarPage />
      </TabsContent>
    </Tabs>
  );
}