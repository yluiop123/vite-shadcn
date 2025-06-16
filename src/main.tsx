import PageLayout from '@/layout';
import en from '@/locale/en-US';
import zh from '@/locale/zh-CN';
import { routes } from '@/routes';
// import loadable from '@loadable/component';
import { StrictMode, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router";
import './index.css';
import './mock';

const Login = lazy(() => import("@/pages/login"));
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
const modules = import.meta.glob('./pages/**/index.tsx');
const getLazyComponent = (path: string) => {
  const module = modules[`./pages${path}/index.tsx`];
  if (!module) throw new Error(`Module not found: ./pages${path}/index.tsx`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return lazy(module as any);
};
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale={locale} messages={messageMap[locale]}>
   <BrowserRouter basename='/vite-shadcn'>
    <Routes>
      <Route path="/login" element={<Login />} />
      {routes.length>0&&<Route path="/" element={<Navigate to={routes[0].path}/>} />}
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/" Component={PageLayout}>
        {routes.map(route => (
          route.redirect?
          <Route path={route.path} element={<Navigate to={route.redirect} replace/>} />
          :
          <Route path={route.path} Component={getLazyComponent(route.element??'')} /> 
        ))}
      </Route>
    </Routes>
    </BrowserRouter>
    </IntlProvider>
  </StrictMode>,
)
