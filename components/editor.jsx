import React from "react";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useCurrentUser } from "../utils/user/hooks";

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
  const [codeWindow, setCodeWindow] = useState("");
  const { data: { user } = {}, mutate } = useCurrentUser();
  console.log("USER ==>", user);

  const handleEditorChange = (value) => {
    console.log("Value ==>", value);
    setCodeWindow(value);
    // onChange(value);
    console.log("Code ==>", codeWindow);
  };

  return (
    <div className="m-4 p-4 text-2xl capitalize ">
      <h1>Welcome To The Code Editor</h1>
      <hr />
      <div className="flex justify-around mt-4">
        <div className="my-6 ">
          <Editor
            className="p-2 border-4 border-yellow-400 rounded-2xl opacity-80"
            width="60vw"
            height="65vh"
            defaultLanguage="javascript"
            defaultValue="// ## Let's Start Coding ! ##"
            theme="vs-dark" // or "light"
            loading="A moment please while I Load..."
            options={MONACO_OPTIONS}
            onChange={handleEditorChange}
            // options={{
            //   minimap: {
            //     enabled: false,
            //   },
            // }}
          />
        </div>
        <div className="w-11/12 lg:w-[20vw] lg:h-[65vh] flex justify-center my-4 bg-black/50 rounded-lg shadow-yellow-200 shadow-md">
          <h1 className="text-xl mt-4">Chat</h1>
        </div>
      </div>
      <div className="flex justify-start ">
        <button className="btn btn-sm ml-14 bg-sky-700  ">Save Code</button>
      </div>
    </div>
  );
}
