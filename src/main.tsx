import { routes } from '@/routes';
import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router";
import './index.css';
// import App from '@/App.tsx'
import PageLayout from '@/layout';
import {IntlProvider} from 'react-intl';
const Login = lazy(() => import("@/pages/login"));
// function getRoutes(routes: NavItem[],parentPath = ""):RouteObject[]{
//   return routes.map((route:NavItem) => {
//     const currentPath = route.path || ''
//     const fullPath = `${parentPath}/${currentPath}`.replace(/\/+/g, '/');
//     const routeObject : RouteObject = {    
//       path: route.path,
//       children: route.children && getRoutes(route.children,fullPath),
//     }
//     if(!route.children){
//       routeObject.Component = lazy(() => import(`@/pages${fullPath}`));
//     }
//     return routeObject;
//   })
// }

const router = createBrowserRouter([
  { path: "login",
    Component: Login
  },
    { path: "/",
    Component: PageLayout,
        children: routes
  },
]);
import zh from '@/locale/zh-CN';
import en from '@/locale/en-US';
const messageMap = {
  zh,
  en,
};
const getLocale = () => {
  const locale = navigator.language;
    switch (locale) {
    case 'zh-CN':
      return 'zh';
    case 'en-US':
      return 'en';
    default:
      return 'zh';
  }
};
const locale = getLocale();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale={locale} messages={messageMap[locale]}>
      <RouterProvider router={router} />
    </IntlProvider>
  </StrictMode>,
)
