import { useCurrentUser } from "../../../utils/user/hooks";
import Poster from "./Poster";
import PostList from "./PostList";

const Feed = () => {
    const {
        data: { user },
    } = useCurrentUser();
    return (
        <div className="w-full p-2 ">
            <Poster />
            <PostList user={user} />
        </div>
    );
};

export default Feed;
