import React, { useContext, useState } from "react";
import { Context } from "../../../utils/context/context";
import { Button, Form } from "react-daisyui";
import { fetcher } from "../../../utils/fetcher";
import InputEmoji from "react-input-emoji";
import { AiOutlineSend } from "react-icons/ai";


const SendMessage = () => {
  const { selectedChat } = useContext(Context);
  const [messages, setMessages] = useState();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // const { mutate } = useMessagePages({ chatId: chat._id });

  const onSubmit = async (e) => {
     e.preventDefault();
    if (!selectedChat) {
      toast.error("select a chat!");
    }
    try {
      setContent("");
      setIsLoading(true);
      const data = await fetcher(`/api/chats/${selectedChat}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content,
        }),
      });
      setMessages([data, ...messages]);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onEnter = async () => {
    // e.preventDefault();
    if (!selectedChat) {
      toast.error("select a chat!");
    }
    try {
      setContent("");
      setIsLoading(true);
      const data = await fetcher(`/api/chats/${selectedChat}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: content,
        }),
      });
      setMessages([data, ...messages]);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-gray-700/60 lg:rounded-b-xl rounded-b-sm">
      <Form
        onSubmit={onSubmit}
        className="w-full flex flex-col lg:flex-row items-center justify-center p-4 normal-case"
      >
        <InputEmoji
          value={content}
          onChange={setContent}
          onEnter={onEnter}
          cleanOnEnter
          placeholder={`Enter message here`}
          borderRadius={4}
          borderColor="#494948"
          theme="dark"
        />
        <Button className="p-1.5" type="submit" loading={isLoading}>
                    <AiOutlineSend className="text-green-500 text-2xl" />
                </Button>
      </Form>
    </div>
  );
};

export default SendMessage;
