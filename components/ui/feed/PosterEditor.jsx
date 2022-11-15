import { Button, Form } from "react-daisyui";
import { fetcher } from "../../../utils/fetcher";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useState } from "react";
import InputEmoji from "react-input-emoji";
import { AiOutlineSend } from "react-icons/ai";

const PosterInner = ({ user }) => {
    const [comments, setComments] = useState();
    const [content, setContent] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const data = await fetcher("/api/editorPosts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: content,
                }),
            });
            setContent("");
            setComments([data, ...comments]);
            mutate({ user: data }, false);
        } catch (e) {
            console.error(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const onEnter = async () => {
        try {
            setIsLoading(true);
            const data = await fetcher("/api/editorPosts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    content: content,
                }),
            });
            setContent("");
            setComments([data, ...comments]);
            mutate({ user: data }, false);
        } catch (e) {
            console.error(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Form onSubmit={onSubmit}>
            <div className="w-full flex">
                <InputEmoji
                    value={content}
                    onChange={setContent}
                    onEnter={onEnter}
                    cleanOnEnter
                    placeholder="comment my code..."
                    borderRadius={2}
                    borderColor="#eeff00"
                    theme="dark"
                />
                <Button className="p-1.5" type="submit" loading={isLoading}>
                    <AiOutlineSend className="text-purple-500 text-2xl" />
                </Button>
            </div>
        </Form>
    );
};

const PosterEditor = () => {
    const { data, error } = useCurrentUser();
    const loading = !data && !error;

    return (
        <div className="h-[8vh] pt-4">
            {loading && <div> ... LOAD</div>}
            {!loading && data?.user ? (
                <PosterInner user={data.user} />
            ) : (
                <p>No Messages in the feed.</p>
            )}
        </div>
    );
};

export default PosterEditor;
