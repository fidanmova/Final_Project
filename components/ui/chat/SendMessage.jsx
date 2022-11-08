import { Button, Input, Text, Form } from "react-daisyui";
// import { LoadingDots } from "@/components/LoadingDots";
import { fetcher } from "../../../utils/fetcher";
import { useChatPages } from "../../../utils/post/hooks";

import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

//! WORKS With trial chatID:
const SendMessage = ({ user }) => {
  const [messages, setMessages] = useState();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //! TRIAL chatId:
  const chatId = "6368c6c70bf7e5d7c69a1d47";

  // const { mutate } = useChatPages();

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
      const data = await fetcher(`/api/chats/${chatId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content,
        }),
      });
      setMessages([data, ...messages]);
      // toast.success("You have posted successfully");
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
    <div className="w-full">
      <Form onSubmit={onSubmit}>
        <div className="w-full">
          {/* <Avatar size={40} username={user.username} url={user.profilePicture} /> */}
          <Input
            value={content}
            className=""
            placeholder={`Enter message here`}
            aria-label={`Enter message here`}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button type="success" loading={isLoading}>
            Send
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SendMessage;
