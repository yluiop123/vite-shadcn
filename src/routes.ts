import { lazy } from '@loadable/component';
import { Bot } from "lucide-react";
import React from 'react';
import { RouteObject } from "react-router";
type NavItem = {
  title?: string;
  path: string;
  icon?: React.ElementType;
  isActive?: boolean;
  children?: NavItem[];
  fullpath?: string;
  index?: boolean;
};
const routeSetting: NavItem[] = [
  { path: "dashboard", title: "menu.dashboard", icon: Bot },
  {
    path: "chart",
    title: "menu.chart",
    icon: Bot,
    children: [
      { path: "antv", title: "menu.chart.antv", icon: Bot},
      { path: "d3", title: "menu.chart.d3", icon: Bot},
      { path: "echart", title: "menu.chart.echart", icon: Bot},
      { path: "rechart", title: "menu.chart.rechart", icon: Bot}
    ],
  },
  {
    path: "three",
    title: "menu.three",
    icon: Bot,
    children: [
      { path: "babylon", title: "menu.three.babylon", icon: Bot},
      { path: "three", title: "menu.three.three", icon: Bot}
    ],
  },
  {
    path: "map",
    title: "menu.map",
    icon: Bot,
    children: [
      { path: "cesium", title: "menu.map.cesium", icon: Bot},
      { path: "deckgl", title: "menu.map.deckgl", icon: Bot},
      { path: "l7", title: "menu.map.l7", icon: Bot},
      { path: "mapbox", title: "menu.map.mapbox", icon: Bot},
      { path: "openlayers", title: "menu.map.openlayers", icon: Bot},
    ],
  },
  {
    path: "system",
    title: "menu.system",
    icon: Bot,
    children: [
      { path: "role", title: "menu.system.role", icon: Bot},
      { path: "menu", title: "menu.system.menu", icon: Bot},
      { path: "dept", title: "menu.system.dept", icon: Bot},
    ],
  },

];
const modules = import.meta.glob('./pages/**/index.tsx');
function addFullPath(node:NavItem, parentPath = '', routeObject:RouteObject={}):RouteObject {
  // 拼接当前 fullpath
  const currentFullPath = parentPath ? `${parentPath}/${node.path}` : node.path;
  // 如果有子节点，递归处理
  const child:NavItem[] = node.children || [];

  if(node.index){
    node.fullpath = parentPath;
    routeObject.index = node.index;
  }else if(node.path){
    node.fullpath = currentFullPath;
    routeObject.path = node.path;
  }

  if (child.length > 0) {
    routeObject.children = Array(child.length).fill(null).map(() => ({}));
    child.forEach((child,index) => addFullPath(child, currentFullPath,routeObject.children?.[index]));
  }else{
    routeObject.Component = lazy(modules['./pages/'+currentFullPath+'/index.tsx'],
      {fallback:() =>React.createElement('div',{},'Loading...')});
  }
  return routeObject;
}
const routes = routeSetting.map(item => addFullPath(item));

function treeToListWithLevel(tree:NavItem[]) {
  const menuMap = new Map<string,string>();

  function traverse(node:NavItem) {
    menuMap.set(node.fullpath || '',node.title || '');
    if (node.children) {
      node.children.forEach(child => traverse(child));
    }
  }

  tree.forEach(node => traverse(node));
  return menuMap;
}
const menuMap:Map<string,string> = treeToListWithLevel(routeSetting);
console.log(routeSetting);
console.log(routes);
export { menuMap, routes, routeSetting, type NavItem };

