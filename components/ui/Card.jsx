import Link from "next/link";
import { Card } from "react-daisyui";

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
    return (
        <Card
            className={`bg-black/70 w-10/12 h-1/4 m-1 text-sm border-blue-500/50 hover:scale-95 shadow-md ${style}`}
        >
            <div
                className={`first-letter:w-full h-full flex flex-col justify-between items-center py-8 `}
            >
                <Link href={`/user/${post.username}`}>
                    <a>
                        <h2 className={`text-lg bold ${style}`}>
                            {post.username}
                        </h2>
                        <p className="text-md capitalize text-white">
                            {post.content}
                        </p>
                        {/* <Link href={`/${title}`}>enter</Link> */}
                    </a>
                </Link>
                <div className="">
                    <time
                        dateTime={String(post.createdAt)}
                        className="text-sm font-gray-200"
                    >
                        {timestampTxt}
                    </time>
                </div>
            </div>
        </Card>
    );
};
//${i % 2 === 0 ? "bg-blue-900 " : "bg-indigo-900"}

const MessageCard = ({ title, text, style }) => {
    return (
        <Card
            className={`bg-black/70 w-[30vw] h-[35vh] m-1 text-sm border-blue-500/50 hover:scale-95 shadow-md ${style}`}
        >
            <div className="w-full h-full flex flex-col justify-between items-center py-8">
                <h2 className={`text-2xl ${style}`}>{title}</h2>
                <p className="text-md capitalize text-white">{text}</p>
                <Link href={`/${title}`}>enter</Link>
            </div>
        </Card>
    );
};
export { DashCard, MessageCard, PostCard };
