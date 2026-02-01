import { useThemeStore } from '@/store/index';
import 'leaflet/dist/leaflet.css';
import {
  Activity, ChevronRight,
  CloudRain,
  Droplets,
  Map as MapIcon, Sprout,
  Sun,
  Thermometer,
  Wind
} from 'lucide-react';
import React, { ReactNode, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer } from 'recharts';

// 1. 解决地图尺寸不刷新导致的溢出问题
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

// 2. 增强型 EcoPanel：核心在于 flex-1 relative min-h-0，为图表提供可靠的定位上下文
const EcoPanel = ({ title, children, className = "", icon: Icon, flex = "none" }: { title: string, children: ReactNode, className?: string, icon?: any, flex?: string }) => (
  <section 
    style={{ flex: flex }}
    className={`flex flex-col min-h-0 min-w-0 border bg-white dark:bg-[#080d0a] border-green-100 dark:border-emerald-900/40 rounded-lg overflow-hidden shadow-sm ${className}`}
  >
    <div className="px-3 py-2 shrink-0 border-b bg-green-50/50 dark:bg-emerald-950/20 dark:border-emerald-900/40 flex items-center gap-2">
      {Icon && <Icon size={14} className="text-green-600 dark:text-emerald-500 shrink-0" />}
      <h2 className="text-[11px] font-bold tracking-wider text-green-800 dark:text-emerald-400 uppercase truncate">
        {title}
      </h2>
    </div>
    {/* 关键层：relative 配合 flex-1，确保子元素 ResponsiveContainer 能填满 */}
    <div className="flex-1 relative min-h-0 w-full overflow-hidden">
      {children}
    </div>
  </section>
);

