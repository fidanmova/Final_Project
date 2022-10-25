import { Button, Input, Text } from "react-daisyui";
// import { LoadingDots } from "@/components/LoadingDots";
import { fetcher } from "../../../utils/fetcher";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

const PosterInner = ({ user }) => {
  // const [userInput, setUserInput] = useState({
  //   content: "",
  //   postName: "",
  // });

  const contentRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = usePostPages();

  const onChangeHandler = (e) => {
    setUserInput((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
    console.log();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    async (data, e) => {
      e.preventDefault();
      try {
        setIsLoading(true);
        await fetcher("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: data.content,
            postName: data.postName,
          }),
        });
        toast.success("You have posted successfully");
        contentRef.current.value = "";
        // refresh post lists
        mutate();
      } catch (e) {
        toast.error(e.message);
      } finally {
        setIsLoading(false);
      }
    },
    [mutate]
  );

  return (
    <form onSubmit={onSubmit}>
      <div className="">
        {/* <Avatar size={40} username={user.username} url={user.profilePicture} /> */}
        <Input
          ref={contentRef}
          className=""
          placeholder={`What's on your mind, ${user.username}?`}
          ariaLabel={`What's on your mind, ${user.username}?`}
        />
        <Button type="success" loading={isLoading}>
          Post
        </Button>
      </div>
    </form>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <Input
    //     type="text"
    //     placeholder="content"
    //     {...register("content", { required: true })}
    //   />
    //   <Input type="undefined" placeholder="postName" {...register} />

    //   <Button type="success">Post</Button>
    // </form>
  );
};

const Poster = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <div>
      <div className="">
        <h3 className="">Share your thoughts</h3>
        {loading ? (
          // <LoadingDots>Loading</LoadingDots>
          <div> ... LOAD</div>
        ) : data?.user ? (
          <PosterInner user={data.user} />
        ) : (
          <Text>
            Please{" "}
            <Link href="/login" passHref>
              <p>sign in</p>
            </Link>{" "}
            to post
          </Text>
        )}
      </div>
    </div>
  );
};

export default Poster;
