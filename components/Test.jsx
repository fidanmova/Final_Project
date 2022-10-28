import React, { useState, useCallback } from "react";
import { Input, Form, Card, Button } from "react-daisyui";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useCurrentUser } from "../utils/user/hooks";
import { fetcher } from "../utils/fetcher";
import SearchComponent from "./ui/Search";

export default function Test() {
  const { data, error } = useCurrentUser();
  const user = data?.user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.creator = user.username;
    console.log("THE DATA", data);
    try {
      const response = await fetcher("/api/chatGroups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      console.log("response of Submit", response);
      toast.error(errors);
    } catch (error) {
      console.log("ERROR", error);
      toast.error("Ops...something went wrong!");
    }
  };

  return (
    <div>
      {/* <SearchComponent /> */}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="username"
          {...register("username", {})}
        />
        <Input type="submit" />
      </Form>
    </div>
  );
}

// const onSubmit = useCallback(
//   async (data) => {
//     console.log("DATA from useCallback", data);
//     try {
//       const response = await fetcher("/api/chatGroups", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: {
//           // users: data.users,
//           users: JSON.stringify(selectedUsers.map((u) => u._id)),
//         },
//       });
//       console.log("response of Submit", response);
//       toast.error(errors);
//     } catch (error) {
//       toast.error("Ops...something went wrong!");
//     }
//   },
//   [errors]
// );

// return (
//   <Form className="w-1/3 mx-auto" onSubmit={handleSubmit(onSubmit)}>
//     <h2>users:</h2>
//     <Input
//       type="text"
//       name="users"
//       {...register("users", { required: true })}
//     />

//     <Button
//       className="bg-gradient-to-r from-blue-900 to-purple-900  mt-4"
//       type="submit"
//     >
//       enter
//     </Button>
//   </Form>
// );
