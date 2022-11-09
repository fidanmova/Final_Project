import { useCurrentUser } from "../../../utils/user/hooks";
import Poster from "./Poster";
import PostList from "./PostList";

const Feed = () => {
  const { data: user, error } = useCurrentUser();
  return (
    <div className="w-full p-2 overflow-y-scroll scrollbar-hide">
      <Poster user={user} />
      <PostList user={user} />
    </div>
  );
};

export default Feed;
