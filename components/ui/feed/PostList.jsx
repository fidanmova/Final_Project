import { Button, Input, Text } from "react-daisyui";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import Post from "./Post";

import Link from "next/link";

const PostList = ({ user }) => {
  const { data: currentUser, error } = useCurrentUser();
  console.log("USER POST LIST", currentUser);
  // let currentUserId = currentUser ? currentUser.user._id : "not there";
  console.log("PostPages", usePostPages());

  const { data, size, setSize, isLoadingMore, isReachingEnd } = usePostPages();
  console.log("data from PostList", data);
  const posts = data
    ? data.reduce((acc, val) => [...acc, ...val.posts], [])
    : [];

  console.log("======================== POSTS", posts);

  return (
    <div className="">
      {/* <Spacer axis="vertical" size={1} /> */}
      <div>
        {posts.map((post, i) => (
          <div className="" key={i}>
            {/* <Post post={post} />    */}
            <div>{post.creatorId}</div>
            <div>{post.content}</div>
          </div>
        ))}
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
