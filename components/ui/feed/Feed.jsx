// import { Spacer } from '@/components/Layout';
// import styles from './Feed.module.css';
import { useCurrentUser } from "../../../utils/user/hooks";
import Poster from "./Poster";
import PostList from "./PostList";

const Feed = () => {
  const { data: user, error } = useCurrentUser();
  return (
    <div className="">
      {/* <Spacer size={1} axis="vertical" /> */}
      <Poster user={user} />
      <PostList user={user} />
    </div>
  );
};

export default Feed;
