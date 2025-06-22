import en from '@/locale/en-US';
import zh from '@/locale/zh-CN';
import { create } from "zustand";

type Locale = "zh" | "en";

interface LocaleStore {
  locale: Locale;
  messages: Record<string, string>;
  setLocale: (locale: Locale) => void;
}

const localeMap = {
  zh,
  en,
};

const useLocaleStore = create<LocaleStore>((set) => {
  const initialLocale = (localStorage.getItem("locale") as Locale) || "zh";
  return {
    locale: initialLocale,
    messages: localeMap[initialLocale],
    setLocale: (locale) => {
      localStorage.setItem("locale", locale);
      set({ locale, messages: localeMap[locale] });
    },
  };
});
export default useLocaleStore;
