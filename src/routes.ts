import { Bot, ChartPie, ChartSpline } from "lucide-react";
import React from 'react';

type NavItem = {
  title: string;
  key: string;
  icon?: React.ElementType;
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
  { key: "dashboard", title: "menu.dashboard", icon: ChartPie },
  {
    key: "chart",
    title: "menu.chart",
    icon: ChartSpline,
    children: [
      { key: "antv", title: "menu.chart.antv", icon: Bot},
      { key: "d3", title: "menu.chart.d3", icon: Bot},
      { key: "echart", title: "menu.chart.echart", icon: Bot},
      { key: "rechart", title: "menu.chart.rechart", icon: Bot}
    ],
  },
  {
    key: "three",
    title: "menu.three",
    icon: Bot,
    children: [
      { key: "babylon", title: "menu.three.babylon", icon: Bot},
      { key: "three", title: "menu.three.three", icon: Bot}
    ],
  },
  {
    key: "map",
    title: "menu.map",
    icon: Bot,
    children: [
      { key: "cesium", title: "menu.map.cesium", icon: Bot},
      { key: "deckgl", title: "menu.map.deckgl", icon: Bot},
      { key: "l7", title: "menu.map.l7", icon: Bot},
      { key: "mapbox", title: "menu.map.mapbox", icon: Bot},
      { key: "openlayers", title: "menu.map.openlayers", icon: Bot},
    ],
  },
  {
    key: "system",
    title: "menu.system",
    icon: Bot,
    children: [
      { key: "user", title: "menu.system.user", icon: Bot},
      { key: "role", title: "menu.system.role", icon: Bot},
      { key: "menu", title: "menu.system.menu", icon: Bot},
      { key: "permission", title: "menu.system.permission", icon: Bot},
      { key: "dept", title: "menu.system.dept", icon: Bot},
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

