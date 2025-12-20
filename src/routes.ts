import {
  BarChart3,
  Box,
  Boxes,
  FileText,
  Globe,
  Grid,
  KeyRound,
  Layers,
  Layers3,
  LayoutDashboard,
  LineChart,
  Map as MapIcon,
  MapPin,
  Network,
  PieChart,
  Puzzle,
  Radar,
  Settings,
  Shield,
  Table,
  TrendingUp,
  User,
  Users,
  Wrench,
} from "lucide-react";
import React from 'react';

type NavItem = {
  title: string;
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?:  React.JSXElementConstructor<any>; 
  children?: NavItem[];
  keys?: string[];
  titles?: string[]
};
type RouteType = {
  path: string;
  redirect?: string;
  element?: string;
};

const routeSetting: NavItem[] = [
  {
    key: "dashboard",
    title: "menu.dashboard",
    icon: LayoutDashboard,
  },
  {
    key: "component",
    title: "menu.component",
    icon: Puzzle,
    children: [
      { key: "general", title: "menu.component.general", icon: Layers },
      { key: "form", title: "menu.component.form", icon: FileText },
      { key: "table", title: "menu.component.table", icon: Table },
      { key: "custom", title: "menu.component.custom", icon: Wrench },
    ],
  },
  {
    key: "chart",
    title: "menu.chart",
    icon: BarChart3,
    children: [
      { key: "rechart", title: "menu.chart.rechart", icon: LineChart },
      { key: "echart", title: "menu.chart.echart", icon: PieChart },
      { key: "d3", title: "menu.chart.d3", icon: Network },
      { key: "antv", title: "menu.chart.antv", icon: TrendingUp },
    ],
  },
  {
    key: "three",
    title: "menu.three",
    icon: Box,
    children: [
      { key: "babylon", title: "menu.three.babylon", icon: Boxes },
      { key: "three", title: "menu.three.three", icon: Box },
    ],
  },
  {
    key: "map",
    title: "menu.map",
    icon: MapIcon,
    children: [
      { key: "cesium", title: "menu.map.cesium", icon: Globe },
      { key: "deckgl", title: "menu.map.deckgl", icon: Layers3 },
      { key: "l7", title: "menu.map.l7", icon: Radar },
      { key: "leaflet", title: "menu.map.leaflet", icon: MapPin },
      { key: "openlayers", title: "menu.map.openlayers", icon: Grid },
    ],
  },
  {
    key: "system",
    title: "menu.system",
    icon: Settings,
    children: [
      { key: "user", title: "menu.system.user", icon: User },
      { key: "role", title: "menu.system.role", icon: Shield },
      { key: "permission", title: "menu.system.permission", icon: KeyRound },
      { key: "group", title: "menu.system.group", icon: Users },
    ],
  },
];
function treeToList(tree:NavItem[]) {
  const menuMap = new Map<string,string[]>();
  const routes:RouteType[] = [];
  function traverse(node:NavItem,keys:string[]=[],titles:string[]=[]) {
    node.keys = [...keys,node.key];
    node.titles = [...titles,node.title];
    const fullpath:string = '/'+node.keys.join('/');
    if (node.children&&node.children.length>0) {
      node.children.forEach(child => traverse(child,node.keys??[],node.titles??[]));
      routes.push({
        path:fullpath,
        redirect:fullpath+'/'+node.children[0].key
      })
    }else{
      menuMap.set(fullpath,[...node.titles]);
      routes.push({
        path:fullpath,
        element:fullpath
      })
    }
  }

  tree.forEach(node => traverse(node));
  return {menuMap,routes};
}
const {menuMap,routes} = treeToList(routeSetting);
export { menuMap, routes, routeSetting, type NavItem };

