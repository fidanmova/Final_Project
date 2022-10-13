import React,{ useCallback, useRef, useState } from "react";
import { Button, Card, Form, Input } from "react-daisyui";
import Link from "next/link";
import { fetcher } from "../../../utils/fetcher";

const ForgotPass = ({ setForm }) => {
    const [reset, setReset] = useState(false);
    const email = useRef(null);

    console.log("email", email?.current?.value);

    console.log("reset", reset);

    const onSubmit = useCallback(async (e) => {
        e.preventDefault();
        try {
            setReset(true);
            await fetcher("/api/user/password/resetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.current.value,
                }),
            });
            setForm("newPass");
        } catch (error) {
            console.error(error);
        }
    }, [setForm]);

    return (
        <>
            {!reset ? (
                <>
                    <div className="w-full h-[50vh] flex flex-col lg:flex-row justify-between items-center lg:justify-center">
                        <div className="w-full text-center lg:w-1/2 lg:text-left tracking-[5px] ">
                            <h1 className="uppercase font-extrabold text-transparent text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r  from-red-600 via-purple-500 to-yellow-500">
                                reset your password
                            </h1>
                        </div>
                        <Card className="flex-shrink-0 w-full max-w-sm shadow-md shadow-yellow-500">
                            <Card.Body>
                                <Form onSubmit={onSubmit}>
                                    <Form.Label title="Enter your email" />
                                    <Input
                                        ref={email}
                                        type="text"
                                        placeholder="email"
                                        className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                    />
                                </Form>

                                <div className="flex justify-between pt-4">
                                    <label
                                        className="label"
                                        onClick={() => setForm("login")}
                                    >
                                        <p className="text-xs hover:text-blue-500">
                                            Login
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
                                >
                                    reset!
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                </>
            ) : (
                <div className="w-full h-[50vh] flex flex-col justify-center items-center tracking-[5px] space-y-8">
                    <h1 className="uppercase text-center font-extrabold text-transparent text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500">
                        check your email
                    </h1>
                    <p>
                        <Link href="/home">home</Link>
                    </p>
                </div>
            )}
        </>
    );
};

export default ForgotPass;
