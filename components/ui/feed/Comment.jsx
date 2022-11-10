// import { Button, Input, Text } from "react-daisyui";
import { format } from "@lukeed/ms";
// import clsx from "clsx";
import Link from "next/link";
import { useMemo } from "react";

const Comment = ({ comment }) => {
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(comment.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return "Just now";
    return `${format(diff, true)} ago`;
  }, [comment.createdAt]);
  return (
    <div className="">
      <Link href={`/user/${comment.creator.username}`}>
        <a>
          <div className="">
            <div column className="">
              <p className="">{comment.creator.name}</p>
              <p className="">{comment.creator.username}</p>
            </div>
          </div>
        </a>
      </Link>
      <div className="">
        <p className="">{comment.content}</p>
      </div>
      <div className="">
        <time dateTime={String(comment.createdAt)} className="">
          {timestampTxt}
        </time>
      </div>
    </div>
  );
};

export default Comment;
