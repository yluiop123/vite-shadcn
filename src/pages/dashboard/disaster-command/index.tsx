import { Float, Html, OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as d3 from 'd3-geo';
import { Package, PhoneCall, Radio, ShieldAlert, SignalLow, Users, Video, X, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
// --- 1. 类型定义 ---
interface GeoFeature {
  type: string;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    coordinates: any[];
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>;
}

interface GeoData {
  type: string;
  features: GeoFeature[];
}

interface DisasterPoint {
  id: number;
  name: string;
  lon: number;
  lat: number;
  severity: number;
  type: string;
}

interface PanelProps {
  type: 'rescue' | 'supplies';
  onClose: () => void;
}

interface MapSceneProps {
  isDark: boolean;
  activePanel: 'rescue' | 'supplies' | null;
}

const DISASTER_DATA: DisasterPoint[] = [
  { id: 1, name: "四川地震预警", lon: 104.06, lat: 30.67, severity: 1.2, type: "earthquake" },
  { id: 2, name: "广东台风登陆", lon: 113.23, lat: 23.16, severity: 1.2, type: "weather" },
  { id: 3, name: "甘肃地质灾害", lon: 103.82, lat: 36.06, severity: 0.8, type: "landslide" }
];
const ChinaMapScene: React.FC<MapSceneProps> = ({ isDark, activePanel }) => {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  
  useEffect(() => {
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(res => res.json())
      .then(data => setGeoData(data as GeoData))
      .catch(err => console.error("Map Load Error:", err));
  }, []);

  const projection = useMemo(() => {
    return d3.geoMercator()
      .center([104.1954, 35.8617])
      .scale(4.5)
      .translate([0, 0]);
  }, []);

  const mapShapes = useMemo(() => {
    if (!geoData) return [];
    const shapes: THREE.Shape[] = [];

    geoData.features.forEach((feature) => {
      const { coordinates, type } = feature.geometry;
      const processCoords = (coords: [number, number][]) => {
        const points = coords.map(coord => {
          const projected = projection(coord);
          return new THREE.Vector2(projected![0], -projected![1]);
        });
        shapes.push(new THREE.Shape(points));
      };
      if (type === "Polygon") {
        processCoords(coordinates[0]);
      } else if (type === "MultiPolygon") {
        coordinates.forEach((poly: [number, number][][]) => processCoords(poly[0]));
      }
    });
    return shapes;
  }, [geoData, projection]);

  const groupPos: [number, number, number] = activePanel ? [-1.5, -0.5, 0] : [0, -0.5, 0];

  return (
    <group rotation={[-Math.PI / 2, 0, 0]} position={groupPos}>
      {mapShapes.map((shape, i) => (
        <mesh key={i} receiveShadow>
          <extrudeGeometry args={[shape, { depth: 0.05, bevelEnabled: false }]} />
          <meshStandardMaterial 
            color={isDark ? "#1e293b" : "#cbd5e1"} 
            emissive={isDark ? "#0ea5e9" : "#475569"}
            emissiveIntensity={isDark ? 0.3 : 0.1}
          />
        </mesh>
      ))}

      {DISASTER_DATA.map((point) => {
        const projected = projection([point.lon, point.lat]);
        if (!projected) return null;
        const [x, y] = projected;
        return (
          <group key={point.id} position={[x, -y, 0.1]}>
            <mesh>
              <ringGeometry args={[0.06, 0.1, 32]} />
              <meshBasicMaterial color="#ef4444" transparent opacity={0.6} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#ff0000" />
            </mesh>
            <Html distanceFactor={6} position={[0, 0, 0.2]}>
              <div className="bg-red-600/90 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap shadow-xl border border-white/20 backdrop-blur-sm pointer-events-none">
                {point.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};


// --- 2. 核心指挥系统组件 ---
const DisasterCommandCenter = () => {
  const [isDark, setIsDark] = useState(true);
  const [activePanel, setActivePanel] = useState<"rescue" | "supplies" | null>(null);
  const [isCalling, setIsCalling] = useState(false); // 电话弹窗状态

  // 监听主题变化
  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const togglePanel = (panel: "rescue" | "supplies" | null) => setActivePanel(activePanel === panel ? null : panel);

  return (
    <div className="absolute inset-0 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden font-sans text-slate-900 dark:text-white">
      
      {/* 3D 渲染层 */}
      <div className="w-full h-full relative z-0">
<Canvas camera={{ position: [0, 6, 8], fov: 40 }} shadows gl={{ antialias: true }}>
          <color attach="background" args={[isDark ? '#020617' : '#f1f5f9']} />
          <ambientLight intensity={isDark ? 0.5 : 1.2} />
          <pointLight position={[10, 10, 10]} intensity={2.5} castShadow />
          
          <Stars radius={100} depth={50} count={isDark ? 5000 : 500} factor={4} fade />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <ChinaMapScene isDark={isDark} activePanel={activePanel} />
          </Float>

          <OrbitControls 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2.2} 
            minDistance={4} 
            maxDistance={12} 
          />

          <EffectComposer>
            <Bloom luminanceThreshold={isDark ? 0.2 : 0.9} intensity={1.5} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* UI 交互层 */}
      <div className="absolute inset-0 pointer-events-none p-6 pt-12 flex flex-col justify-between z-10">
        
        {/* 顶部: 指挥部信息 */}
        <div className="flex justify-between items-start w-full">
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border-l-4 border-red-600 p-4 rounded-r-xl shadow-2xl pointer-events-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded">
                <ShieldAlert className="text-red-600 dark:text-red-500 w-6 h-6" />
              </div>
              <div>
                <h1 className="font-black text-xl tracking-tight">应急灾情综合指挥系统</h1>
                <p className="text-slate-500 text-[10px] font-medium flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  实时数据链路已建立 | 节点: 01
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pointer-events-auto">
            <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
              <div className="text-[10px] text-slate-500 font-bold mb-1 flex items-center gap-1"><Zap size={10}/> 资源占用</div>
              <div className="text-xl font-mono text-blue-600 dark:text-blue-400 font-bold">34.8%</div>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-white/10 shadow-sm backdrop-blur-sm">
              <div className="text-[10px] text-slate-500 font-bold mb-1 flex items-center gap-1"><Radio size={10}/> 卫星链路</div>
              <div className="text-xl font-mono text-emerald-600 dark:text-emerald-400 font-bold">稳定</div>
            </div>
          </div>
        </div>

        {/* 中间: 侧边弹出面板 */}
        <div className="flex-1 flex items-center justify-end pr-4 pointer-events-none">
          {activePanel && (
            <div className="pointer-events-auto bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl shadow-2xl w-80 transition-all">
              <div className="flex justify-between items-center mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-bold flex items-center gap-2">
                  {activePanel === 'rescue' ? <Users className="text-red-500" /> : <Package className="text-blue-500" />}
                  {activePanel === 'rescue' ? '救援力量调度' : '物资储备'}
                </h3>
                <button onClick={() => setActivePanel(null)} className="hover:bg-slate-100 dark:hover:bg-slate-800 p-1 rounded-full"><X size={16} /></button>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">实时更新</p>
                  <p className="text-sm">所有节点数据已同步至最新状态。</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部: 核心指标与控制按钮 */}
        <div className="flex justify-between items-end w-full">
          <div className="space-y-3 pointer-events-auto">
            <div className="bg-white/95 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 p-4 rounded-xl w-72 shadow-lg backdrop-blur-md">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">人员疏散进度</span>
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">76.2%</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-1000" style={{width: '76.2%'}} />
              </div>
            </div>
          </div>

          {/* 控制台按钮组 */}
          <div className="pointer-events-auto flex flex-col gap-4">
            <button 
              onClick={() => togglePanel('rescue')}
              className={`p-4 rounded-full shadow-2xl transition-all hover:scale-110 ${activePanel === 'rescue' ? 'bg-red-600 text-white' : 'bg-white dark:bg-slate-900 text-red-600'}`}
            >
              <Users className="w-6 h-6" />
            </button>
            <button 
              onClick={() => togglePanel('supplies')}
              className={`p-4 rounded-full shadow-2xl transition-all hover:scale-110 ${activePanel === 'supplies' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-900 text-blue-600'}`}
            >
              <Package className="w-6 h-6" />
            </button>
            {/* 电话图标：添加点击事件和呼吸动画 */}
            <button 
              onClick={() => setIsCalling(true)}
              className="p-4 bg-emerald-600 text-white rounded-full shadow-2xl cursor-pointer hover:bg-emerald-700 hover:scale-110 transition-all flex items-center justify-center animate-pulse"
            >
               <PhoneCall className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* --- 全屏紧急通讯弹窗 --- */}
      {isCalling && (
        <div className="absolute inset-0 z-[100] bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="bg-white dark:bg-slate-900 border border-white/10 w-full max-w-md rounded-3xl shadow-[0_0_50px_rgba(16,185,129,0.2)] overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <SignalLow className="w-10 h-10 text-emerald-600 animate-bounce" />
              </div>
              <h2 className="text-2xl font-black mb-2 tracking-tight">建立紧急通讯链路</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">正在尝试通过海事卫星接入指挥中心视频会议...</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-3">
                    <Video size={18} className="text-blue-500" />
                    <span className="text-sm font-bold">省级总值班室</span>
                  </div>
                  <span className="text-xs text-emerald-500 font-mono animate-pulse font-bold">呼叫中...</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 opacity-40 cursor-not-allowed">
                  <div className="flex items-center gap-3">
                    <Video size={18} className="text-slate-400" />
                    <span className="text-sm font-bold">现场前线指挥部</span>
                  </div>
                  <span className="text-xs text-slate-400 font-bold">离线</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setIsCalling(false)}
              className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black text-lg transition-colors flex items-center justify-center gap-2"
            >
              <X size={20} /> 挂断紧急通讯
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisasterCommandCenter;