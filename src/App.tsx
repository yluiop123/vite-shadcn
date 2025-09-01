import PageLayout from '@/layout';
import { routes } from '@/routes';
// import loadable from '@loadable/component';
import { Toaster } from "@/components/ui/sonner";
import { useLocaleStore } from "@/store/index";
import { lazy } from 'react';
import { IntlProvider } from 'react-intl';
import {
    BrowserRouter,
    HashRouter,
    Navigate,
    Route,
    Routes
} from "react-router";

const Login = lazy(() => import("@/pages/login"));
const modules = import.meta.glob('./pages/**/index.tsx');
const getLazyComponent = (path: string) => {
    const module = modules[`./pages${path}/index.tsx`];
    if (!module) throw new Error(`Module not found: ./pages${path}/index.tsx`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return lazy(module as any);
};
const isHashRouter = import.meta.env.VITE_ROUTE === 'hashRouter';
const Router = isHashRouter ? HashRouter : BrowserRouter;
export default function Index() {
    const { locale, messages } = useLocaleStore();
    //路由组件懒加载
    return (
        <IntlProvider locale={locale} messages={messages}>
            <Router >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {routes.length > 0 && <Route path="/" element={<Navigate to={routes[0].path} />} />}
                    <Route path="*" element={<Navigate to="/login" />} />
                    <Route path="/" Component={PageLayout}>
                        {routes.map(route => (
                            route.redirect ?
                                <Route path={route.path} element={<Navigate to={route.redirect} replace />} />
                                :
                                <Route path={route.path} Component={getLazyComponent(route.element ?? '')} />
                        ))}
                    </Route>
                </Routes>
            </Router>
            <Toaster />
        </IntlProvider>
    )
}

