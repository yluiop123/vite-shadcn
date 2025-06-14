import PageLayout from '@/layout';
import en from '@/locale/en-US';
import zh from '@/locale/zh-CN';
import { routes } from '@/routes';
import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router";
import './index.css';
const Login = lazy(() => import("@/pages/login"));
const router = createBrowserRouter([
  { path: "login",
    Component: Login
  },
    { path: "/",
    Component: PageLayout,
        children: routes
  },
]);
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
