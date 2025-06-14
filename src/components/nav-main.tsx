"use client"


import { SidebarMenuTree } from "@/components/sidebar-menutree"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu
} from "@/components/ui/sidebar"
import { NavItem } from "@/routes"
export function NavMain({items}: {items: NavItem[]}) {

  //   function checkIsActive(href: string, item: NavItem, mainNav = false) {
  //   return (
  //     href === item.url || // /endpint?search=param
  //     href.split('?')[0] === item.url || // endpoint
  //     !!item?.items?.filter((i) => i.url === href).length || // if child nav is active
  //     (mainNav &&
  //       href.split('/')[1] !== '' &&
  //       href.split('/')[1] === item?.url?.split('/')[1])
  //   )
  // }
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
