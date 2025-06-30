import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUserStore } from '@/store';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router";
//根据用户登录信息进行权限控制
export default function Index() {
    const { token, userInfo, fetchUser } = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const check = async () => {
            if (token && !userInfo) {
                await fetchUser(); // ✅ 这里能拿到 userInfo
            }else if (!userInfo?.currentMenuPermission?.includes(location.pathname)) {
                navigate('/login');
            }
        };
        check();
    }, [navigate, location, userInfo, token, fetchUser]);
    return (
        <SidebarProvider>
            <AppSidebar variant="sidebar" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-3">
                            <Suspense fallback={<div>Loading...</div>}>
                                <Outlet />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
