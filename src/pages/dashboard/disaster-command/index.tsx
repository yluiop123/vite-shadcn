import { Float, Html, OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as d3 from 'd3-geo';
import {
  Package, PhoneCall,
  SignalLow, Users,
  X, Zap
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

// --- 1. 类型定义 ---
interface GeoFeature {
  type: string;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: any[];
  };
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
}

const DISASTER_DATA: DisasterPoint[] = [
  { id: 1, name: "四川地震预警", lon: 104.06, lat: 30.67 },
  { id: 2, name: "广东台风登陆", lon: 113.23, lat: 23.16 },
  { id: 3, name: "甘肃地质灾害", lon: 103.82, lat: 36.06 }
];

// --- 2. 3D 地图场景组件 ---
const ChinaMapScene: React.FC<{ isDark: boolean }> = ({ isDark }) => {
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  
  useEffect(() => {
    fetch('https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json')
      .then(res => res.json())
      .then(data => setGeoData(data as GeoData))
      .catch(err => console.error("Map Load Error:", err));
  }, []);

  const projection = useMemo(() => {
    return d3.geoMercator().center([104.1954, 35.8617]).scale(4.5).translate([0, 0]);
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
      if (type === "Polygon") processCoords(coordinates[0]);
      else if (type === "MultiPolygon") coordinates.forEach((poly: any) => processCoords(poly[0]));
    });
    return shapes;
  }, [geoData, projection]);

  return (
    // position 设为 [0, -0.5, 0] 且不随 activePanel 改变，保证地图不动
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      {mapShapes.map((shape, i) => (
        <mesh key={i}>
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
            <mesh><sphereGeometry args={[0.05, 16, 16]} /><meshBasicMaterial color="#ff0000" /></mesh>
            <Html distanceFactor={8} position={[0, 0, 0.2]}>
              <div className="bg-red-600 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap">
                {point.name}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};

// --- 3. 主指挥中心组件 ---
const DisasterCommandCenter = () => {
  const [isDark, setIsDark] = useState(true);
  const [activePanel, setActivePanel] = useState<"rescue" | "supplies" | null>(null);
  const [isCalling, setIsCalling] = useState(false);

  return (
    <div className="absolute inset-0 bg-slate-50 dark:bg-[#020617] transition-colors duration-500 overflow-hidden font-sans">
      
      {/* 3D 渲染层 - 占满全屏 */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 6, 8], fov: 40 }}>
          <color attach="background" args={[isDark ? '#020617' : '#f1f5f9']} />
          <ambientLight intensity={isDark ? 0.6 : 1.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          {isDark && <Stars radius={100} depth={50} count={5000} factor={4} fade />}
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
            <ChinaMapScene isDark={isDark} />
          </Float>
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.2} />
          <EffectComposer>
            <Bloom luminanceThreshold={isDark ? 0.2 : 0.8} intensity={1} />
          </EffectComposer>
        </Canvas>
      </div>

      {/* UI 覆盖层 */}
      <div className="relative z-10 w-full h-full pointer-events-none p-8 flex flex-col justify-between">
        
        {/* 顶部标题 */}
        <div className="flex justify-between items-start">
          <div className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-md border-l-4 border-red-600 p-5 rounded-r-2xl shadow-2xl pointer-events-auto">
            <h1 className="font-black text-2xl dark:text-white">应急指挥系统</h1>
            <p className="text-slate-500 text-xs font-bold flex items-center gap-2 tracking-widest">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              LIVE DATA STREAMING
            </p>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-900/60 p-4 rounded-xl backdrop-blur-sm pointer-events-auto border border-white/10 shadow-lg">
             <div className="text-[10px] text-slate-500 font-black mb-1 flex items-center gap-1 uppercase tracking-widest"><Zap size={12}/> 系统负荷</div>
             <div className="text-2xl font-mono text-blue-500 font-black tracking-tighter">34.8%</div>
          </div>
        </div>

        {/* 侧边弹窗 - 覆盖在地图右侧之上 */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-80 pointer-events-none">
          {activePanel && (
            <div className="pointer-events-auto bg-white/95 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 p-6 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in slide-in-from-right-10 fade-in duration-300 backdrop-blur-xl">
              <div className="flex justify-between items-center mb-6 border-b dark:border-slate-800 pb-4">
                <h3 className="font-black text-xl flex items-center gap-3 dark:text-white">
                  {activePanel === 'rescue' ? <Users className="text-red-500" /> : <Package className="text-blue-500" />}
                  {activePanel === 'rescue' ? '救援调度' : '物资保障'}
                </h3>
                <button onClick={() => setActivePanel(null)} className="dark:text-slate-400 hover:text-white"><X size={20} /></button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                  <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-widest">实时状态</p>
                  <p className="text-sm dark:text-slate-200 leading-relaxed font-medium">
                    {activePanel === 'rescue' ? '已向震中地区指派 3 支先遣救援组。' : '华南配送中心已调拨 500 顶帐篷。'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 底部控制 */}
        <div className="flex justify-between items-end">
          <div className="pointer-events-auto bg-white/95 dark:bg-slate-950/90 p-5 rounded-2xl w-72 shadow-xl border border-white/10 backdrop-blur-md">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] font-black dark:text-slate-400 uppercase">撤离进度</span>
              <span className="text-xs font-mono font-black text-emerald-500">88.2%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500" style={{width: '88.2%'}} />
            </div>
          </div>

          <div className="pointer-events-auto flex flex-col gap-4">
            <button onClick={() => setActivePanel(activePanel === 'rescue' ? null : 'rescue')} className={`p-5 rounded-full shadow-2xl transition-all ${activePanel === 'rescue' ? 'bg-red-600 text-white scale-110' : 'bg-white dark:bg-slate-900 text-red-600'}`}><Users size={28} /></button>
            <button onClick={() => setActivePanel(activePanel === 'supplies' ? null : 'supplies')} className={`p-5 rounded-full shadow-2xl transition-all ${activePanel === 'supplies' ? 'bg-blue-600 text-white scale-110' : 'bg-white dark:bg-slate-900 text-blue-600'}`}><Package size={28} /></button>
            <button onClick={() => setIsCalling(true)} className="p-5 bg-emerald-600 text-white rounded-full animate-pulse shadow-2xl"><PhoneCall size={28} /></button>
          </div>
        </div>
      </div>

      {/* 全屏紧急通话 */}
      {isCalling && (
        <div className="absolute inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="bg-slate-900 border border-white/10 w-full max-w-sm rounded-[3rem] p-10 text-center shadow-2xl">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/30">
              <SignalLow className="text-emerald-500 w-10 h-10 animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-white mb-8">呼叫指挥中心...</h2>
            <button onClick={() => setIsCalling(false)} className="w-full py-5 bg-red-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-red-700 transition-colors">
              <X size={20} /> 挂断
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisasterCommandCenter;