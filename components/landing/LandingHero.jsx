import React, { useState } from "react";
import { Hero } from "react-daisyui";
import ForgotPass from "../ui/auth/ForgotPass";
import Login from "../ui/auth/Login";
import Register from "../ui/auth/Register";

const LandingHero = () => {
    const [form, setForm] = useState("login");
    return (
        <Hero className="bg-black bg-opacity-30 rounded-lg backdrop-blur-sm w-screen h-full overflow-hidden">
            <Hero.Content className="w-full flex-col lg:flex-row-reverse lg:justify-center">
                <div className="w-full text-center lg:w-1/2 lg:text-left tracking-[5px] ">
                    <h1 className="text-5xl font-bold uppercase">DevShed</h1>
                    <p className="py-6">
                        Web development community where people
                    </p>
                    <p>
                        <span className="uppercase font-bold text-myRed">
                            meet
                        </span>
                        ,{" "}
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
                <div className="w-full flex lg:lg:w-1/2">
                    {form === "login" && <Login setForm={setForm} />}
                    {form === "register" && <Register setForm={setForm} />}
                    {form === "reset" && <ForgotPass setForm={setForm} />}
                </div>
            </Hero.Content>
        </Hero>
    );
};

export default LandingHero;
