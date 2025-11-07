import { Select } from "./common/select";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import { ShareIcon } from "./icons/share";
import { LinkIcon } from "./icons/link";
import { createSnippet } from "@/lib/createSnippet";
import { useEditor } from "@/hooks/useEditor";

export const CodeCard = () => {
  const [canShare, setCanShare] = useState(false);
  const [url, setUrl] = useState("");
  const { code, theme, language, languageItems, themeItems, handlers } =
    useEditor();

  const handleClickShare: React.MouseEventHandler<
    HTMLButtonElement
  > = async () => {
    const snippet = await createSnippet({
      code,
      theme,
      language,
    });
    if (snippet) {
      setUrl(`${window.location.href}?id=${snippet.id}`);
      setCanShare(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Editor
          height="50vh"
          theme={theme}
          value={code}
          language={language}
          defaultLanguage={language}
          onChange={(value) => {
            handlers.onChangeCode(value);
            setCanShare(true);
          }}
        />
      </CardContent>
      <CardFooter>
        <div className="flex justify-between w-full items-baseline">
          <div className="flex gap-x-2">
            <div className="w-20">
              <Select
                value={language}
                onChange={handlers.onChangeLanguage}
                items={languageItems}
              />
            </div>
            <div className="w-20">
              <Select
                value={theme}
                onChange={handlers.onChangeTheme}
                items={themeItems}
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
