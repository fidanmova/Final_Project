import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useCurrentUser } from "../utils/user/hooks";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetcher";
import PosterEditor from "./ui/feed/PosterEditor";
import EditorList from "./ui/feed/EditorList";

const MONACO_OPTIONS = {
    autoIndent: "full",
    automaticLayout: true,
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 16,
    lineHeight: 20,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
        enabled: false,
    },
    readOnly: false,
    scrollbar: {
        horizontalSliderSize: 6,
        verticalSliderSize: 8,
    },
};

export default function CodeEditor() {
    const [codeWindow, setCodeWindow] = useState("//## FileName:________##");
    const { data: { user } = {}, mutate } = useCurrentUser();

    // #### New File Function ####
    const newFile = () => {
        setCodeWindow("//## FileName:________##");
        toast("New  File");
    };
    // ############################

    // #### Load Code Function ####
    const loadCode = (code) => {
        setCodeWindow(code);
        toast("Loading Code File");
    };
    // ############################

    const handleEditorChange = (value) => {
        setCodeWindow(value);
    };

    //  ## Save Code Function  ##
    const saveCode = async () => {
        toast("Saving Your Code");
        try {
            const response = await fetcher(
                `/api/users/${user?.username}/updatecode`,
                {
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
                }
            );
            mutate({ user: response }, false);
        } catch (error) {
            toast.error("ops...something went wrong");
        }
    };
    // ########################

    return (
        <div className="p-4 text-2xl capitalize ">
            <h1>Welcome To The Code Editor</h1>

            <div className="w-full flex flex-col lg:flex-row  lg:space-x-4 ">
                <select className="lg:hidden btn w-full lg:btn-xs text-white tracking-widest bg-green-800 mt-4 mb-0">
                    {user?.code
                        ?.slice(user?.code?.length - 8, user.code.length)
                        .reverse()
                        .map((el, i) => (
                            <option
                                key={i}
                                className="w-full space-y-2 lg:space-y-0 lg:w-2/3 "
                                onClick={() => loadCode(el)}
                            >
                                {el.slice(15, 35)}
                            </option>
                        ))}
                </select>
                <div className="w-full h-full py-4 flex flex-col space-y-8  overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-yellow-500/50">
                    <Editor
                        className="p-2 border-2 border-yellow-400 rounded-xl opacity-80 normal-case shadow-md shadow-yellow-500"
                        width="100%"
                        height="68vh"
                        defaultLanguage="javascript"
                        defaultValue={codeWindow}
                        value={codeWindow}
                        theme="vs-dark" // or "light"
                        loading="A moment please while I Load..."
                        options={MONACO_OPTIONS}
                        onChange={handleEditorChange}
                    />

                    <div className="w-full flex justify-between lg:justify-start items-center lg:space-x-4 p-2">
                        <button
                            className="btn btn-sm w-32 bg-sky-700 border-0"
                            onClick={saveCode}
                        >
                            Save Code
                        </button>
                        <button
                            className="btn btn-sm w-32 bg-purple-700 border-0"
                            onClick={newFile}
                        >
                            New File
                        </button>
                    </div>
                </div>
                <div className="flex flex-col justify-between lg:w-[40vw] lg:h-[65vh] mt-4 space-y-8">
                    <div className="w-full h-[80vh] lg:h-[45vh] flex flex-col items-center bg-black/50 rounded-lg border-2 border-purple-400/80 shadow-md shadow-purple-500">
                        <h1 className="text-xl p-2">Editor Chat:</h1>
                        <div className="w-full px-4 ">
                            <div className="overflow-y-scroll scrollbar-hide h-[60vh] lg:h-[30vh] py-2">
                                <EditorList user={user} />
                            </div>
                            <PosterEditor user={user} />
                        </div>
                    </div>
                    <div className="hidden w-full h-full lg:flex flex-col  items-center bg-black/50 rounded-lg border-2 border-green-400/80 shadow-md shadow-green-500 px-2">
                        <h1 className="text-xl mt-4">
                            Recent Files : {user?.code?.length}
                        </h1>

                        <div className="hidden w-full max-h-[40vh] lg:h-[17vh] lg:flex  flex-col items-center overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-green-300/50">
                            {user?.code
                                ?.slice(
                                    user?.code?.length - 8,
                                    user.code.length
                                )
                                .reverse()
                                .map((el, i) => (
                                    <div
                                        key={i}
                                        className="w-full space-y-2 lg:space-y-0 lg:w-5/6 "
                                    >
                                        <button
                                            className="btn w-full lg:btn-xs text-white tracking-widest bg-green-800"
                                            onClick={() => loadCode(el)}
                                        >
                                            {el.slice(15, 35)}
                                        </button>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