export default function EcoManagement() {
  const { mode } = useThemeStore(); 
  
  const [ecoData] = React.useState(() => Array.from({ length: 24 }, (_, i) => ({ 
    hour: `${i}:00`, 
    ndvi: 0.3 + Math.random() * 0.5
  })));

  return (
    <div className="h-full w-full flex flex-col p-3 gap-3 box-border overflow-hidden bg-[#f8faf9] dark:bg-[#020503]">
      
      {/* 顶栏 */}
      <header className="h-14 shrink-0 flex items-center justify-between px-4 border bg-white dark:bg-[#0a0f0d] dark:border-emerald-900/60 shadow-sm rounded-lg box-border">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-1.5 bg-green-600 rounded shrink-0">
            <Sprout className="text-white" size={18} />
          </div>
          <h1 className="font-bold text-sm text-green-900 dark:text-emerald-400 truncate uppercase tracking-tight">
            智慧农林生态平台
          </h1>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <div className={`hidden sm:flex items-center gap-2 px-3 py-1 rounded-md border ${
            mode === 'dark' ? 'border-emerald-500/30 bg-emerald-900/10 text-emerald-400' : 'border-green-100 bg-green-50 text-green-700'
          }`}>
            <Activity size={12} className="animate-pulse" />
            <span className="text-[10px] font-bold whitespace-nowrap">系统监控中</span>
          </div>
        </div>
      </header>

      {/* 主体区域 */}
      <main className="flex-1 flex gap-3 min-h-0 min-w-0 w-full box-border overflow-hidden">
        
        {/* 左侧栏 */}
        <aside className="w-[260px] flex flex-col gap-3 shrink-0 min-w-0 h-full">
          <EcoPanel title="环境指标" icon={CloudRain} className="h-44 shrink-0">
            <div className="grid grid-cols-2 p-3 gap-2 h-full">
              {[
                { label: '温感', val: '24.8', unit: '°C', icon: Thermometer },
                { label: '湿度', val: '72', unit: '%', icon: Droplets },
                { label: '风向', val: '北', unit: '风', icon: Wind },
                { label: '光强', val: '1.2k', unit: 'lux', icon: Sun },
              ].map((item, i) => (
                <div key={i} className="p-2 rounded border border-green-50 dark:border-emerald-900/20 bg-green-50/10 dark:bg-emerald-900/10 min-w-0">
                  <div className="text-[9px] opacity-60 font-bold mb-1 flex items-center gap-1 truncate text-green-800 dark:text-emerald-300">
                    <item.icon size={10} className="shrink-0" /> {item.label}
                  </div>
                  <div className="text-sm font-black dark:text-emerald-400 truncate">
                    {item.val}<span className="text-[10px] ml-0.5 opacity-70 font-normal">{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </EcoPanel>
          
          <EcoPanel title="NDVI 健康度趋势" flex="1">
            {/* 使用绝对定位容器承载图表，解决 ResponsiveContainer 宽度为0的问题 */}
            <div className="absolute inset-0 p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ecoData} margin={{ left: -30, right: 10, top: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorNdvi" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={mode === 'dark' ? '#064e3b' : '#f0fdf4'} />
                  <Area 
                    type="monotone" 
                    dataKey="ndvi" 
                    stroke="#10b981" 
                    fillOpacity={1} 
                    fill="url(#colorNdvi)" 
                    strokeWidth={2}
                    isAnimationActive={false} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </EcoPanel>
        </aside>

        {/* 中间地图 */}
        <div className="flex-1 min-w-0 h-full border rounded-lg overflow-hidden bg-white border-green-100 dark:border-emerald-900/60 relative shadow-inner">
          <div className="absolute inset-0">
            <MapContainer 
              center={[30.27, 120.15]} 
              zoom={14} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false}
            >
              <MapResizer />
              <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
            </MapContainer>
          </div>
        </div>

        {/* 右侧栏 */}
        <aside className="w-[240px] flex flex-col gap-3 shrink-0 min-w-0 h-full">
          <EcoPanel title="资产概览" icon={MapIcon} flex="1">
            <div className="p-4 flex flex-col gap-5">
              <div className="text-center p-3 rounded-lg bg-green-50/50 dark:bg-emerald-900/10 border border-green-100 dark:border-emerald-900/20">
                <div className="text-2xl font-black text-green-700 dark:text-emerald-400">1,240</div>
                <div className="text-[9px] opacity-50 font-bold uppercase tracking-tighter">总管理面积 (亩)</div>
              </div>
              <div className="space-y-3">
                {['针叶林', '阔叶林', '灌木丛'].map((t, i) => (
                  <div key={i} className="flex justify-between items-center text-[11px] border-b border-gray-50 dark:border-emerald-900/10 pb-1.5">
                    <span className="opacity-70 dark:text-emerald-100">{t}</span>
                    <span className="font-bold text-green-700 dark:text-emerald-400">{30 + i * 15}%</span>
                  </div>
                ))}
              </div>
            </div>
          </EcoPanel>
          
          <EcoPanel title="快捷指令" icon={Activity} className="h-24 shrink-0">
            <div className="p-3 h-full flex items-center">
              <button className="w-full py-2.5 px-3 bg-green-600 hover:bg-green-700 text-white rounded shadow-md transition-all active:scale-95 flex items-center justify-between">
                <span className="text-[10px] font-black truncate text-left">一键全域无人机巡检</span>
                <ChevronRight size={14} className="shrink-0" />
              </button>
            </div>
          </EcoPanel>
        </aside>
      </main>

      {/* 底部状态栏 */}
      <footer className="h-6 shrink-0 flex items-center px-3 justify-between text-[9px] font-mono font-bold bg-white dark:bg-[#0a0f0d] border rounded-md dark:border-emerald-900/60">
        <div className="flex gap-4 text-green-800 dark:text-emerald-500 truncate">
          <span className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> 
            DATA_LINK: STABLE
          </span>
        </div>
        <div className="opacity-40 uppercase truncate ml-2 text-right">Agri-OS Engine v4.2</div>
      </footer>

      <style>{`
        .leaflet-container { 
          width: 100% !important; 
          height: 100% !important; 
          z-index: 1; 
          background: #f0f0f0 !important;
        }
        
        /* 关键：强制 Recharts 包裹器占据全部空间 */
        .recharts-responsive-container {
          min-width: 0 !important;
          min-height: 0 !important;
          position: absolute !important;
          top: 0;
          left: 0;
        }

        .dark .leaflet-tile {
          filter: grayscale(1) invert(0.95) brightness(0.2) contrast(1.4) sepia(0.5) hue-rotate(120deg) !important;
        }

        ::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}