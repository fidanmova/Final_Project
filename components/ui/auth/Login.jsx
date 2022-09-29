import { useRouter } from "next/router";
import React, { useState } from "react";
import { Card, Form, Input } from "react-daisyui";
import { useForm } from "react-hook-form";
import ButtonUI from "./SubmitButton";
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
        console.log(data);
    };
    console.log(errors);

    return (
        <Card className="flex-shrink-0 w-full max-w-sm shadow-2xl h-[50vh] ">
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Label title="Email" />
                    <Input
                        type="text"
                        placeholder="email"
                        className="input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                        {...register("email", {
                            required: true,
                            pattern:
                                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
                        })}
                    />
                </Form>
                <Form>
                    <Form.Label title="Password" />
                    <Input
                        type={show ? 'text' : 'password'}
                        placeholder="password"
                        className="input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                        {...register("password", {
                            required: true,
                            pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                        })}
                    />
                    <div className="w-full text-myYellow flex items-center z-50 pr-4 lg:pr-0 lg:p-4">
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
                            <p className="text-xs hover:text-blue-500">Forgot password?</p>
                        </label>
                        <label
                            className="label"
                            onClick={() => setForm("register")}
                        >
                            <p className="text-xs hover:text-blue-500">Not a member?</p>
                        </label>
                    </div>
                </Form>

                <ButtonUI title="login" onSubmit={onSubmit} />
            </Card.Body>
        </Card>
    );
};

export default Login;
