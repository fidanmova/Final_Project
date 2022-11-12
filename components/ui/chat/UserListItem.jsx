import Image from "next/image";
import React from "react";

const UserListItem = ({ handleFunction, user }) => {
  
  return (
    <div
      onClick={handleFunction}
      className="text-m  border-2 bg-transparent p-4 rounded-xl mb-7 mt-8"
    >
      <div>
        <div className="avatar">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image src="https://placeimg.com/192/192/people" alt="image" />
          </div>
        </div>
        <h1>{user.username}</h1>
        <h2>
          <b>Email : </b>
          {user.email}
        </h2>
      </div>
    </div>
  );
};

export default UserListItem;
