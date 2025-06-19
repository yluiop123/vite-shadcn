import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle
} from "@tabler/icons-react";

import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUserStore } from '@/store';
import { useIntl } from "react-intl";
export function NavUser() {
const { isMobile } = useSidebar()
const intl = useIntl()
const {logout,userInfo,updateUserInfo} = useUserStore();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                {/* <AvatarImage src={userInfo?.avatar} alt={userInfo?.name} /> */}
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userInfo?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {userInfo?.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-lg">{userInfo?.name}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userInfo?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userInfo?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <IconUserCircle />
              {intl.formatMessage({ id: 'sidebar.user.message' })}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className={cn(userInfo?.currentRole==='all' && "bg-accent text-accent-foreground")}   key={'all'} onClick={()=>updateUserInfo({currentRole:'all'})}>
              {intl.formatMessage({ id: 'sidebar.user.all' })}
            </DropdownMenuItem>
            <DropdownMenuGroup>
              {userInfo?.roles?.map((role) => (
                <DropdownMenuItem className={cn(userInfo?.currentRole===role.role && "bg-accent text-accent-foreground")}  key={role.role} onClick={()=>updateUserInfo({currentRole:role.role})}>
                  {role.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {
              logout();
            }}>
              <IconLogout />
              {intl.formatMessage({ id: 'sidebar.user.logout' })}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
