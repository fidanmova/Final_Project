import React from "react";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useCurrentUser } from "../utils/user/hooks";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetcher";

const MONACO_OPTIONS = {
  autoIndent: "full",
  automaticLayout: true,
  contextmenu: true,
  fontFamily: "monospace",
  fontSize: 20,
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
  console.log("USER ID==>", user._id);

  const handleEditorChange = (value) => {
    console.log("Value ==>", value);
    setCodeWindow(value);

    console.log("Code ==>", codeWindow);
  };

  ///////////////////////////////////////////////////////////////////////
  const saveCode = async () => {
    toast("Saving Your Code");
    const response = await fetcher(`/api/users/${user.username}/updatecode`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        //  ('/api/:mo)
        // username: user.username,
        // city: user.city,
        // password: user.password,
        userId: user._id,
        code: codeWindow,
      }),
    });
    console.log(response);
  };
  /////////////////

  return (
    <div className="m-4 p-4 text-2xl capitalize ">
      <h1>Welcome To The Code Editor</h1>
      <hr />
      <div className="flex justify-around mt-4 items-center ">
        <div className="my-6 ">
          <Editor
            className="p-2 border-2 border-yellow-400 rounded-2xl opacity-80"
            width="60vw"
            height="65vh"
            defaultLanguage="javascript"
            defaultValue="//## FileName:________##"
            theme="vs-dark" // or "light"
            loading="A moment please while I Load..."
            options={MONACO_OPTIONS}
            onChange={handleEditorChange}
          />
        </div>
        <div className="flex flex-col">
          <div className="w-11/12 lg:w-[30vw] lg:h-[35vh] flex justify-center my-4 bg-black/50 rounded-lg shadow-yellow-400 shadow-md">
            <h1 className="text-xl mt-4">Messages</h1>
          </div>
          <div className="w-11/12 lg:w-[30vw] lg:h-[25vh] flex justify-center my-4 bg-black/50 rounded-lg shadow-yellow-400 shadow-md">
            <h1 className="text-xl mt-4">Recent Files . . .</h1>
          </div>
        </div>
      </div>
      <div className="flex justify-start ">
        <button className="btn btn-sm ml-14 bg-sky-700" onClick={saveCode}>
          Save Code
        </button>
      </div>
    </div>
  );
}
