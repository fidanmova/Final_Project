import React, { useMemo } from "react";
import { format } from "@lukeed/ms";
import Link from "next/link";
import { Card } from "react-daisyui";
import { useCurrentUser } from "../../utils/user/hooks";

const DashCard = ({ title, text, style }) => {
  return (
    <Card
      className={`bg-black/70 w-[42vw] lg:w-[30vw] h-[25vh] m-1 text-sm border-blue-500/50 hover:scale-95 shadow-md ${style}`}
    >
      <div className="w-full h-full flex flex-col justify-between items-center py-8">
        <h2 className={`text-2xl`}>{title}</h2>

        <p className="text-md capitalize text-white">{text}</p>
        {title === "code" ? (
          <Link href={`/editor`}>enter</Link>
        ) : (
          <Link href={`/${title}`}>enter</Link>
        )}
      </div>
    </Card>
  );
};

const PostCard = ({ i, post, timestampTxt, style }) => {
  const { data: currentUser, error } = useCurrentUser();
  return (
    <Card
      className={`bg-black/70 w-full m-1 text-sm border-blue-500/50 hover:scale-95 shadow-md`}
    >
      <div
        className={`first-letter:w-full h-full flex flex-col justify-between items-start p-2 `}
      >
        <Link href={`/user/${post.creator._id}`}>
          <a>
            <h2
              className={`text-base bold ${
                post.creator.username == currentUser.user.username
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              {post.creator.username}
            </h2>
            <p className="text-md capitalize text-white">{post.content}</p>
          </a>
        </Link>
        <div className="w-full flex justify-end">
          <time
            dateTime={String(post.createdAt)}
            className="text-[10px] text-right font-gray-200 item-end"
          >
            {timestampTxt}
          </time>
        </div>
      </div>
    </Card>
  );
};

const MessageCard = ({ i, message, user }) => {
  const timestampTxtMessage = useMemo(() => {
    const diff = Date.now() - new Date(message.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return "Just now";
    return `${format(diff, true)} ago`;
  }, [message.createdAt]);
  return (
    <div
      className={`flex w-full m-1 text-sm px-4 py-1 ${
        message.creatorId != user._id.toString()
          ? "justify-end"
          : "justify-start"
      }`}
    >
      <div
        className={`rounded-lg min-w-[15vw] max-w-[55%] py-1 px-2 normal-case ${
          message.creatorId != user._id.toString()
            ? "bg-blue-900"
            : "bg-indigo-900"
        }`}
      >
        <p className="text-base text-white">{message.content}</p>
        {message.creatorId != user._id.toString() ? (
          <div className="flex w-full justify-end">
            <p className="pr-1 text-xs text-yellow-500 uppercase">
              {message.creatorId}
            </p>
            <p className="text-right text-xs text-white">
              {timestampTxtMessage}
            </p>
          </div>
        ) : (
          <div className="flex w-full justify-start pt-1">
            <p className="pr-1 text-xs text-red-500 uppercase">me</p>
            <p className="text-right text-xs text-white">
              {timestampTxtMessage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export { DashCard, MessageCard, PostCard };
