import { Button, Input, Text, Form } from "react-daisyui";
// import { LoadingDots } from "@/components/LoadingDots";
import { fetcher } from "../../../utils/fetcher";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useState } from "react";
import { toast } from "react-toastify";

const PosterInner = ({ user }) => {
    const [comments, setComments] = useState();
    const [content, setContent] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = usePostPages();

    const onChangeHandler = (e) => {
        setUserInput((prevUser) => ({
            ...prevUser,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const data = await fetcher("/api/posts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: content,
                }),
            });
            setComments([data, ...comments]);
            toast.success("You have posted successfully");
            // mutate();
        } catch (e) {
            console.log(e.message);
            // toast.error(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    // [mutate]

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Input
                    value={content}
                    className="mb-2 bg-grey-900/90 "
                    placeholder={`What's on your mind ?`}
                    aria-label={`What's on your mind ?`}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button
                    className="bg-blue-800/80 hover:bg-blue-900/90 text-white hover:border-blue-500/50"
                    type="success"
                >
                    Post
                </Button>
            </Form>
        </>
    );
};

const Poster = () => {
    const { data, error } = useCurrentUser();
    const loading = !data && !error;

    return (
        <div className="">
            {loading && (
                // <LoadingDots>Loading</LoadingDots>
                <div> ... LOAD</div>
            )}
            {!loading && data?.user ? (
                <PosterInner user={data.user} />
            ) : (
                <Text>No Messages in the feed.</Text>
            )}
        </div>
    );
};

export default Poster;
