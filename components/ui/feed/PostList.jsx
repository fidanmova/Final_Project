import { Button, Input, Text } from "react-daisyui";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import { PostCard } from "../Card";

const PostList = ({ user }) => {
  const { data: currentUser, error } = useCurrentUser();
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages();
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="w-full h-full flex flex-wrap">
      {posts &&
        posts.map((post, i) => {
          return <PostCard post={post} key={i} />;
        })}
      <div>
        {isReachingEnd ? (
          <div>No more posts are found</div>
        ) : (
          <Button
            className="ml-4 hover:bg-blue-800/80 hover:after:text-white"
            loading={isLoadingMore}
            onClick={() => setSize(size + 1)}
          >
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default PostList;
