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
