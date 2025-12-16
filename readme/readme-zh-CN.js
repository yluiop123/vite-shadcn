import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 同步读取 package.json 内容
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

const readme = `# ${pkg.name}

${pkg.description || 'VITE-SHADCN 是一个基于 `Shadcn` , `Vite` , `React`,`Zustand`,`React-Router` 等构建的SHADCN ADMIN UI 。'}

[English](./README.md) | 简体中文

<img height="500" src="./readme/images/dashboard-zh-CN.png">

<img height="500" src="./readme/images/rechart-zh-CN.png">

## 🚀 快速开始

\`\`\`bash
npm install
npm run dev
\`\`\`

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
  - [ ] 态势感知-网络安全
  - [ ] 态势感知-军事
  - [ ] 灾情指挥
  - [ ] 农林业管理
  - [ ] 工业管理
</details>
<details>
<summary>组件库</summary>

  - [ ] 普通组件
  - [ ] react-hook-form 表单组件
  - [ ] tanstack/react-table 表格组件
  - [ ] 自定义组件
</details>
<details>
<summary>图表</summary>

  - [x] Rechart 图表组件
  - [x] Echart 图表组件
  - [x] D3 图表组件
  - [ ] Antv 图表组件
</details>
<details>
<summary>三维</summary>

  - [ ] Babylon  
  - [ ] Three
</details>
<details>
<summary>地图</summary>

  - [x] Cesium地图  
  - [ ] Deckgl地图
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
${Object.entries(pkg.scripts || {})
  .map(([cmd, desc]) => `| \`${cmd}\` | \`${desc}\` |`)
  .join('\n')}

## 📦 依赖

- 主依赖:
${Object.keys(pkg.dependencies || {}).map(dep => `  - ${dep}: ${pkg.dependencies[dep]}`).join('\n') || '  - 无'}

- 开发依赖:
${Object.keys(pkg.devDependencies || {}).map(dep => `  - ${dep}: ${pkg.devDependencies[dep]}`).join('\n') || '  - 无'}

## 🧾 License

[MIT 协议](./LICENSE)
`;

fs.writeFileSync('README.zh-CN.md', readme);
console.log('✅ README.zh-CN.md 已生成');
