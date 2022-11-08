import React from "react";
import { useCurrentUser, useUserUsername } from "../../../utils/user/hooks";

const UserBadge = ({ handleFunction, user }) => {
  const { data: currentUser, error: currentUserError } = useCurrentUser();
  return (
    <div onClick={handleFunction} className="badge bg-pink-600 p-4 mt-6">
      <div>
        <h1>{user.username} x</h1>
      </div>
    </div>
  );
};
export default UserBadge;
