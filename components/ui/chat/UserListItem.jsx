import React from "react";
import { useCurrentUser, useUserUsername } from "../../../utils/user/hooks";

const UserListItem = ({ handleFunction }) => {
  const { data: currentUser, error: currentUserError } = useCurrentUser();
  const { data: user, error: userError } = useUserUsername();
  console.log("userListItem User =>", user);

  return (
    <div
      onClick={handleFunction}
      className="pointer bg-gray-100 text-blue-800 w-full items-center rounded-lg flex hover:bg-yellow-100 hover:text-green-800"
    >
      {/* <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      /> */}
      <div>
        <h1>{user.name}</h1>
        <h2>
          <b>Email : </b>
          {user.email}
        </h2>
      </div>
    </div>
  );
};

export default UserListItem;
