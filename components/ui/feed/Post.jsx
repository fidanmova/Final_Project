// import { Button, Input, Text } from "react-daisyui";
import { format } from "@lukeed/ms";
import Link from "next/link";
import { useMemo } from "react";
import { PostCard } from "../Card";
import { Button, Card } from "react-daisyui";

const Post = ({ post }) => {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return "Just now";
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);
  return (
    <>
      <PostCard post={post} timestampTxt={timestampTxt} style="" />

      {/* {post ? (
        <div className="border-b border-grey-lighter flex-1 overflow-auto">
          {post.map((el, i) => {
            console.log("ALL ELS =>", el);
            return (
              // <PostCard
              //   key={i}
              //   post={post}
              //   timestampTxt={timestampTxt}
              //   style=""
              // />
              <div key={i}>TEST</div>
            );
          })}
        </div>
      ) : (
        <div>LOADING</div>
      )} */}

      {/* <div className="">
        <Link href={`/user/${post.creator.username}`}>
          <a>
            <div className="">
              <Avatar
              size={36}
              url={post.creator.profilePicture}
              username={post.creator.username}
            />
              <div className="">
                <p className="">{post.creator.username}</p>
              </div>
            </div>
          </a>
        </Link>
        <div className="">
          <div className="">{post.content}</div>
        </div>
        <div className="">
          <time dateTime={String(post.createdAt)} className="">
            {timestampTxt}
          </time>
        </div>
      </div> */}
    </>
  );
};

export default Post;
