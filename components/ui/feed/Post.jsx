import { format } from "@lukeed/ms";
import { useMemo } from "react";
import { PostCard } from "../Card";

const Post = ({ post }) => {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return "Just now";
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);
  return <PostCard post={post} timestampTxt={timestampTxt} style="" />;
};

export default Post;
