"use client"


import { SidebarMenuTree } from "@/components/sidebar-menutree";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from "@/components/ui/sidebar";
import { NavItem } from "@/routes";
import { useUserStore } from '@/store';
export function NavMain({items}: {items: NavItem[]}) {
  const {userInfo} = useUserStore();
  debugger;
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Vite-Shadcn</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => (
          userInfo.currentMenuPermission.includes('/'+item.keys?.join("/")) &&
           <SidebarMenuTree item={item} key={index}></SidebarMenuTree>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
