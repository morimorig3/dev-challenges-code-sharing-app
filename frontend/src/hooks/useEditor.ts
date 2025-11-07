import defaultHTML from "@/assets/template.html?raw";
import { getSnippet } from "@/lib/getSnippet";
import { useMonaco } from "@monaco-editor/react";
import { useEffect, useState } from "react";

const DEFAULT_THEME = "light";
const DEFAULT_LANGUAGE = "html";
const BUILT_IN_THEMES = ["vs", "vs-dark", "hc-black", "hc-light"] as const;

export const useEditor = () => {
  const [code, setCode] = useState(defaultHTML);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const monaco = useMonaco();
  const languages = monaco?.languages.getLanguages() ?? [];

  useEffect(() => {
    (async () => {
      const url = new URLSearchParams(window.location.search);
      const id = url.get("id") ?? "";
      if (id) {
        const data = await getSnippet(id);
        if (data) {
          setCode(data.code);
          setTheme(data.theme);
          setLanguage(data.language);
        }
      }
    })();
  }, []);

  return {
    code,
    theme,
    language,
    languageItems: languages.map((language) => ({
      label: language.aliases ? language.aliases[0] : language.id,
      value: language.id,
    })),
    themeItems: BUILT_IN_THEMES.map((theme) => ({
      label: theme,
      value: theme,
    })),
    handlers: {
      onChangeLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
      },
      onChangeTheme: (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTheme(event.target.value);
      },
      onChangeCode: (value: string | undefined) => {
        setCode(value ?? "");
      },
    },
  };
};
