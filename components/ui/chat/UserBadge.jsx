import React from "react";
import { Badge } from "react-daisyui";
import { useCurrentUser } from "../../../utils/user/hooks";

const UserBadge = ({ handleFunction, user }) => {
  return (
    <Badge
      onClick={handleFunction}
      className="badge bg-pink-600 text-white p-3 mr-1"
    >
      <h1>
        {user.username} <span>x</span>
      </h1>
    </Badge>
  );
};
export default UserBadge;
