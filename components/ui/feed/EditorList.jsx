import { Button, Input, Text } from "react-daisyui";
import { useEditorPages } from "../../../utils/editor/hooks";
// import { useCurrentUser } from "../../../utils/user/hooks";
import { EditorCard } from "../Card";

const EditorList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } =
    useEditorPages();
  const messages = data
    ? data.reduce((acc, val) => [...acc, ...val.messages], [])
    : [];

  return (
    <div className="w-full h-full flex flex-wrap">
      {messages &&
        messages.map((message, i) => {
          return <EditorCard message={message} key={i} />;
        })}
      <div>
        {isReachingEnd ? (
          <div>No chat messages.</div>
        ) : (
          <Button
            className="mt-4 hover:bg-blue-800/80 hover:after:text-white"
            loading={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditorList;
