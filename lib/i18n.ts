export type Lang = "en" | "ur";
type Dict = Record<string, any>;

const en: Dict = {
  brand: "RentBack",
  toggle: { en: "English", ur: "اردو", theme: "Theme", light: "Light", dark: "Dark", system: "System" },
};

const ur: Dict = {
  brand: "RentBack",
  toggle: { en: "English", ur: "اردو", theme: "تھیم", light: "لائٹ", dark: "ڈارک", system: "سسٹم" },
};

export function getCopy(lang: Lang): Dict {
  return lang === "ur" ? ur : en;
}
