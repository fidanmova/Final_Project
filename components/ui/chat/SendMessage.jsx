import React, { useContext } from "react";
import { Context } from "../../../utils/context/context";
import { Button, Input, Form } from "react-daisyui";
import { fetcher } from "../../../utils/fetcher";
import { useState } from "react";

const SendMessage = () => {
  const { selectedChat } = useContext(Context);
  const [messages, setMessages] = useState();
  const [content, setContent] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
    <div className="bg-gray-700 rounded-b-xl">
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
        <Button
          type="success"
          loading={isLoading}
          className="w-40 bg-gray-600/80 hover:bg-blue-900/90 text-gray-200 text-xl font-normal "
        >
          Send
        </Button>
      </Form>
    </div>
  );
};

export default SendMessage;
