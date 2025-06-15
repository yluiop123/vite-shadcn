import PageLayout from '@/layout';
import en from '@/locale/en-US';
import zh from '@/locale/zh-CN';
import { routes } from '@/routes';
import { lazy } from '@loadable/component';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router";
import './index.css';
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
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntlProvider locale={locale} messages={messageMap[locale]}>
   <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/" Component={PageLayout}>
        {routes.map(route => (
          route.redirect?
          <Route path={route.path} element={<Navigate to={route.redirect} />} />
          :
          <Route path={route.path} Component={lazy(modules['./pages'+route.element+'/index.tsx'],
          {fallback:() =>React.createElement('div',{},'Loading...')}
        )} /> 
        ))}
      </Route>
    </Routes>
    </BrowserRouter>
    </IntlProvider>
  </StrictMode>,
)
