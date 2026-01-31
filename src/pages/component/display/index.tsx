import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy } from "react";
const AvatarPage = lazy(() => import('./avatar'));
const BadgePage = lazy(() => import('./badge'));
const CalendarPage = lazy(() => import('./calendar'));
const CardPage = lazy(() => import('./card'));
const CarouselPage = lazy(() => import('./carousel'));

export default function Display() {
  return (
    <Tabs defaultValue="avatar" className="p-3">
      <TabsList>
        <TabsTrigger value="avatar">Avatar</TabsTrigger>
        <TabsTrigger value="badge">Badge</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
        <TabsTrigger value="card">Card</TabsTrigger>
        <TabsTrigger value="carousel">Carousel</TabsTrigger>
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
      <TabsContent value="card">
        <CardPage />
      </TabsContent>
      <TabsContent value="carousel">
        <CarouselPage />
      </TabsContent>
    </Tabs>
  );
}