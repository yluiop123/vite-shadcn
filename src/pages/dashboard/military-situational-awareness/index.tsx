import { useThemeStore } from '@/store/index';
import 'leaflet/dist/leaflet.css';
import { Cpu, Radar, Radio, ShieldAlert, Zap } from 'lucide-react';
import React, { ReactNode, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer } from 'recharts';

function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 300);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

const TacticalPanel = ({ title, children, flex = "1" }: { title: string, children: ReactNode, flex?: string }) => (
  <section 
    className="flex flex-col min-h-0 min-w-0 border transition-colors duration-300 bg-white border-slate-200 dark:bg-[#0d1117] dark:border-blue-900/40"
    style={{ flex }}
  >
    <div className="px-2 py-1 shrink-0 flex justify-between items-center border-b bg-slate-50 border-slate-200 dark:bg-blue-900/10 dark:border-blue-900/40">
      <h2 className="text-[10px] font-bold uppercase tracking-tighter text-slate-600 dark:text-blue-400">
        {title}
      </h2>
    </div>
    <div className="flex-1 relative min-h-0 w-full overflow-hidden">
      {children}
    </div>
  </section>
);

export default function MissionControl() {
  const { mode } = useThemeStore(); 
  const [data] = React.useState(() => Array.from({ length: 20 }, () => ({ val: 30 + Math.random() * 40 })));

  // 同步 mode 到 HTML 根节点，驱动 Tailwind dark: 类
  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [mode]);

  return (
    <div className="h-screen w-full overflow-hidden flex flex-col p-2 gap-2 box-border transition-colors duration-500 bg-[#f6f8fa] text-slate-900 dark:bg-[#010409] dark:text-white">
      
      {/* Header */}
      <header className="h-12 shrink-0 flex items-center justify-between px-4 border rounded-sm box-border bg-white border-slate-200 dark:bg-[#0d1117] dark:border-blue-900/40">
        <div className="flex items-center gap-3">
          <Radar className="text-blue-600 dark:text-blue-500" size={20} />
          <h1 className="font-black italic tracking-tighter text-sm">MISSION_CONTROL_v13</h1>
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-blue-900/40 bg-slate-50 dark:bg-blue-900/20">
           <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
             mode === 'dark' ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' : 'bg-orange-400 shadow-[0_0_8px_#fb923c]'
           }`} />
           <span className="text-[10px] font-mono font-bold uppercase">
             {mode}_MODE_ACTIVE
           </span>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex gap-2 min-h-0 w-full box-border">
        {/* 左侧栏 */}
        <aside className="w-1/5 flex flex-col gap-2 min-h-0 shrink-0">
          <TacticalPanel title="SYSTEM_LOG" flex="2">
             <div className="p-2 space-y-2 font-mono text-[9px] overflow-y-auto h-full">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="p-2 border rounded border-slate-100 bg-slate-50 dark:border-blue-900/30 dark:bg-blue-950/10 dark:text-blue-400">
                    NODE_{i * 102} :: OK
                  </div>
                ))}
             </div>
          </TacticalPanel>
          <TacticalPanel title="WAVE_FORM" flex="1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <Area type="step" dataKey="val" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1}/>
              </AreaChart>
            </ResponsiveContainer>
          </TacticalPanel>
        </aside>

        {/* 右侧主区 */}
        <div className="flex-1 flex flex-col gap-2 min-h-0 min-w-0">
          <div className="flex-[2.5] flex gap-2 min-h-0 w-full">
            {/* 地图容器 - 通过 CSS 类名关联暗色滤镜 */}
            <div className="flex-1 min-w-0 border relative overflow-hidden bg-slate-100 border-slate-200 dark:border-blue-900/60 dark:bg-black">
              <MapContainer 
                center={[31.23, 121.47]} zoom={10} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <MapResizer />
                {/* 我们使用标准的 Voyager 瓦片，通过 CSS 滤镜变色 */}
                <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />
              </MapContainer>
              {/* 暗色模式下的内阴影叠加层，增加深度感 */}
              <div className="absolute inset-0 pointer-events-none z-[400] hidden dark:block shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
            </div>

            <div className="w-1/4 flex flex-col gap-2 min-h-0 shrink-0">
              <TacticalPanel title="HARDWARE" flex="1">
                 <div className="grid grid-cols-2 p-2 gap-2 h-full">
                   {[Zap, ShieldAlert, Cpu, Radio].map((Icon, i) => (
                     <div key={i} className="flex flex-col items-center justify-center border rounded border-slate-100 bg-slate-50 text-slate-500 dark:border-blue-900/30 dark:bg-blue-900/10 dark:text-blue-400">
                        <Icon size={14} />
                        <span className="text-[7px] font-black mt-1 uppercase">MOD-{i}</span>
                     </div>
                   ))}
                 </div>
              </TacticalPanel>
              <TacticalPanel title="VECTOR" flex="1.5">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data} layout="vertical">
                        <Area type="monotone" dataKey="val" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1}/>
                      </AreaChart>
                    </ResponsiveContainer>
              </TacticalPanel>
            </div>
          </div>

          <div className="flex-1 flex gap-2 min-h-0 w-full overflow-hidden">
            <TacticalPanel title="THROUGHPUT">
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={data}>
                   <Line type="monotone" dataKey="val" stroke="#3b82f6" dot={false} strokeWidth={2}/>
                 </LineChart>
               </ResponsiveContainer>
            </TacticalPanel>
            <TacticalPanel title="CONSOLE">
               <div className="p-2 font-mono text-[9px] h-full overflow-hidden text-slate-500 dark:text-blue-500">
                  <p>{">"} MAP_FILTER_ACTIVE: {mode === 'dark' ? 'TRUE' : 'FALSE'}</p>
                  <p className="opacity-40 mt-1 uppercase">UI_THEME_SYNC: OK</p>
               </div>
            </TacticalPanel>
          </div>
        </div>
      </main>

      <footer className="h-6 shrink-0 flex items-center px-4 justify-between text-[9px] font-black transition-all bg-slate-800 text-white dark:bg-blue-600 dark:text-black">
        <span>STRATOS_INTERFACE_CORE</span>
        <span className="opacity-70 font-mono tracking-widest uppercase">No_Overflow_Active</span>
      </footer>

      {/* --- 核心 CSS 控制 --- */}
      <style>{`
        html, body, #root { margin: 0; padding: 0; overflow: hidden; width: 100%; height: 100%; }
        
        /* 核心逻辑：在暗黑模式下对地图瓦片进行反相处理 */
        .dark .leaflet-tile {
          filter: grayscale(1) invert(1) brightness(0.6) contrast(1.2) hue-rotate(180deg) !important;
        }
        
        /* 这里的背景色防止地图加载时的闪烁 */
        .dark .leaflet-container {
          background: #000 !important;
        }

        .leaflet-container { 
          width: 100% !important; 
          height: 100% !important; 
        }
        
        .recharts-responsive-container { min-width: 0 !important; }
      `}</style>
    </div>
  );
}