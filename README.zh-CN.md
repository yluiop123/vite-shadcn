# vite-shadcn

VITE-SHADCN 是一个基于 `Shadcn` , `Vite` , `React`,`Zustand`,`React-Router` 等构建的SHADCN ADMIN UI 。

[English](./README.md) | 简体中文

<img height="500" src="./readme/images/dashboard-zh-CN.png">

<img height="500" src="./readme/images/rechart-zh-CN.png">

## 🚀 快速开始

```bash
npm install
npm run dev
```

## ✅ 任务清单

- [x] 初始化项目
- [x] 配置 Vite + React + TypeScript + React-Router + Zustand + Axios + MSW +ShadCN 环境
- [x] 动态权限路由加载
- [x] 国际化、主题色切换、暗黑模式
- [ ] 多布局
<details>
<summary>登录和路由权限控制</summary>

  - [x] 登录功能
  - [x] 路由权限控制
  - [x] 角色切换（支持融合模式）
</details>
<details>
<summary>仪表盘</summary>

  - [x] 基本仪表盘
  - [x] 态势感知-网络安全
  - [x] 态势感知-军事
  - [ ] 灾情指挥
  - [ ] 农林业管理
  - [ ] 工业管理
</details>
<details>
<summary>组件库</summary>

  - [x] 普通组件
  - [x] 布局组件
  - [x] 导航组件
  - [x] 数据展示组件
  - [x] 反馈组件
  - [x] react-hook-form 表单组件
  - [ ] tanstack/react-table 表格组件
  - [ ] 自定义组件
</details>
<details>
<summary>图表</summary>

  - [x] Rechart 图表组件
  - [x] Echart 图表组件
  - [x] D3 图表组件
  - [x] Antv 图表组件
</details>
<details>
<summary>三维</summary>

  - [x] Babylon  
  - [x] Three
</details>
<details>
<summary>地图</summary>

  - [x] Cesium地图  
  - [x] Deckgl地图
  - [x] L7地图  
  - [x] Leaflet地图
  - [x] Openlayers地图
</details>
<details>
<summary>系统管理</summary>

  - [x] 用户管理  
  - [x] 角色管理
  - [x] 权限管理
  - [x] 组织管理
</details>
<details>
<summary>后端规划</summary>

  - [ ] springboot实现后端接口
  - [ ] 实现微服务
</details>

## 🛠️ 脚本命令

| 命令        | 描述             |
|-------------|------------------|
| `dev` | `vite` |
| `build` | `tsc -b && vite build` |
| `build:github` | `tsc -b && vite build --mode github` |
| `lint` | `eslint .` |
| `preview` | `vite preview` |
| `preview:github` | `vite preview --mode github` |
| `analyze` | `cross-env ANALYZE=true vite build` |
| `readme` | `node ./readme/readme.js && node ./readme/readme-zh-CN.js` |

## 📦 依赖

