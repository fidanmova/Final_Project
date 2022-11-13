import { Button } from "react-daisyui";
import { usePostPages } from "../../../utils/post/hooks";
import { PostCard } from "../Card";

const PostList = ({ user }) => {
    const {
        data,
        size,
        setSize,
        isLoadingMore,
        isReachingEnd,
    } = usePostPages();
    const posts = data
        ? data.reduce((acc, val) => [...acc, ...val.posts], [])
        : [];

    return (
        <div className="w-full h-[72vh] flex flex-wrap overflow-y-scroll scrollbar-hide pt-2">
            {posts &&
                posts.map((post, i) => {
                    return <PostCard post={post} key={i} />;
                })}
            <div className="w-full">
                {isReachingEnd ? (
                    <div>No more posts are found</div>
                ) : (
                    <Button
                        className="w-full hover:bg-blue-800/80 hover:after:text-white"
                        variant="ghost"
                        loading={isLoadingMore}
                        onClick={() => setSize(size + 1)}
                    >
                        Load more
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PostList;
