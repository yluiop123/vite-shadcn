import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 同步读取 package.json 内容
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));

const readme = `# ${pkg.name}

${pkg.description || '一个基于现代工具构建的前端项目。'}

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
${Object.keys(pkg.dependencies || {}).map(dep => `  - ${dep}`).join('\n') || '  - 无'}

- 开发依赖:
${Object.keys(pkg.devDependencies || {}).map(dep => `  - ${dep}`).join('\n') || '  - 无'}

## 🧾 License

${pkg.license || 'MIT'}
`;

fs.writeFileSync('README.md', readme);
console.log('✅ README.md 已生成');
