"use client";

import BackgroundSelector from "@/components/background-select";
import CodeEditor from "@/components/code-editor";
import LanguageSelector from "@/components/language-selector";
import PaddingSelector from "@/components/padding-selector";
import ThemeSelector from "@/components/theme-selector";
import { backgrounds, languages, paddings, themes } from "@/utils/utilities";
import html2canvas from "html2canvas";
import { Download } from "lucide-react";
import { useRef, useState } from "react";

export default function Home() {
  const editorRef = useRef(null);

  const [language, setLanguage] = useState(languages[0].name);
  const [icon, setIcon] = useState(languages[0].icon);
  const [theme, setTheme] = useState(themes[0]);
  const [background, setBackground] = useState(backgrounds[5]);
  const [currentPadding, setCurrentPadding] = useState(paddings[2]);

  const exportPNG = async () => {
    const editorElem = editorRef.current;

    if (editorElem) {
      //hide elemnets
      const handleElems = document.querySelectorAll(".handle") as any;
      const cursorElem = document.querySelector(".ace_cursor") as any;
      const codetitle = document.querySelector(".code-title") as any;
      const codeEditor = document.querySelector(".ace_editor") as any;

      handleElems.forEach((elem: any) => {
        elem.style.display = "none";
      });
      cursorElem.style.display = "none";
      codetitle.style.boxShadow = "none";
      codeEditor.style.boxShadow = "none";

      const canvas = await html2canvas(editorElem);
      const image = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const link = document.createElement("a");
      link.download = "code.png";
      link.href = image;
      link.click();

      //show elements
      handleElems.forEach((elem: any) => {
        elem.style.display = "block";
      });
      cursorElem.style.display = "block";
      codetitle.style.boxShadow = "0 3px 10px rgba(0, 0, 0, 0.2)";
      codeEditor.style.boxShadow = "2px 3px 10px rgba(0, 0, 0, 0.2)";
    }
  };

  return (
    <main className="h-[100vh] flex flex-col items-center justify-between">
      <header className="mt-6 flex gap-6 w-[940px] p-5 fixed top-0 left-1/2 translate-x-[-50%] z-10 bg-[#191919] rounded border border-[#3C3C3C] shadow-md">
        <LanguageSelector
          language={language}
          setLanguage={setLanguage}
          setIcon={setIcon}
        />
        <ThemeSelector theme={theme} setTheme={setTheme} />
        <BackgroundSelector
          background={background}
          setBackground={setBackground}
        />
        <PaddingSelector
          currentPadding={currentPadding}
          setCurrentPadding={setCurrentPadding}
        />
        <div className="export-btn self-center ml-auto">
          <button
            className="flex items-center gap-3 py-2 px-3 bg-blue-400 rounded-md text-sm text-blue-400 
            font-medium bg-opacity-10 hover:bg-opacity-80 hover:text-slate-50 ease-in-out transition-all 
            duration-300"
            onClick={exportPNG}
          >
            <Download />
            Export PNG
          </button>
        </div>
      </header>

      <div className="code-editor-ref mt-[14rem]" ref={editorRef}>
        <CodeEditor
          language={language}
          theme={theme}
          icon={icon}
          background={background}
          currentPadding={currentPadding}
        />
      </div>
    </main>
  );
}
