import React from "react";
import { useCurrentUser, useUserUsername } from "../../../utils/user/hooks";

const UserListItem = ({ handleFunction, user }) => {
  const { data: currentUser, error: currentUserError } = useCurrentUser();
  // const { data: user, error: userError } = useUserUsername();
  // console.log("handleFunction =>", handleFunction);
  // console.log("userListItem User =>", user);

  return (
    <div
      onClick={handleFunction}
      className="text-m  border-2 bg-transparent p-4 rounded-xl mb-7 mt-8"
    >
      <div>
        <div className="avatar">
          <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://placeimg.com/192/192/people" />
            {/* <img src={user.avatar} /> */}
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
