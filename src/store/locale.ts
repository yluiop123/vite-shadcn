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
function getLocal(): Locale {
  const lang = navigator.language.split("-")[0] as Locale;
  if (typeof window === "undefined"){
    localStorage.setItem("locale", lang);
    return lang;
  }else if (!localStorage.getItem("locale")) {
    localStorage.setItem("locale", lang);
    return lang;
  }else{
    return (localStorage.getItem("locale") as Locale);
  }
}
const useLocaleStore = create<LocaleStore>((set) => {
  const initialLocale = getLocal();
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
