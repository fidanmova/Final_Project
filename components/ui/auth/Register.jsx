import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Form, Card, Option, Select } from "react-daisyui";
import languagesList from "../../../utils/languagesList";

const Register = ({ setForm }) => {
    console.log("languagesList", languagesList);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => console.log(data);
    console.log(errors);

    return (
        <Card className="flex-shrink-0 w-full shadow-2xl">
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex space-x-2">
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
                                type="password"
                                {...register("Password", {
                                    required: true,
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                                })}
                            />
                        </div>
                        <div className="w-1/2">
                            <Form.Label title="Repeat Password" />

                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type="password"
                                {...register("Password2", {
                                    required: true,
                                    pattern:
                                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                                })}
                            />
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <div className="w-1/2">
                            <Form.Label title="City" />

                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type="text"
                                {...register("City", { pattern: /\p{L}/i })}
                            />
                        </div>
                        <div className=" w-1/2">
                            <Form.Label title="Language" />
                            <div className="flex w-full component-preview items-center justify-center gap-2 font-sans">
                                <select
                                    {...register("Title", { required: true })}
                                    className="select select-bordered w-full bg-transparent focus:border-4 focus:border-myPurple"
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
                            <p className="text-xs">Back</p>
                        </label>
                        <label
                            className="label"
                            onClick={() => setForm("reset")}
                        >
                            <p className="text-xs">Forgot password?</p>
                        </label>
                    </div>
                    <Button className="bg-gradient-to-r from-indigo-500 to-blue-900 mt-10">
                        Sign Up
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
export default Register;
