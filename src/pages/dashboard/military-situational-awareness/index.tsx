import 'leaflet/dist/leaflet.css';
import { Cpu, Moon, Radar, Radio, ShieldAlert, Sun, Zap } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Area, AreaChart, Line, LineChart, ResponsiveContainer } from 'recharts';

// --- 地图自动刷新组件 ---
function MapResizer() {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => map.invalidateSize(), 300);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
}

// --- 通用面板 ---
const TacticalPanel = ({ title, children, isDark, flex = "1" }: { title: string, children: ReactNode, isDark: boolean, flex?: string }) => (
  <section 
    className={`border flex flex-col min-h-0 min-w-0 transition-colors duration-300 ${
      isDark ? 'bg-[#0d1117] border-blue-900/40' : 'bg-white border-slate-200 shadow-sm'
    }`}
    style={{ flex }}
  >
    <div className={`px-2 py-1 shrink-0 flex justify-between items-center border-b ${
      isDark ? 'bg-blue-900/10 border-blue-900/40' : 'bg-slate-50 border-slate-200'
    }`}>
      <h2 className={`text-[10px] font-bold uppercase tracking-tighter ${isDark ? 'text-blue-400' : 'text-slate-600'}`}>
        {title}
      </h2>
    </div>
    <div className="flex-1 relative min-h-0 w-full overflow-hidden">
      {children}
    </div>
  </section>
);

