import React, { useContext } from "react";
import { Context } from "../../../utils/context/context";
import { Button, Input, Text, Form } from "react-daisyui";
import { fetcher } from "../../../utils/fetcher";
import { useState } from "react";

//! WORKS With trial chatID:
const SendMessage = ({ user }) => {
  const { selectedChat } = useContext(Context);
  const [messages, setMessages] = useState();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //! Working version:
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!selectedChat) {
    }
    try {
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
    <Form
      onSubmit={onSubmit}
      className="w-full flex flex-row justify-center p-4"
    >
      <Input
        value={content}
        className="w-full"
        placeholder={`Enter message here`}
        aria-label={`Enter message here`}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="success" loading={isLoading} className="w-20">
        Send
      </Button>
    </Form>
  );
};

export default SendMessage;
