import App from '@/App';
import initMSW from '@/mock';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
function createRootElement() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
const mockEnable = (import.meta.env.VITE_MOCK_ENABLE||'true')=='true';
if(mockEnable){
  initMSW().then(()=>{
    createRootElement();
  })
  const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
          initMSW();
      }
  };
  document.addEventListener('visibilitychange', handleVisibilityChange);
}else{
  createRootElement();
}


