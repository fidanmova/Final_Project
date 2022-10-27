import React from "react";
import { useState } from "react";
import Editor from "@monaco-editor/react";

const MONACO_OPTIONS = {
  autoIndent: "full",
  automaticLayout: true,
  contextmenu: true,
  fontFamily: "monospace",
  fontSize: 22,
  lineHeight: 25,
  hideCursorInOverviewRuler: true,
  matchBrackets: "always",
  minimap: {
    enabled: false,
  },
  readOnly: false,
  scrollbar: {
    horizontalSliderSize: 4,
    verticalSliderSize: 18,
  },
};

export default function CodeEditor() {
  const [postBody, setPostBody] = useState("");

  return (
    <div className="m-4 p-4 text-2xl capitalize ">
      <h1>Basic Monoco Code Editor</h1>
      <hr />
      <div className=" ">
        <div className="my-6 ">
          <Editor
            className="p-2 border-8 border-yellow-400 rounded-2xl opacity-80"
            width="60vw"
            height="65vh"
            defaultLanguage="javascript"
            defaultValue="// ## Hi, Ready To Start Coding ! ##"
            theme="vs-dark" // or "light"
            loading="A moment please while I Load..."
            options={MONACO_OPTIONS}
            // options={{
            //   minimap: {
            //     enabled: false,
            //   },
            // }}
          />
        </div>
      </div>
    </div>
  );
}
