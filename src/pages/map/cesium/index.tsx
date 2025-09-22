
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { Viewer } from "resium";
export default function Index() {
    return (
    // flex-1 + min-h-0 保证本层能占满并允许内部高度为 100%
    <div className="flex-1 min-h-0 relative">
      {/* 直接用 h-full 让 Viewer 填满父容器 */}
      <div className="w-full h-full min-h-0">
        <Viewer 
        style={{ width: "100%", height: "100%" }} 
        fullscreenButton={false}
        timeline={false}
        animation={false}
        />
      </div>
    </div>
    )
}
