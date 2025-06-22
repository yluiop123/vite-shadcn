import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { ConfigEnv, defineConfig, loadEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), "");
  // 默认为根路径
  const base = env.VITE_BASE || "/";
  const mockEnable: boolean = (env.VITE_MOCK_ENABLE || "true") === "true";
  console.log(mockEnable)
  return {
    base,
    // 其他配置...
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [
      react(),
      viteMockServe({
        // default
        mockPath: "mock",
        enable: mockEnable,
      }),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
