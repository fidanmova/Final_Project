import { Button } from "react-daisyui";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import Post from "./Post";


const PostList = ({ user }) => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages();
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="w-full h-full flex flex-wrap">
      {posts &&
        posts.map((post, i) => {
          return <Post key={i} post={post} user={user} />;
        })}
      <div>
        {isReachingEnd ? (
          <div>No more posts are found</div>
        ) : (
          <Button
            variant="ghost"
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
