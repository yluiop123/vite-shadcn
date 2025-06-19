"use client"


import { SidebarMenuTree } from "@/components/sidebar-menutree";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from "@/components/ui/sidebar";
import { NavItem } from "@/routes";
export function NavMain({items}: {items: NavItem[]}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Vite-Shadcn</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (          
           <SidebarMenuTree item={item} key={index}></SidebarMenuTree>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
