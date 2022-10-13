import { useRouter } from "next/router";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button, Card, Form, Input } from "react-daisyui";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { fetcher } from "../../../utils/fetcher";
import { useCurrentUser } from "../../../utils/user/hooks";

const Login = ({ setForm }) => {
    const router = useRouter();
    const { data: { user } = {}, mutate, isValidating } = useCurrentUser();
    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };

    const emailRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if (isValidating) return;
        if (user) router.replace("/dashboard");
    }, [user, router, isValidating]);

    const onSubmit = useCallback(
        async (data) => {
            try {
                const response = await fetcher("/api/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: data.email,
                        password: data.password,
                    }),
                });
                mutate({ user: response.user }, false);
                toast.success("You have been logged in.");
                router.push("/dashboard");
            } catch (e) {
                toast.error("Incorrect email or password.");
                console.error("Incorrect email or password.");
            }
        },
        [mutate]
    );

    return (
        <Card className="flex-shrink-0 w-full shadow-md shadow-yellow-500">
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Label title="Email" />
                    <Input
                        type="text"
                        className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                        ref={emailRef}
                    />

                    <Form.Label title="Password" />
                    <Input
                        type={show ? "text" : "password"}
                        className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                        ref={passwordRef}
                    />
                    <div className="w-full text-myYellow flex items-center z-50 pr-4 pt-2 lg:pr-0 ">
                        {show ? (
                            <div
                                className="flex space-x-2"
                                onClick={handleShow}
                            >
                                <RiEyeLine className="text-yellow-500" />
                                <p className="italic text-xs">hide password</p>
                            </div>
                        ) : (
                            <div
                                className="flex space-x-2"
                                onClick={handleShow}
                            >
                                <RiEyeCloseLine className="text-yellow-500" />
                                <p className="italic text-xs ">show password</p>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between pt-4">
                        <label
                            className="label"
                            onClick={() => setForm("reset")}
                        >
                            <p className="text-xs hover:text-blue-500">
                                Forgot password?
                            </p>
                        </label>
                        <label
                            className="label"
                            onClick={() => setForm("register")}
                        >
                            <p className="text-xs hover:text-blue-500">
                                Not a member?
                            </p>
                        </label>
                    </div>
                </Form>

                <Button
                    className="bg-gradient-to-r from-blue-900 to-purple-900  mt-4"
                    type="sucess"
                >
                    enter
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Login;
