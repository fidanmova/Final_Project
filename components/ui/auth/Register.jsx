import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Form, Card, Button } from "react-daisyui";
import languagesList from "../../../utils/list/languagesList";
import ButtonUI from "./SubmitButton";
import { RiEyeCloseLine, RiEyeLine, RiArrowGoBackLine } from "react-icons/ri";

const Register = ({ setForm }) => {
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
        setForm("otp");
        console.log(data);
    };
    console.log(errors);

    return (
        <Card className="flex-shrink-0 shadow-2xl w-full">
            <Card.Body>
                <Form>
                    <div className="w-full flex flex-col lg:flex-row lg:space-x-2">
                        <div className="w-1/2">
                            <Form.Label title="Username" />

                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type="text"
                                {...register("Username", {
                                    required: true,
                                    min: 3,
                                    maxLength: 80,
                                })}
                            />
                        </div>
                        <div className="w-1/2">
                            <Form.Label title="Email" />
                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type="text"
                                {...register("Email", {
                                    required: true,
                                    pattern: /^\S+@\S+$/i,
                                })}
                            />
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <div className="w-1/2">
                            <Form.Label title="Password" />

                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type={show ? "text" : "password"}
                                {...register("Password", {
                                    required: true,
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                                })}
                            />
                            {show ? (
                                <div
                                    className="flex space-x-2 py-1.5 pl-1"
                                    onClick={handleShow}
                                >
                                    <RiEyeLine className="text-yellow-500" />
                                    <p className="italic text-xs">
                                        hide password
                                    </p>
                                </div>
                            ) : (
                                <div
                                    className="flex space-x-2 py-1.5 pl-1"
                                    onClick={handleShow}
                                >
                                    <RiEyeCloseLine className="text-yellow-500 " />
                                    <p className="italic text-xs ">
                                        show password
                                    </p>
                                </div>
                            )}
                        </div>
                        <div className="w-1/2">
                            <Form.Label title="Repeat Password" />

                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type={show ? "text" : "password"}
                                {...register("Password2", {
                                    required: true,
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                                })}
                            />
                        </div>
                    </div>
                    <div className="w-full flex flex-col lg:flex-row lg:space-x-2">
                        <div className="w-1/2">
                            <Form.Label title="City" />

                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type="text"
                                {...register("City", { required: true })}
                            />
                        </div>
                        <div className=" w-1/2">
                            <Form.Label title="Language" />
                            <div className="flex w-full component-preview items-center justify-center gap-2 font-sans">
                                <select
                                    {...register("Title", { required: true })}
                                    className="select select-bordered w-full bg-transparent focus:border-4 focus:border-myPurple text-blue-600"
                                >
                                    <option disabled selected>
                                        choose language
                                    </option>
                                    {languagesList &&
                                        languagesList.map((language, i) => (
                                            <option key={i}>{language}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between pt-4">
                        <label
                            className="label"
                            onClick={() => setForm("login")}
                        >
                            <div className="text-xs hover:text-blue-500 flex items-center">
                                <RiArrowGoBackLine />
                                <p className="pl-1">Back</p>
                            </div>
                        </label>
                        <label
                            className="label"
                            onClick={() => setForm("reset")}
                        >
                            <p className="text-xs hover:text-blue-500">
                                Forgot password?
                            </p>
                        </label>
                    </div>
                    <Button
                        className="bg-gradient-to-r from-blue-900 to-purple-900  mt-4"
                        onClick={handleSubmit(onSubmit)}
                    >
                        enter
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
export default Register;
