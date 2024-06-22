"use client";

import { getExtension, initialCode } from "@/utils/utilities";
import { Resizable } from "re-resizable";
import { useEffect, useState } from "react";
import AceEditor from "react-ace";

//languages
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-typescript";

//themes
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-twilight";

interface CodeEditorProps {
  language: string;
  theme: string;
  icon: string;
  background?: string;
  currentPadding?: string;
}

function CodeEditor({
  language,
  theme,
  icon,
  background,
  currentPadding,
}: CodeEditorProps) {
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(500);

  const [title, setTitle] = useState("guess-my-number");
  const [extension, setExtension] = useState(".js");

  const [code, setCode] = useState(initialCode);

  // @ts-ignore
  const handleResize = (evt, dir, ref, d) => {
    const newWidth = width + d.width;
    const newHeight = ref.style.height;
    setWidth(newWidth);
    setHeight(parseInt(newHeight));
  };

  const updateSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    setExtension(getExtension(language));
  }, [language]);

  return (
    <Resizable
      minHeight={466}
      minWidth={510}
      maxWidth={1000}
      defaultSize={{ width, height }}
      onResize={handleResize}
      className="resize-container relative"
      style={{ background }}
    >
      <div className="code-block" style={{ padding: currentPadding }}>
        <div className="handle handle-top absolute left-1/2 translate-x-[-50%] top-[-4px] w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50"></div>
        <div className="handle handle-bottom absolute left-1/2 bottom-[-4px] w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50 "></div>
        <div className="handle handle-left absolute left-[-4px] top-1/2 w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50 "></div>
        <div className="handle handle-right absolute right-[-4px] top-1/2 w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-50 "></div>

        <div className="code-title h-[52px] px-4 flex items-center justify-between bg-black bg-opacity-80">
          <div className="dots flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-[#ff5656]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbc6a] "></div>
            <div className="w-3 h-3 rounded-full bg-[#67f772] "></div>
          </div>

          <div className="input-contol w-full">
            <input
              type="text"
              value={`${title}${extension}`}
              onChange={(e) => setTitle(e.target.value.split(".")[0])}
              className="w-full text-[hsla(0,0%,100%,.6)] outline-none font-medium text-center bg-transparent"
              style={{ lineHeight: "1.8rem" }}
            />
          </div>

          <div className="icon flex justify-center items-center p-1 bg-black bg-opacity-30 rounded-sm">
            <img src={icon} className="w-[33px]" alt="" />
          </div>
        </div>
        <AceEditor
          value={code}
          onChange={setCode}
          theme={theme}
          mode={language.toLowerCase()}
          fontSize={16}
          wrapEnabled
          showGutter={false}
          showPrintMargin={false}
          highlightActiveLine={false}
          editorProps={{ $blockScrolling: true }}
          name="code-editor"
          className="ace-editor-container"
          height={`calc(${height}px - ${currentPadding} - ${currentPadding} - 52px)`}
        />
      </div>
    </Resizable>
  );
}

export default CodeEditor;
