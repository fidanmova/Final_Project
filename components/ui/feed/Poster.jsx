import { Button, Input, Text, Form } from "react-daisyui";
// import { LoadingDots } from "@/components/LoadingDots";
import { fetcher } from "../../../utils/fetcher";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { toast } from "react-toastify";

const PosterInner = ({ user }) => {
  // console.log("user from Inner Poster", user);
  // const contentRef = useRef();
  const [comments, setComments] = useState();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate } = usePostPages();

  const onChangeHandler = (e) => {
    setUserInput((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value,
    }));
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await fetcher("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content,
        }),
      });
      setComments([data, ...comments]);
      toast.success("You have posted successfully");
      // contentRef.current.value = "";
      // // refresh post lists
      // mutate();
    } catch (e) {
      console.log(e.message);
      // toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  // [mutate]

  return (
    <Form onSubmit={onSubmit}>
      <div className="">
        {/* <Avatar size={40} username={user.username} url={user.profilePicture} /> */}
        <Input
          value={content}
          className=""
          placeholder={`What's on your mind, ${user.username}?`}
          aria-label={`What's on your mind, ${user.username}?`}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="success" loading={isLoading}>
          Post
        </Button>
      </div>
    </Form>
  );
};

const Poster = () => {
  const { data, error } = useCurrentUser();
  const loading = !data && !error;

  return (
    <div>
      <div className="">
        <h3 className="text-sm">Share your thoughts</h3>
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