export default function MissionControl() {
  const [data] = useState(() => Array.from({ length: 20 }, () => ({ val: 30 + Math.random() * 40 })));
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    // 使用 h-full 代替 h-screen 防止移动端视口溢出，确保 box-sizing 正常
    <div className={`h-screen w-full overflow-hidden flex flex-col p-2 gap-2 box-border transition-colors duration-500 ${
      isDark ? 'bg-[#010409] text-white' : 'bg-[#f6f8fa] text-slate-900'
    }`}>
      
      {/* 1. Header (固定高度) */}
      <header className={`h-12 shrink-0 flex items-center justify-between px-4 border rounded-sm box-border ${
        isDark ? 'bg-[#0d1117] border-blue-900/40' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-center gap-3">
          <Radar className={isDark ? "text-blue-500 animate-pulse" : "text-blue-600"} size={20} />
          <h1 className="font-black italic tracking-tighter text-sm">MISSION_CONTROL_v9</h1>
        </div>
        
        <button 
          onClick={() => setIsDark(!isDark)}
          className={`flex items-center gap-2 px-3 py-1 rounded border text-[10px] font-bold transition-all ${
            isDark ? 'border-blue-700 bg-blue-900/20 text-blue-300 hover:bg-blue-800/40' : 'border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          {isDark ? <Sun size={12} /> : <Moon size={12} />}
          {isDark ? "THEME: DARK" : "THEME: LIGHT"}
        </button>
      </header>

      {/* 2. Main Body (限制宽度并填满高度) */}
      <main className="flex-1 flex gap-2 min-h-0 w-full box-border">
        
        {/* 左侧栏 */}
        <aside className="w-1/5 flex flex-col gap-2 min-h-0 shrink-0">
          <TacticalPanel title="UNIT_STATUS" isDark={isDark} flex="2">
             <div className="p-2 space-y-2 font-mono text-[9px] overflow-y-auto h-full">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`p-2 border rounded ${isDark ? 'border-blue-900/30 bg-blue-950/10 text-blue-400' : 'border-slate-100 bg-slate-50'}`}>
                    SIGNAL_STREAM_{i * 102} OK
                  </div>
                ))}
             </div>
          </TacticalPanel>
          <TacticalPanel title="FREQUENCIES" isDark={isDark} flex="1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Area type="step" dataKey="val" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1}/>
              </AreaChart>
            </ResponsiveContainer>
          </TacticalPanel>
        </aside>

        {/* 右侧主区 */}
        <div className="flex-1 flex flex-col gap-2 min-h-0 min-w-0">
          
          {/* 上半：地图容器 */}
          <div className="flex-[2.5] flex gap-2 min-h-0 w-full overflow-hidden">
            <div className={`flex-1 min-w-0 border relative overflow-hidden transition-all ${
              isDark ? 'border-blue-900/60 bg-black' : 'border-slate-200 bg-white'
            }`}>
              <MapContainer 
                center={[31.23, 121.47]} zoom={10} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <MapResizer />
                <TileLayer url={isDark ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"} />
              </MapContainer>
              {isDark && <div className="absolute inset-0 pointer-events-none z-[400] shadow-[inset_0_0_80px_rgba(0,0,0,0.7)]" />}
            </div>

            {/* 核心指标 */}
            <div className="w-1/4 flex flex-col gap-2 min-h-0 shrink-0">
              <TacticalPanel title="ASSETS" isDark={isDark} flex="1">
                 <div className="grid grid-cols-2 p-2 gap-2 h-full">
                   {[Zap, ShieldAlert, Cpu, Radio].map((Icon, i) => (
                     <div key={i} className={`flex flex-col items-center justify-center border rounded ${isDark ? 'border-blue-900/30 bg-blue-900/10 text-blue-400' : 'border-slate-100 bg-slate-50'}`}>
                        <Icon size={14} />
                        <span className="text-[7px] font-black mt-1 uppercase">ID-{i}</span>
                     </div>
                   ))}
                 </div>
              </TacticalPanel>
              <TacticalPanel title="DETECTION" isDark={isDark} flex="1.5">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data} layout="vertical" margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                        <Area type="monotone" dataKey="val" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1}/>
                      </AreaChart>
                    </ResponsiveContainer>
              </TacticalPanel>
            </div>
          </div>

          {/* 下半：日志和数据流 */}
          <div className="flex-1 flex gap-2 min-h-0 w-full overflow-hidden">
            <TacticalPanel title="DATA_THROUGHPUT" isDark={isDark}>
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                   <Line type="monotone" dataKey="val" stroke="#3b82f6" dot={false} strokeWidth={2}/>
                 </LineChart>
               </ResponsiveContainer>
            </TacticalPanel>
            <TacticalPanel title="CONSOLE_LOG" isDark={isDark}>
               <div className={`p-2 font-mono text-[9px] h-full overflow-hidden ${isDark ? 'text-blue-500' : 'text-slate-500'}`}>
                  <p className="animate-pulse">{">"} SYNC_COMPLETED_SUCCESSFULLY</p>
                  <p className="opacity-40 mt-1">THEME_ENGINE_STATE: {isDark ? 'NIGHT' : 'DAYLIGHT'}</p>
                  <p className="opacity-40">AUTO_SCALE: 100%_FIT</p>
               </div>
            </TacticalPanel>
          </div>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className={`h-6 shrink-0 flex items-center px-4 justify-between text-[9px] font-black transition-all ${
        isDark ? 'bg-blue-600 text-black' : 'bg-slate-800 text-white shadow-inner'
      }`}>
        <span className="tracking-tighter">OS_EMBEDDED_CONTROL_LAYER</span>
        <span className="opacity-70 font-mono tracking-widest uppercase">No_Overflow_Active</span>
      </footer>

      {/* 关键注入样式：重置全局边距 */}
      <style>{`
        html, body, #root { 
          margin: 0 !important; 
          padding: 0 !important; 
          overflow: hidden !important; 
          width: 100% !important;
          height: 100% !important;
        }
        .leaflet-container { 
          width: 100% !important; 
          height: 100% !important; 
          background: transparent !important;
        }
        ${isDark ? '.leaflet-container { filter: grayscale(1) invert(1) brightness(0.2) contrast(1.2); }' : ''}
        .recharts-responsive-container { min-width: 0 !important; }
      `}</style>
    </div>
  );
}