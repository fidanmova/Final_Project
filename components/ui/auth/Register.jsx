import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Form, Card, Button } from "react-daisyui";
import languagesList from "../../../utils/list/languagesList";
import { RiEyeCloseLine, RiEyeLine, RiArrowGoBackLine } from "react-icons/ri";
import { fetcher } from "../../../utils/fetcher";
import { generateOTP } from "../../../utils/generateOTP";
import { toast} from "react-toastify";

const Register = ({ setForm, setOTP, setCredentials }) => {
    const [show, setShow] = useState(false);
    const [location, setLocation] = useState();

    const handleShow = () => {
        setShow(!show);
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const OTP = generateOTP(7);
    const onSubmit = useCallback(
        async (data) => {
            try {
                setOTP(OTP);
                const response = await fetcher("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: data.username,
                        email: data.email,
                        password: data.password,
                        city: data.city,
                        language: data.language,
                        OTP: OTP,
                    }),
                });
                toast.error(errors);

                setCredentials(response.user);
                setForm("otp");
                toast("Almost there...");
            } catch (error) {
                toast.error("Ops...something went wrong!");
            }
        },
        [errors, setForm, OTP, setOTP, setCredentials]
    );
    useEffect(() => {
        if ("geolocation" in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }, []);

    return (
        <Card className="flex-shrink-0 shadow-md shadow-yellow-500 w-full">
            <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)} method="POST">
                    <div className="w-full flex space-x-2">
                        <div className="w-1/2">
                            <Form.Label title="Username" />

                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type="text"
                                {...register("username", {
                                    required: "Please enter your username.",
                                    min: { value: 3, message: "min 3 chars" },
                                    maxLength: 80,
                                })}
                            />
                        </div>
                        <div className="w-1/2">
                            <Form.Label title="email" />
                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type="text"
                                {...register("email", {
                                    required: "Please enter your email.",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message:
                                            "Please enter a valid email address.",
                                    },
                                })}
                            />
                        </div>
                    </div>
                    <div className="w-full flex space-x-2">
                        <div className="w-1/2">
                            <Form.Label title="password" />

                            <Input
                                className="w-full input-bordered bg-transparent focus:border-4 focus:border-myPurple"
                                type={show ? "text" : "password"}
                                {...register("password", {
                                    required: "Please enter a password",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                                        message:
                                            "At least 8 characters,uppercase, lowercase,number & a special symbol",
                                    },
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
                                {...register("password2", {
                                    required:
                                        "Please enter your password again",
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i,
                                    },
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
                                {...register("city", {
                                    required: "Please enter your location",
                                })}
                            />
                        </div>
                        <div className=" w-1/2">
                            <Form.Label title="Language" />{" "}
                            <div className="flex w-full component-preview items-center justify-center gap-2 font-sans">
                                <select
                                    {...register("language", {
                                        required:
                                            "Please select your main language",
                                    })}
                                    className="select select-bordered w-full bg-transparent focus:border-4 focus:border-myPurple text-blue-600"
                                >
                                    <option disabled>choose</option>
                                    {languagesList &&
                                        languagesList.map((language, i) => (
                                            <option key={i}>{language}</option>
                                        ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex  flex-wrap w-full">
                        {errors.username && (
                            <li className="w-1/2 text-xs text-red-500">
                                {errors?.username?.message}
                            </li>
                        )}
                        {errors.email && (
                            <li className="w-1/2 text-xs text-red-500">
                                {errors?.email?.message}
                            </li>
                        )}
                        {errors.password && (
                            <li className="w-1/2 text-xs text-red-500">
                                {errors?.password?.message}
                            </li>
                        )}
                        {errors.city && (
                            <li className="w-1/2 text-xs text-red-500">
                                {errors?.city?.message}
                            </li>
                        )}{" "}
                        {errors.language && (
                            <li className="w-1/2 text-xs text-red-500">
                                {errors?.language?.message}
                            </li>
                        )}
                    </div> */}
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
                        type="submit"
                    >
                        enter
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};
export default Register;
