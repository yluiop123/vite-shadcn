import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// get package.json content
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf-8'));

const readme = `# ${pkg.name}

${pkg.description || 'SHADCN ADMIN UI built with Shadcn and Vite 、 React、Zustand、React-Route'}

## 🚀 Quick Start

\`\`\`bash
npm install
npm run dev
\`\`\`

## 🛠️ command

| command | description             |
|---------|-------------------------|
${Object.entries(pkg.scripts || {})
  .map(([cmd, desc]) => `| \`${cmd}\` | \`${desc}\` |`)
  .join('\n')}

## 📦 dependencies

- dependencies:
${Object.keys(pkg.dependencies || {}).map(dep => `  - ${dep}`).join('\n') || '  - none'}

- devDependencies:
${Object.keys(pkg.devDependencies || {}).map(dep => `  - ${dep}`).join('\n') || '  - none'}

## 🧾 License

${pkg.license || 'MIT'}
`;

fs.writeFileSync('README.en-US.md', readme);
console.log('✅ README.en-US.md ok');
