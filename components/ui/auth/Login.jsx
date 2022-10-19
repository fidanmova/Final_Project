import { useRouter } from "next/router";
import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Form, Input } from "react-daisyui";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { fetcher } from "../../../utils/fetcher";
import { useCurrentUser } from "../../../utils/user/hooks";
import { toast } from "react-toastify";

const Login = ({ setForm }) => {
    const router = useRouter();

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };

    const [credential, setCredential] = useState({
        email: "",
        password: "",
    });
    console.log("UI credential", credential);

    const handler = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    const [isLoading, setIsLoading] = useState(false);
    console.log("Loading", isLoading);

    const { data: { user } = {}, mutate, isValidating } = useCurrentUser();

    useEffect(() => {
        if (isValidating) return;
        if (user) router.replace("/dashboard");
    }, [user, router, isValidating]);

    const onSubmit = useCallback(
        async (e) => {
            setIsLoading(true);
            e.preventDefault();
            try {
                const response = await fetcher("/api/auth", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credential.email,
                        password: credential.password,
                    }),
                });
                mutate({ user: response.user }, false);
                toast.success(`Hi ${response.user.username}, Welcome to DEVSHED!`);
            } catch (e) {
                toast.error("Incorrect email or password.", e);
            } finally {
                setIsLoading(false);
            }
        },
        [mutate, credential]
    );

    return (
        <Card className="flex-shrink-0 w-full shadow-md shadow-yellow-500">
            <Card.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Label title="Email" />
                    <Input
                        type="text"
                        className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                        name="email"
                        value={credential.email}
                        onChange={handler}
                    />

                    <Form.Label title="Password" />
                    <Input
                        type={show ? "text" : "password"}
                        className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                        name="password"
                        value={credential.password}
                        onChange={handler}
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

                    <Button
                        className="bg-gradient-to-r from-blue-900 to-purple-900  mt-4"
                        type="submit"
                        loading={isLoading}
                    >
                        enter
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Login;
