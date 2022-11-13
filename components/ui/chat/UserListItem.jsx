import React from "react";
// import { useCurrentUser } from "../../../utils/user/hooks";
import Image from "next/image";

const UserListItem = ({ handleFunction, user }) => {
  return (
    <div
      onClick={handleFunction}
      className="flex-1 flex justify-evenly items-center w-full text-base border-2 hover:bg-blue-800/95 border-blue-500 bg-blue-900 rounded-xl h-16 mb-2"
    >
      <Image
        width={50}
        height={50}
        alt={user?.username}
        className="rounded-full w-1/5"
        src={
          user?.avatar
            ? `${user.avatar}`
            : `https://placeimg.com/192/192/people`
        }
      />
      <div className="w-4/6">
        <h1 className="text-xl">{user.username}</h1>
        <h2 className="text-sm">{user.email}</h2>
      </div>
    </div>
  );
};

export default UserListItem;
