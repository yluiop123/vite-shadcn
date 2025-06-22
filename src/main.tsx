import App from '@/App';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//生产环境请注释，这里
import './mock';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
