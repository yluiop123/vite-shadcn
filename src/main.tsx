import App from '@/App';
import initMSW from '@/mock';
import L from 'leaflet';
import icon2x from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({ iconUrl: icon, iconRetinaUrl: icon2x, shadowUrl: shadow })
/**
 * 配置 Cesium 资源路径
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// (window as any).CESIUM_BASE_URL = import.meta.env.VITE_BASE || "/"; // 对应打包后的资源访问路径
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
}else{
  createRootElement();
}


