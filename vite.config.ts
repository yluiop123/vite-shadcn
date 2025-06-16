import tailwindcss from "@tailwindcss/vite"
import react from '@vitejs/plugin-react-swc'
import path from "path"
import { defineConfig, loadEnv } from 'vite'
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // 默认为根路径
  let base = '/'

  // 如果指定了平台是 github，使用子路径
  if (env.VITE_PLATFORM === 'github') {
    base = '/你的项目名/' // ⚠️ 替换为你的 GitHub 项目名
  }

  return {
    base,
    // 其他配置...
  server: {
    port: 3000,
    host:"0.0.0.0"
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  }
})
