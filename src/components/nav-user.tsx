import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle
} from "@tabler/icons-react"
import { useState, useRef } from "react"
import {
  useFloating,
  offset,
  flip,
  shift,
  autoUpdate
} from "@floating-ui/react"

import {
  Avatar,
  AvatarFallback
} from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { cn } from "@/lib/utils"
import { useUserStore } from '@/store'
import { useIntl } from "react-intl"

export function NavUser() {
  const { isMobile } = useSidebar()
  const intl = useIntl()
  const { logout, userInfo, updateUserInfo } = useUserStore()

  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement | null>(null)

  const { refs, floatingStyles } = useFloating({
    placement: isMobile ? 'bottom-end' : 'right-end',
    middleware: [offset(4), flip(), shift()],
    whileElementsMounted: autoUpdate,
  })

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        {/* Trigger */}
        <SidebarMenuButton
          ref={(node) => {
            triggerRef.current = node
            refs.setReference(node)
          }}
          size="lg"
          onClick={() => setOpen(v => !v)}
          className={cn(
            open && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <Avatar className="h-8 w-8 rounded-lg grayscale">
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

        {/* Dropdown content */}
        {open && (
          <div
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              minWidth: triggerRef.current?.offsetWidth,
            }}
            className="
              z-50 min-w-56 rounded-lg border bg-popover p-1
              text-popover-foreground shadow-md
            "
          >
            {/* Label */}
            <div className="px-2 py-1.5">
              <div className="flex items-center gap-2 text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarFallback className="rounded-lg">
                    {userInfo?.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 leading-tight">
                  <span className="truncate font-medium">{userInfo?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userInfo?.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="my-1 h-px bg-border" />

            {/* Profile */}
            <button
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
            >
              <IconUserCircle className="size-4" />
              {intl.formatMessage({ id: 'sidebar.user.message' })}
            </button>

            <div className="my-1 h-px bg-border" />

            {/* Roles */}
            <button
              className={cn(
                "w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
                userInfo?.currentRole === 'all' && "bg-accent text-accent-foreground"
              )}
              onClick={() => updateUserInfo({ currentRole: 'all' })}
            >
              {intl.formatMessage({ id: 'sidebar.user.all' })}
            </button>

            {userInfo?.roles?.map(role => (
              <button
                key={role.role}
                className={cn(
                  "w-full rounded-md px-2 py-1.5 text-left text-sm hover:bg-accent",
                  userInfo?.currentRole === role.role && "bg-accent text-accent-foreground"
                )}
                onClick={() => updateUserInfo({ currentRole: role.role })}
              >
                {role.name}
              </button>
            ))}

            <div className="my-1 h-px bg-border" />

            {/* Logout */}
            <button
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent"
            >
              <IconLogout className="size-4" />
              {intl.formatMessage({ id: 'sidebar.user.logout' })}
            </button>
          </div>
        )}
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
