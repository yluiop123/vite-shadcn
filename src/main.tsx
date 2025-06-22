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
  HashRouter,
  Navigate,
  Route,
  Routes
} from "react-router";
import './index.css';
//生产环境请注释，这里用于演示
import './mock';

//国际化相关
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

//路由组件懒加载
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
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale={locale} messages={messageMap[locale]}>
   <Router >
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
    </Router>
    </IntlProvider>
  </StrictMode>,
)
