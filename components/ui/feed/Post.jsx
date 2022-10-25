// import { Button, Input, Text } from "react-daisyui";
import { format } from "@lukeed/ms";
import Link from "next/link";
import { useMemo } from "react";

const Post = ({ post }) => {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return "Just now";
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);
  return (
    // <DashCard
    //       text="discover, join or create a circle of developers"
    //       title="circle"
    //       style="text-red-500 shadow-red-500"
    //     />
    <div className="w-32 h-32 bg-black rounded">
      <Link href={`/user/${post.creator.username}`}>
        <a>
          <div className="">
            {/* <Avatar
              size={36}
              url={post.creator.profilePicture}
              username={post.creator.username}
            /> */}
            <div className="">
              <p className="">{post.creator.name}</p>
              <p className="">{post.creator.username}</p>
            </div>
          </div>
        </a>
      </Link>
      <div className="">
        <div className="">{post.content}</div>
        <div className="">{post.postName}</div>
      </div>
      <div className="">
        <time dateTime={String(post.createdAt)} className="">
          {timestampTxt}
        </time>
      </div>
    </div>
  );
};

export default Post;
