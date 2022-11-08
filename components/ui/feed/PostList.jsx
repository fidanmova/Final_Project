import { Button, Input, Text } from "react-daisyui";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import Post from "./Post";

import Link from "next/link";

const PostList = ({ user }) => {
  const { data: currentUser, error } = useCurrentUser();
  console.log("Post currentUser=>", currentUser);
  // console.log("PostPages =>", usePostPages());

  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages();
  console.log("postPages() => ", usePostPages());
  console.log("DATA from PostList =======================>", data);
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.usersPosts], [])
    : [];

  console.log("======================== POSTS", posts);

  return (
    <div className="">
      {/* <Spacer axis="vertical" size={1} /> */}
      <div>
        <h1>THESE ARE THE POSTS:</h1>
        {posts.map((post, i) => {
          console.log("One Post", post.content);
          return (
            <div className="" key={i}>
              <Post post={post} />
              {/* <div>{post.creatorId}</div> */}
              {/* <div>{post.content}</div> */}
            </div>
          );
        })}
        <div>
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
    </div>
  );
};

export default PostList;
