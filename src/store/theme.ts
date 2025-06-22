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
const useThemeStore = create<ThemeStore>((set, get) => ({
  mode: getInitialMode(),
  color: getInitialColor(),
  setMode: (mode) => {
    const root = document.documentElement;
    const color = get().color;
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
    localStorage.setItem("theme-mode", mode);
    set({
      mode,
    });
  },
  setColor: (color) => {
    const root = document.documentElement;
    // 移除旧主题类
    Array.from(root.classList)
      .filter((c) => c.startsWith("theme-"))
      .forEach((c) => root.classList.remove(c));
    if (color === "default") {
      const mode = get().mode;
      document.documentElement.classList.toggle("dark", mode === "dark");
    } else {
      let themeColor: string = `theme-${color}`;
      const mode = get().mode;
      if (mode === "dark") {
        themeColor += "-dark";
      }
      document.documentElement.classList.add(themeColor);
    }
    localStorage.setItem("theme-color", color);
    set({ color });
  },
}));

export default useThemeStore;
