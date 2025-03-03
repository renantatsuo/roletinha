import en from "./en.json";
import ptBR from "./ptBR.json";

export const i18n = (() => {
  const locale = window.navigator.language;
  switch (locale) {
    case "pt-BR":
      return ptBR;
    default:
      return en;
  }
})();
