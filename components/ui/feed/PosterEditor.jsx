import { Button, Input, Form } from "react-daisyui";
import { fetcher } from "../../../utils/fetcher";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useState } from "react";
import { toast } from "react-toastify";

const PosterInner = ({ user }) => {
  const [comments, setComments] = useState();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const {} = usePostPages();

  const onChangeHandler = (e) => {
    setUserInput((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await fetcher("/api/editorPosts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content,
        }),
      });
      setComments([data, ...comments]);
      toast.success("You have posted successfully");
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-full flex flex-wrap justify-between py-1"
    >
      <Input
        value={content}
        className="w-80 bg-gray-900/80 m-0 "
        placeholder={`Let's chat!`}
        aria-label={`Let's chat!`}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button
        className="bg-blue-800 hover:bg-blue-900/90 text-white hover:border-blue-500/50 text-xl
           font-thin w-32"
        type="success"
      >
        send
      </Button>
    </form>
  );
};

const PosterEditor = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <div className="">
      {loading ? (
        <div> ... LOAD</div>
      ) : data?.user ? (
        <PosterInner user={data.user} />
      ) : (
        <p>No Messages in the feed.</p>
      )}
    </div>
  );
};

export default PosterEditor;
