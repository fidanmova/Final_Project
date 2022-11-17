import React, { useMemo, useContext } from "react";
import { Context } from "../../utils/context/context";
import { format } from "@lukeed/ms";
import Link from "next/link";
import { Card } from "react-daisyui";
import { useCurrentUser } from "../../utils/user/hooks";

const DashCard = ({ title, text, style }) => {
    return (
        <Link href={title === "code" ? `/editor` : `/${title}`}>
            <a>
                <Card
                    className={`bg-black/70 w-[42vw] lg:w-[30vw] h-[26vh] m-1 text-sm border-blue-500/50 hover:scale-95 shadow-md cursor-pointer ${style}`}
                >
                    <div className="w-full h-full flex flex-col space-y-6 items-center py-6">
                        <h2 className={`text-2xl`}>{title}</h2>
                        <p className="text-md capitalize text-white">{text}</p>
                        <p>enter</p>
                    </div>
                </Card>
            </a>
        </Link>
    );
};

const PostCard = ({ post }) => {
    const timestampTxtPost = useMemo(() => {
        const diff = Date.now() - new Date(post.createdAt).getTime();
        if (diff < 1 * 60 * 1000) return "Just now";
        return `${format(diff, true)} ago`;
    }, [post.createdAt]);
    const { data: currentUser } = useCurrentUser();

    return (
        <Card
            className={`bg-black/70 w-full m-1 text-sm border-blue-500/50 shadow-md rounded-none`}
        >
            <Link href={`/user/${post.creator._id}`}>
                <a>
                    <div
                        className={`first-letter:w-full h-full flex flex-col justify-between items-start p-2 `}
                    >
                        <h2
                            className={`text-base bold ${
                                post.creator.username ==
                                currentUser.user.username
                                    ? "text-red-500"
                                    : "text-yellow-500"
                            }`}
                        >
                            {post.creator.username}
                        </h2>
                        <p className="text-md capitalize text-white">
                            {post.content}
                        </p>
                        <div className="w-full flex justify-end">
                            <time
                                dateTime={String(post.createdAt)}
                                className="text-[10px] text-right font-gray-200 item-end"
                            >
                                {timestampTxtPost}
                            </time>
                        </div>
                    </div>
                </a>
            </Link>
        </Card>
    );
};

const EditorCard = ({ message }) => {
    const timestampTxtPost = useMemo(() => {
        const diff = Date.now() - new Date(message.createdAt).getTime();
        if (diff < 1 * 60 * 1000) return "Just now";
        return `${format(diff, true)} ago`;
    }, [message.createdAt]);
    const { data: currentUser, error } = useCurrentUser();

    return (
        <Card className="rounded-0 bg-black/70 w-full m-1 text-sm border-y-blue-500/50 shadow-md shadow-black">
            <Link href={`/user/${message.creator._id}`}>
                <a>
                    <div
                        className={`first-letter:w-full h-full flex flex-col justify-between items-start p-2 `}
                    >
                        <h2
                            className={`text-base bold ${
                                message.creator.username ==
                                currentUser.user.username
                                    ? "text-red-500"
                                    : "text-yellow-500"
                            }`}
                        >
                            {message.creator.username}
                        </h2>
                        <p className="text-md capitalize text-white">
                            {message.content}
                        </p>
                        <div className="w-full flex justify-end">
                            <time
                                dateTime={String(message.createdAt)}
                                className="text-[10px] text-right font-gray-200 item-end"
                            >
                                {timestampTxtPost}
                            </time>
                        </div>
                    </div>
                </a>
            </Link>
        </Card>
    );
};

const MessageCard = ({ message, user }) => {
    const { groupMembers } = useContext(Context);

    const senderResult = (arr, creatorId) => {
        const found = arr.find((el) => el._id === creatorId);
        if (!found) {
            return "";
        }
        return found.username;
    };

    const sender = senderResult(groupMembers, message.creatorId);

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
                className={`min-w-[15vw] max-w-[55%] py-1 px-2 normal-case ${
                    message.creatorId != user._id.toString()
                        ? "bg-blue-900"
                        : "bg-purple-900"
                }`}
            >
                <p className="text-base text-white">{message.content}</p>
                {message.creatorId != user._id.toString() ? (
                    <div className="flex w-full justify-end">
                        <p className="pr-1 text-xs text-yellow-500 uppercase">
                            {sender}
                        </p>
                        <p className="text-right text-xs text-white">
                            {timestampTxtMessage}
                        </p>
                    </div>
                ) : (
                    <div className="flex w-full justify-start pt-1">
                        <p className="pr-1 text-xs text-red-500 uppercase">
                            me
                        </p>
                        <p className="text-right text-xs text-white">
                            {timestampTxtMessage}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
export { DashCard, MessageCard, PostCard, EditorCard };
