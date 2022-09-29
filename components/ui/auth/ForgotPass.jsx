import React, { useRef, useState } from "react";
import { Button, Card, Form, Input } from "react-daisyui";

const ForgotPass = ({ setForm }) => {
    const [reset, setReset] = useState(false);
    const email = useRef(null);
    const onSubmit = (data) => {
        setReset(true);
        console.log(data);
    };

    return (
        <>
            {!reset ? (
                <>
                    <div className="w-full h-[50vh] flex justify-center items-center">
                        <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl ">
                            <Card.Body>
                                <Form>
                                    <Form.Label title="Enter your email" />
                                    <Input
                                        ref={email}
                                        type="text"
                                        placeholder="email"
                                        className="input-bordered bg-transparent focus:border-4 focus:border-myPurple"
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
                                    className="bg-gradient-to-r from-blue-900 to-purple-900 mt-2"
                                    onClick={onSubmit}
                                >
                                    reset
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="w-full text-center lg:w-1/2 lg:text-left tracking-[5px] ">
                        <h1 className="uppercase font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-red-800 via-blue-800 to-purple-500">
                            reset your password
                        </h1>
                    </div>
                </>
            ):(<div className="w-full h-[50vh] flex justify-center items-center tracking-[5px] ">
            <h1 className="uppercase font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-red-800 via-blue-800 to-purple-500">
                check your email
            </h1>
        </div>)}
        </>
    );
};

export default ForgotPass;
