import { Button, Input, Text, Form, Textarea } from "react-daisyui";
// import { LoadingDots } from "@/components/LoadingDots";
import { fetcher } from "../../../utils/fetcher";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import InputEmoji from "react-input-emoji";

const PosterInner = ({ user }) => {
    const [comments, setComments] = useState();
    const [content, setContent] = useState();
    console.log("content", content);

    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = usePostPages();

    // const onChangeHandler = (e) => {
    //     setUserInput((prevUser) => ({
    //         ...prevUser,
    //         [e.target.name]: e.target.value,
    //     }));
    // };

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
            setContent("");
            setComments([data, ...comments]);
            mutate({ posts: data }, false);
            toast.success("You have posted successfully");
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
                <InputEmoji
                    value={content}
                    onChange={setContent}
                    cleanOnEnter
                    placeholder="What's on your mind ?"
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
            {loading && <div> ... LOAD</div>}
            {!loading && data?.user ? (
                <PosterInner user={data.user} />
            ) : (
                <Text>No Messages in the feed.</Text>
            )}
        </div>
    );
};

export default Poster;
