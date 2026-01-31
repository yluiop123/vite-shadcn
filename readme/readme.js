import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get package.json content
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

const readme = `# ${pkg.name}

${pkg.description || 'VITE-SHADCN is a Shadcn Admin UI built with `Shadcn` , `Vite` , `React`,`Zustand`,`React-Router`'}

English | [简体中文](./README.zh-CN.md)

<img height="500" src="./readme/images/dashboard.png">

<img height="500" src="./readme/images/rechart.png">

## 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## ✅ Task List

- [x] Initialize the project
- [x] Set up environment: Vite + React + TypeScript + React Router + Zustand + Axios + MSW + ShadCN
- [x] Implement dynamic permission-based routing
- [x] Internationalization, theme color switching, and dark mode
- [ ] Multiple layouts
<details>
<summary>Login and Route Permission Control</summary>

  - [x] Login functionality
  - [x] Route access control
  - [x] Role switching (supports fusion mode)

</details>

<details>
<summary>Dashboard</summary>

  - [x] Basic dashboard
  - [x] Situational Awareness - Cybersecurity
  - [x] Situational Awareness - Military
  - [ ] Disaster Command
  - [ ] Agriculture and Forestry Management
  - [ ] Industrial Management

</details>

<details>
<summary>Component Library</summary>

  - [x] General components
  - [x] Layout components
  - [x] Navigation components
  - [x] Data display components
  - [x] Feedback components
  - [x] Form components (react-hook-form)
  - [ ] Table components (tanstack/react-table)
  - [ ] AI components
  - [ ] Custom components

</details>

<details>
<summary>Charts</summary>

  - [x] Recharts components
  - [x] ECharts components
  - [x] D3 components
  - [x] AntV components

</details>

<details>
<summary>3D</summary>

  - [x] Babylon  
  - [x] Three.js

</details>

<details>
<summary>Map</summary>

  - [x] Cesium  
  - [x] Deck.gl  
  - [x] L7  
  - [x] Leaflet 
  - [x] OpenLayers

</details>

<details>
<summary>System Management</summary>

  - [x] User Management  
  - [x] Role Management  
  - [x] Permission Management  
  - [x] Group Management  

</details>

<details>
<summary>Backend Plan</summary>

  - [ ] Develop backend APIs using Spring Boot  
  - [ ] Implement microservices

</details>


## 🛠️ command

| command | description             |
|---------|-------------------------|
${Object.entries(pkg.scripts || {})
  .map(([cmd, desc]) => `| \`${cmd}\` | \`${desc}\` |`)
  .join('\n')}

## 📦 dependencies

- dependencies:
${Object.keys(pkg.dependencies || {}).map(dep => `  - ${dep}: ${pkg.dependencies[dep]}`).join('\n') || '  - none'}

- devDependencies:
${Object.keys(pkg.devDependencies || {}).map(dep => `  - ${dep}: ${pkg.devDependencies[dep]}`).join('\n') || '  - none'}

## 🧾 License

This project is [MIT licensed](./LICENSE).
`;

fs.writeFileSync('README.md', readme);
console.log('✅ README.md ok');
