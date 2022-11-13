import React, { useContext, useState } from "react";
import { Context } from "../../../utils/context/context";
import { Button, Input, Form } from "react-daisyui";
import { fetcher } from "../../../utils/fetcher";
import InputEmoji from "react-input-emoji";

const SendMessage = () => {
  const { selectedChat } = useContext(Context);
  const [messages, setMessages] = useState();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="bg-gray-700/60 lg:rounded-b-xl rounded-b-sm">
      <Form
        onSubmit={onSubmit}
        className="w-full flex flex-row justify-center p-4"
      >
        <InputEmoji
          value={content}
          onChange={setContent}
          onEnter={setContent}
          cleanOnEnter
          placeholder={`Enter message here`}
          borderRadius={2}
          borderColor="#494948"
          theme="dark"
        />
        <Button
          type="success"
          loading={isLoading}
          className="lg:w-40 bg-purple-900/80 hover:bg-purple-800 text-gray-200 text-xl font-normal "
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default SendMessage;
