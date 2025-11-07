import { Select } from "./common/select";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Editor, useMonaco } from "@monaco-editor/react";
import defaultHTML from "@/assets/template.html?raw";
import axios from "axios";
import { useEffect, useState, type ComponentProps } from "react";
import { ShareIcon } from "./icons/share";
import { LinkIcon } from "./icons/link";

const DEFAULT_THEME = "light";
const DEFAULT_LANGUAGE = "html";
const BUILT_IN_THEMES = ["vs", "vs-dark", "hc-black", "hc-light"] as const;

export const CodeCard = () => {
  const [code, setCode] = useState(defaultHTML);
  const [canShare, setCanShare] = useState(false);
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [url, setUrl] = useState("");
  const monaco = useMonaco();
  const languages = monaco?.languages.getLanguages() ?? [];

  const handleChangeLanguages: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setLanguage(event.target.value);
  };

  const handleChangeTheme: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setTheme(event.target.value);
  };

  const handleChangeCode: ComponentProps<typeof Editor>["onChange"] = (
    value
  ) => {
    setCode(value ?? "");
    setCanShare(true);
  };

  const handleClickShare: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const snippet = await createCode({
      code,
      theme,
      language,
    });
    if (snippet) {
      setUrl(`${window.location.href}?id=${snippet.id}`);
      setCanShare(false);
    }
  };

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

  return (
    <Card>
      <CardContent>
        <Editor
          height="50vh"
          theme={theme}
          value={code}
          language={language}
          defaultLanguage={language}
          onChange={handleChangeCode}
        />
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full items-baseline">
          <div className="flex gap-x-2">
            <div className="w-20">
              <Select
                value={language}
                onChange={handleChangeLanguages}
                items={languages.map((language) => ({
                  label: language.aliases ? language.aliases[0] : language.id,
                  value: language.id,
                }))}
              />
            </div>
            <div className="w-20">
              <Select
                value={theme}
                onChange={handleChangeTheme}
                items={BUILT_IN_THEMES.map((theme) => ({
                  label: theme,
                  value: theme,
                }))}
              />
            </div>
          </div>
          <div className="flex gap-x-4 items-center">
            {url.length !== 0 && (
              <a
                className="flex gap-x-2 font-semibold hover:underline text-[#364153]"
                target="_blank"
                href={url}
              >
                <LinkIcon />
                {`...${url.slice(-10, url.length)}`}
              </a>
            )}
            <Button
              disabled={!canShare}
              variant="share"
              size="lg"
              onClick={handleClickShare}
            >
              <ShareIcon />
              <span className="font-[Outfit]">Share</span>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

// TODO: 生成する？
interface Snippet {
  id: string;
  code: string;
  language: string;
  theme: string;
  createdAt: Date;
  updatedAt: Date;
}

const getSnippet = async (id: string): Promise<Snippet | null> => {
  try {
    const response = await axios.get<Snippet>(
      `${import.meta.env.VITE_API_URL}/api/snippets/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

interface CreateSnippetDto {
  code: string;
  language: string;
  theme: string;
}

const createCode = async (
  createSnippetDto: CreateSnippetDto
): Promise<Snippet | null> => {
  try {
    const response = await axios.post<Snippet>(
      `${import.meta.env.VITE_API_URL}/api/snippets`,
      createSnippetDto
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
