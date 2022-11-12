import { Button, Form } from "react-daisyui";
import { fetcher } from "../../../utils/fetcher";
import { usePostPages } from "../../../utils/post/hooks";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import InputEmoji from "react-input-emoji";
import { AiOutlineSend } from "react-icons/ai";

const PosterInner = ({ user }) => {
    const [comments, setComments] = useState();
    const [content, setContent] = useState();
    console.log("content", content);

    const [isLoading, setIsLoading] = useState(false);

    const { mutate } = usePostPages();

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
            //toast.error(e.message);
        } finally {
            setIsLoading(false);
        }
    };
    // [mutate]

    return (
        <Form onSubmit={onSubmit}>
            <div className="w-full flex">
                <InputEmoji
                    value={content}
                    onChange={setContent}
                    cleanOnEnter
                    placeholder="hi"
                    borderRadius={2}
                    borderColor="#eeff00"
                    theme="dark"
                />
                <Button className="p-1.5" type="submit" loading={isLoading}>
                    <AiOutlineSend className="text-green-500 text-2xl" />
                </Button>
            </div>
        </Form>
    );
};

const Poster = () => {
    const { data, error } = useCurrentUser();
    const loading = !data && !error;

    return (
        <div className="h-[12vh] pt-4">
            {loading && <div> ... LOAD</div>}
            {!loading && data?.user ? (
                <PosterInner user={data.user} />
            ) : (
                <p>No Messages in the feed.</p>
            )}
        </div>
    );
};

export default Poster;
