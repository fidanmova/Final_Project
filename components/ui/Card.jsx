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

const PostCard = ({ post, timestampTxt, style }) => {

  const { data: currentUser } = useCurrentUser();
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


const MessageCard = ({ message, i }) => {
  return (
    <Card
      className={`flex mb-2 text-gray-800 w-[15vw] h-[5vh] m-1 text-sm border-blue-500/50 hover:scale-95 shadow-md ${
        i % 2 === 0 ? "bg-blue-900 items-start" : "bg-indigo-900 items-end"
      }`}
    >
      {/* <div className="w-full h-full flex flex-col justify-between items-center">
        <h2 className={`text-sm`}>{message.content}</h2>

        <p className="text-md capitalize text-white">Me</p>
      </div> */}

      {/* <div className="flex mb-2"> */}
      <div className="rounded py-2 px-3">
        <p className="text-sm text-white">{message.content}</p>
        <p className="text-right text-xs text-grey-dark mt-1">12:45 pm</p>
      </div>
      {/* </div> */}

    </Card>
  );
};
export { DashCard, MessageCard, PostCard };
