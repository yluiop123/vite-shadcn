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
const themeColors: string[] = [
  "theme-blue",
  "theme-green",
  "theme-orange",
  "theme-red",
  "theme-rose",
  "theme-violet",
  "theme-yellow",
];
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
const useThemeStore = create<ThemeStore>((set) => ({
  mode: getInitialMode(),
  color: getInitialColor(),
  setMode: (mode) => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    localStorage.setItem("theme-mode", mode);
    set({
      mode,
    });
  },
  setColor: (color) => {
    document.documentElement.classList.remove(...themeColors);
    if (color !== "default") {
      document.documentElement.classList.add(`theme-${color}`);
    }
    localStorage.setItem("theme-color", color);
    set({ color });
  },
}));

export default useThemeStore;
