import { create } from "zustand";

export type Mode = "light" | "dark";
export type Color =
  | "default"
  | "blue"
  | "green"
  | "orange"
  | "red"
  | "rose"
  | "violet"
  | "yellow";
interface ThemeStore {
  mode: Mode;
  color: Color;
  initTheme: () => void;
  setMode: (m: Mode) => void;
  setColor: (c: Color) => void;
}
function getInitialMode(): Mode {
  if (typeof window === "undefined") return "light";
  return (localStorage.getItem("theme-mode") as Mode) || "light";
}

function getInitialColor(): Color {
  if (typeof window === "undefined") return "default";
  return (localStorage.getItem("theme-color") as Color) || "default";
}
function setModeColor(color: Color, mode: Mode): void {
  const root = document.documentElement;
  // 移除旧主题类
  Array.from(root.classList)
    .filter((c) => c.startsWith("theme-"))
    .forEach((c) => root.classList.remove(c));
  if (color === "default") {
    document.documentElement.classList.toggle("dark", mode === "dark");
  } else {
    let themeColor: string = `theme-${color}`;
    if (mode === "dark") {
      themeColor += "-dark";
    }
    document.documentElement.classList.add(themeColor);
  }
}
const useThemeStore = create<ThemeStore>((set, get) => {
  const initTheme = () => {
    const mode = getInitialMode();
    const color = getInitialColor();
    setModeColor(color, mode);
    set({ mode, color });
  };

  // 初始执行一次
  initTheme();
  return {
    mode: "light", // 默认值，仅作为占位
    color: "default",
    setMode: (mode) => {
      const color = get().color;
      setModeColor(color, mode);
      localStorage.setItem("theme-mode", mode);
      set({ mode });
    },
    setColor: (color) => {
      setModeColor(color, get().mode);
      localStorage.setItem("theme-color", color);
      set({ color });
    },
    initTheme,
  };
});
export default useThemeStore;
