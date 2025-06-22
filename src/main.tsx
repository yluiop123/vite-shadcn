import App from '@/App';
import mockHandlers from '@/mock';
import { setupWorker } from 'msw/browser';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const mockEnable = (import.meta.env.VITE_MOCK_ENABLE||'true')=='true';
if(mockEnable){
  const server = setupWorker(...mockHandlers);
  server.start({serviceWorker:{url: `${import.meta.env.BASE_URL}mockServiceWorker.js`}});
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
