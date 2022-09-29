import React, { useState } from "react";
import { Hero } from "react-daisyui";
import EmailVerification from "../ui/auth/EmailVerification";
import ForgotPass from "../ui/auth/ForgotPass";
import Login from "../ui/auth/Login";
import Register from "../ui/auth/Register";

const LandingHero = () => {
    const [form, setForm] = useState("login");
    console.log("form", form);
    return (
        <Hero className=" w-screen h-full min-h-96 bg-black bg-opacity-30 rounded-lg backdrop-blur-sm overflow-hidden">
            <Hero.Content className="w-full flex-col lg:flex-row-reverse lg:justify-center">
                {form === "register" && (
                    <>
                        <Banner />
                        <div className="w-full flex lg:w-1/2 lg:pr-12">
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
                        <div className="w-full flex justify-center items-center">
                            {" "}
                            <EmailVerification setForm={setForm} />
                        </div>
                        <div className="w-full text-center lg:w-1/2 lg:text-left tracking-[5px] ">
                            <h1 className="uppercase font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-red-800 via-blue-800 to-purple-500">
                                Enter your verification code
                            </h1>
                        </div>
                    </>
                )}
                {form === "reset" && <ForgotPass setForm={setForm} />}
            </Hero.Content>
        </Hero>
    );
};

export default LandingHero;

const Banner = () => {
    return (
        <div className="w-full text-center lg:w-1/2 lg:text-left tracking-[5px] ">
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