- 主依赖:
  - @ant-design/charts: ^2.6.6
  - @antv/l7: ^2.23.1
  - @antv/larkmap: ^1.5.1
  - @babylonjs/core: ^8.42.0
  - @babylonjs/loaders: ^8.42.0
  - @dnd-kit/core: ^6.3.1
  - @dnd-kit/modifiers: ^9.0.0
  - @dnd-kit/sortable: ^10.0.0
  - @dnd-kit/utilities: ^3.2.2
  - @hookform/resolvers: ^5.0.1
  - @observablehq/plot: ^0.6.17
  - @radix-ui/react-accordion: ^1.2.12
  - @radix-ui/react-alert-dialog: ^1.1.15
  - @radix-ui/react-aspect-ratio: ^1.1.8
  - @radix-ui/react-avatar: ^1.1.11
  - @radix-ui/react-checkbox: ^1.3.3
  - @radix-ui/react-collapsible: ^1.1.12
  - @radix-ui/react-context-menu: ^2.2.16
  - @radix-ui/react-dialog: ^1.1.15
  - @radix-ui/react-dropdown-menu: ^2.1.16
  - @radix-ui/react-form: ^0.1.8
  - @radix-ui/react-hover-card: ^1.1.15
  - @radix-ui/react-label: ^2.1.8
  - @radix-ui/react-menubar: ^1.1.16
  - @radix-ui/react-navigation-menu: ^1.2.14
  - @radix-ui/react-popover: ^1.1.15
  - @radix-ui/react-progress: ^1.1.8
  - @radix-ui/react-radio-group: ^1.3.8
  - @radix-ui/react-scroll-area: ^1.2.10
  - @radix-ui/react-select: ^2.2.6
  - @radix-ui/react-separator: ^1.1.8
  - @radix-ui/react-slider: ^1.3.6
  - @radix-ui/react-slot: ^1.2.4
  - @radix-ui/react-switch: ^1.2.6
  - @radix-ui/react-tabs: ^1.1.13
  - @radix-ui/react-toast: ^1.2.15
  - @radix-ui/react-toggle: ^1.1.10
  - @radix-ui/react-toggle-group: ^1.1.11
  - @radix-ui/react-tooltip: ^1.2.8
  - @react-three/drei: ^10.7.7
  - @react-three/fiber: ^9.4.2
  - @tabler/icons-react: ^3.31.0
  - @tailwindcss/vite: ^4.1.3
  - @tanstack/react-table: ^8.21.3
  - @uppy/core: ^5.2.0
  - @uppy/react: ^5.1.1
  - @uppy/tus: ^5.1.0
  - axios: ^1.9.0
  - cesium: ^1.133.1
  - class-variance-authority: ^0.7.1
  - clsx: ^2.1.1
  - cmdk: ^1.1.1
  - colorjs.io: ^0.5.2
  - date-fns: ^4.1.0
  - deck.gl: ^9.2.5
  - echarts-for-react: ^3.0.2
  - embla-carousel-autoplay: ^8.6.0
  - embla-carousel-react: ^8.6.0
  - leaflet: ^1.9.4
  - leva: ^0.10.1
  - lucide-react: ^0.488.0
  - next-themes: ^0.4.6
  - ol: ^10.7.0
  - radix-ui: ^1.4.3
  - react: ^19.1.0
  - react-arborist: ^3.4.3
  - react-colorful: ^5.6.1
  - react-day-picker: ^9.13.0
  - react-dom: ^19.1.0
  - react-dropzone: ^14.4.0
  - react-hook-form: ^7.56.3
  - react-icons: ^5.5.0
  - react-intl: ^7.1.11
  - react-leaflet: ^5.0.0-rc.2
  - react-map-gl: ^8.1.0
  - react-openlayers: ^10.5.1
  - react-resizable-panels: ^3.0.6
  - react-router: ^7.6.2
  - recharts: ^2.15.3
  - resium: ^1.19.0-beta.1
  - sonner: ^2.0.7
  - tailwind-merge: ^3.2.0
  - tailwindcss: ^4.1.3
  - tailwindcss-animate: ^1.0.7
  - three: ^0.182.0
  - vaul: ^1.1.2
  - zod: ^3.24.4
  - zustand: ^5.0.5

- 开发依赖:
  - @eslint/js: ^9.24.0
  - @types/leaflet: ^1.9.21
  - @types/loadable__component: ^5.13.9
  - @types/mockjs: ^1.0.10
  - @types/node: ^22.14.1
  - @types/react: ^19.1.1
  - @types/react-dom: ^19.1.2
  - @vitejs/plugin-react-swc: ^3.8.1
  - cross-env: ^7.0.3
  - eslint: ^9.24.0
  - eslint-plugin-react-hooks: ^5.2.0
  - eslint-plugin-react-refresh: ^0.4.19
  - globals: ^16.0.0
  - msw: ^2.10.2
  - rollup-plugin-visualizer: ^6.0.3
  - tailwind-scrollbar: ^4.0.2
  - typescript: ~5.8.3
  - typescript-eslint: ^8.29.1
  - vite: ^6.2.6
  - vite-plugin-cesium-build: ^0.7.1

## 🧾 License

[MIT 协议](./LICENSE)
