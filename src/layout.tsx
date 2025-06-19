import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import axios from "@/lib/axios";
import { useUserStore } from '@/store';
import { Suspense, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router";

//根据用户登录信息进行权限控制
export default function Index() {
    const {userInfo,setUserInfo} = useUserStore();
    const navigate = useNavigate();
    const location = useLocation();
    async function getUserInfo () {
        return await axios.post('/user/userInfo');
    }
    useEffect(() => {
        if (localStorage.getItem('token') == null){
            navigate('/login');
        }else if(!userInfo.currentMenuPermission.includes(location.pathname)){
            getUserInfo().then((res) => {
                const data = res.data;
                setUserInfo({...data,currentRole:data.defaultRole});
                if(!userInfo.currentMenuPermission.includes(location.pathname)){
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            })
        }
    }, [navigate,location,userInfo,setUserInfo]);
    return (
        <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
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
