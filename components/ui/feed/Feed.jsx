// import { Spacer } from '@/components/Layout';
// import styles from './Feed.module.css';
import Poster from "./Poster";
import PostList from "./PostList";

const Feed = () => {
  return (
    <div className="">
      {/* <Spacer size={1} axis="vertical" /> */}
      <Poster />
      <PostList />
    </div>
  );
};

export default Feed;
