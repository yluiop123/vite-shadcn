import App from '@/App';
import initMSW from '@/mock';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
const mockEnable = (import.meta.env.VITE_MOCK_ENABLE||'true')=='true';
if(mockEnable){
  initMSW();
  const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
          initMSW();
      }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
