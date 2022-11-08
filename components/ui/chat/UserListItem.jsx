import { Badge } from "react-daisyui";
import { useCurrentUser, useUserUsername } from "../../../utils/user/hooks";

const UserListItem = ({ handleFunction, user }) => {
  return (
    <Badge
      onClick={handleFunction}
      className="cursor-pointer bg-gray-800 text-white border-white p-4 text-xl my-2 items-center rounded-lg flex hover:bg-yellow-100 hover:text-green-800"
    >
      {/* <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      /> */}
      <div>
        <h1>{user.username}</h1>
      </div>
    </Badge>
  );
};

export default UserListItem;
