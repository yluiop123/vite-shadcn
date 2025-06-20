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

const useThemeStore = create<ThemeStore>((set) => ({
  mode: "light",
  color: "default",
  setMode: (mode) => {
    document.documentElement.classList.toggle("dark", mode === "dark")
    localStorage.setItem("theme-mode", mode)
    set({
      mode,
    });
  },
  setColor: (color) => {
    document.documentElement.classList.remove("theme-blue", "theme-green", "theme-orange", "theme-red", "theme-rose", "theme-violet", "theme-yellow")
    if(color !== "default"){
        document.documentElement.classList.add(`theme-${color}`)
    }
    localStorage.setItem("theme-color", color)
    set({ color });
  },
}));

export default useThemeStore;
