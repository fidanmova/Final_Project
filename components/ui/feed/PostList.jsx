import { Button, Input, Text } from "react-daisyui";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import Post from "./Post";

import Link from "next/link";

const PostList = ({ user }) => {
  const { data: currentUser, error } = useCurrentUser();

  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages();
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="w-full flex flex-wrap">
      {posts &&
        posts.map((post, i) => {
          return <Post key={i} post={post} />;
        })}
      <div>
        {/* ################ */}
        {/* BUTTON NOT YET ADDED */}
        {/* ################ */}

        {/* {isReachingEnd ? (
          <div>No more posts are found</div>
        ) : (
          <Button
            variant="ghost"
            type="success"
            loading={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            Load more
          </Button>
        )} */}
      </div>
    </div>
  );
};

export default PostList;
