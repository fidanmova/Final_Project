import React from "react";
import { Input, Form } from "react-daisyui";
import { useForm } from "react-hook-form";
import { useAllChats, useChat } from "../../../utils/chats/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import { fetcher } from "../../../utils/fetcher";

const AddGroupMember = () => {
  const { data: chatGroups, error } = useAllChats();
  const { data: { users, chatName } = {}, mutate, isValidating } = useChat();
  console.log("DATA from AddGroupMember", chatGroups);
  const { data: user, error2 } = useCurrentUser();
  console.log("data2", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // chatGroups.map((chatGroup) => {
  //   console.log(chatGroup);
  // });

  // addNewItem = () => {
  //   let { cart, input } = this.state;
  //   cart.push(input);
  //   this.setState({cart: cart});
  // };

  // addNewItem = () => {
  //   this.setState({cart: [...this.state.cart, this.state.input]});
  // };

  const onSubmit = async (e) => {
    const newUser = {
      // users: "Robbie Doe",
      // location: "Lagos",
      // age: 20,
      // email: "rb@doe.com",
      // image:
      //   "https://www.shareicon.net/data/2016/09/15/829474_user_512x512.png",
    };
    await fetcher(`api/chats/${id}`, {
      method: "POST",
      body: JSON.stringify(newUser),
    });
    mutate(users);
  };

  return (
    <>
      <div>AddGroupMember</div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="username"
          {...register("username", {})}
        />
        <Input type="submit" />
      </Form>
    </>
  );
};

export default AddGroupMember;
