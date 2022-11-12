import { useCurrentUser } from "../../../utils/user/hooks";
import Poster from "./Poster";
import PostList from "./PostList";

const Feed = () => {
    const {
        data: { user },
    } = useCurrentUser();
    return (
        <div className="w-full h-full p-2 ">
            <PostList user={user} />
            <Poster />
        </div>
    );
};

export default Feed;
