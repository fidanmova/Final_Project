import { Button, Input, Text } from "react-daisyui";
import { usePostPages } from "../../../utils/post/hooks";
import Post from "./Post";

import Link from "next/link";

const PostList = () => {
  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages();
  console.log("data from PostList", data);
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  return (
    <div className="">
      {/* <Spacer axis="vertical" size={1} /> */}
      <div>
        {posts.map((post, i) => (
          <Link
            key={post._id}
            href={`/user/${post.creator.username}/post/${post._id}`}
            passHref
          >
            <div className="">
              <Post post={post} />
            </div>
          </Link>
          // <div key={i}></div>
        ))}
        <div>
          {isReachingEnd ? (
            <Text>No more posts are found</Text>
          ) : (
            <Button
              variant="ghost"
              type="success"
              loading={isLoadingMore}
              onClick={() => setSize(size + 1)}
            >
              Load more
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;
