import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, Card, Form, Input } from "react-daisyui";
import { useForm } from "react-hook-form";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";

const Login = ({ setForm }) => {
    const router = useRouter();

    const [show, setShow] = useState(false);
    const handleShow = () => {
        setShow(!show);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        router.push("/home");
        console.log("puzzetta");
    };

    return (
        <Card className="flex-shrink-0 w-full shadow-md shadow-yellow-500">
            <Card.Body>
                <Form>
                    <Form.Label title="Email" />
                    <Input
                        type="text"
                        className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                                message: "Please enter a valid email address.",
                            },
                        })}
                    />

                    <Form.Label title="Password" />
                    <Input
                        type={show ? "text" : "password"}
                        className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                        {...register("password", {
                            required: true,
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                                message: "Please enter a valid password.",
                            },
                        })}
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
                    onClick={handleSubmit(onSubmit)}
                >
                    enter
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Login;
