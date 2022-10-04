import React, { useState } from "react";
import { Hero } from "react-daisyui";
import EmailVerification from "./EmailVerification";
import ForgotPass from "./ForgotPass";
import Login from "./Login";
import Register from "./Register";

const AuthLanding = () => {
    const [form, setForm] = useState("login");

    return (
        <Hero className="w-full lg:h-[50vh] bg-black bg-opacity-30 rounded-lg backdrop-blur-sm overflow-hidden">
            <Hero.Content
                className={`w-full flex-col ${
                    form === "login" || form === "register"
                        ? "lg:flex-row-reverse"
                        : "lg:flex-row"
                } lg:justify-center`}
            >
                {form === "register" && (
                    <>
                        <Banner />
                        <div className="w-full flex lg:w-1/2 lg:pr-12 px-auto">
                            <Register setForm={setForm} />
                        </div>
                    </>
                )}
                {form === "login" && (
                    <>
                        <Banner />
                        <div className="w-full flex lg:w-1/2 lg:pr-24">
                            <Login setForm={setForm} />
                        </div>
                    </>
                )}

                {form === "otp" && (
                    <>
                        <div className="w-full text-center lg:w-1/2 lg:text-left tracking-[5px] ">
                            <h1 className="uppercase font-extrabold text-transparent text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500">
                                Enter your verification code
                            </h1>
                        </div>
                        <div className="w-full flex justify-center items-center h-[50vh]">
                            <EmailVerification setForm={setForm} />
                        </div>
                    </>
                )}
                {form === "reset" && <ForgotPass setForm={setForm} />}
            </Hero.Content>
        </Hero>
    );
};

export default AuthLanding;

const Banner = () => {
    return (
        <div className="w-full text-center lg:w-1/2 lg:text-left tracking-[5px] text-sm lg:text-lg">
            <h1 className="uppercase font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500">
                DevShed
            </h1>
            <p className="py-6">Web development community where people</p>
            <p>
                <span className="uppercase font-bold text-myRed">meet</span>,{" "}
                <span className="uppercase font-bold text-blue-500">
                    inspire
                </span>
                ,{" "}
                <span className="uppercase font-bold text-purple-500">
                    create{" "}
                </span>
                and{" "}
                <span className="uppercase font-bold text-yellow-500">
                    support
                </span>{" "}
                each other
            </p>
        </div>
    );
};
