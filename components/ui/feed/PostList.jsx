import { Button } from "react-daisyui";
import { usePostPages } from "../../../utils/post/hooks";
import Post from "./Post";


const PostList = ({ user }) => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages();
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="w-full h-[68vh] flex flex-wrap overflow-y-scroll scrollbar-hide mt-2">
      {posts &&
        posts.map((post, i) => {
          return <Post key={i} post={post} user={user} />;
        })}
      <div className="w-full">
        {isReachingEnd ? (
          <div>No more posts are found</div>
        ) : (
          <Button
          className="w-full"
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
