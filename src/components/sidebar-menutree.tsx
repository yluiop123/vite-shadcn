"use client"

import { ChevronRight} from "lucide-react"
import { NavItem } from "@/routes"
import { useLocation,Link } from 'react-router';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {useIntl} from 'react-intl';
export function SidebarMenuTree({item}: {item: NavItem}) {
  const location = useLocation();
  const intl = useIntl()
  function checkIsActive(href: string) {
    const pathname = location.pathname;
    return "/"+href===pathname;
  }
  return (
              <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <Link to={{
                    pathname: item.fullpath,
                  }}>
                  <SidebarMenuButton tooltip={intl.formatMessage({id:item.title})} 
                  isActive={checkIsActive(item.fullpath??"")}>              
                    {item.icon && <item.icon />}
                    <span>{intl.formatMessage({id:item.title})}</span>
                    
                      {item.children&&<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />}
                  </SidebarMenuButton>
                </Link>
              </CollapsibleTrigger>
             {item.children&&
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.children?.map((subItem,index) => (
                    <SidebarMenuTree item={subItem}  key={index}></SidebarMenuTree>
                    
                    // <SidebarMenuSubItem key={subItem.title}>
                    //   <SidebarMenuSubButton asChild 
                    //   // isActive={checkIsActive(href, subItem)}
                    //   >
                    //     <a href={subItem.url}>
                    //       <span>{subItem.title}</span>
                    //     </a>
                    //   </SidebarMenuSubButton>
                    // </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            }
            </SidebarMenuItem>
            </Collapsible>
  )
}
