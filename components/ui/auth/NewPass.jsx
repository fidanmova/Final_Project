import { useRef } from "react";
import { Button, Card, Form, Input } from "react-daisyui";

const NewPass = ({ token }) => {
    const password = useRef(null);
    const repeatPass = useRef(null);

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            if (password !== repeatPass) {
                console.error(
                    "passwords do not match",
                    password,
                    " - ",
                    repeatPass
                );
                return;
            }
            try {
                await fetcher("/api/user/password/reset", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        token,
                        password: password.current.value,
                    }),
                });
                setStatus("success");
            } catch (e) {
                toast.error(e.message);
                setStatus(undefined);
            }
        },
        [token]
    );
    s;

    return (
        <div className="w-full h-[50vh] flex flex-col lg:flex-row justify-between items-center lg:justify-center">
            <div className="w-full text-center lg:w-1/2 lg:text-left tracking-[5px] ">
                <h1 className="uppercase font-extrabold text-transparent text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r  from-red-600 via-purple-500 to-yellow-500">
                    Change your password
                </h1>
            </div>
            <Card className="flex-shrink-0 w-full max-w-sm shadow-md shadow-yellow-500">
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Label title="New Password" />
                        <Input
                            ref={password}
                            type="text"
                            className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                        />
                    </Form>

                    <Form.Label title="Repeat Password" />
                    <Input
                        ref={repeatPass}
                        type="text"
                        className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                    />

                    <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-900 to-purple-900 mt-2"
                    >
                        reset
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default NewPass;
