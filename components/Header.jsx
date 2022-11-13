import React, { useCallback, useState } from "react";
import Link from "next/link";
import { useCurrentUser } from "../utils/user/hooks";
import { ImPacman } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/router";
import { fetcher } from "../utils/fetcher";
import { CgLogIn } from "react-icons/cg";
import Links from "./Links";
import { motion } from "framer-motion";

const Header = () => {
    const router = useRouter();
    const { data: { user } = {}, mutate } = useCurrentUser();
    //console.log("USER", user);

    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    const logOut = useCallback(
        async (e) => {
            e.preventDefault();

            try {
                await fetcher("/api/auth", {
                    method: "DELETE",
                });
                // console.log("response", response);
                mutate({ user: null }, false);
                router.replace("/");
            } catch (e) {
                console.error(e);
            }
        },
        [mutate, router]
    );

    return (
        <header className="w-full h-16 sticky z-50 top-0 flex justify-between items-center px-2 lg:px-6">
            {user !== null ? (
                <Link href="/dashboard">
                    <button className="uppercase font-extrabold text-transparent text-3xl lg:text-4xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500 hover:scale-95 transition duration-200 ease-in-out">
                        DevShed
                    </button>
                </Link>
            ) : (
                <Link href="/">
                    <button className="uppercase font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500 hover:scale-95 transition duration-200 ease-in-out">
                        DevShed
                    </button>
                </Link>
            )}
            {visible && (
                <motion.div
                    initial={{ x: -200, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    onClick={toggleVisible}
                    className="w-screen h-screen absolute top-0 z-[99] bg-black lg:hidden flex flex-col items-center justify-center"
                >
                    <Links style="text-4xl" />
                </motion.div>
            )}
            <div className="flex items-center space-x-4">
                {user !== null ? (
                    <>
                        <div className="hidden lg:flex mr-8 items-center space-x-4">
                            <Links style="text-xl" />
                        </div>
                        <div className="flex space-x-4 items-center p-2 lg:border-4 border-yellow-500/50 rounded-xl">
                            <ImPacman
                                className="text-yellow-500 text-lg hidden lg:inline"
                                href="/dashboard"
                            />

                            <ImPacman
                                className="text-yellow-500 text-lg lg:hidden"
                                color="primary"
                                onClick={toggleVisible}
                            />

                            <Link href={`/user/${user?._id}`}>
                                <p className="font-bold uppercase hover:scale-95 transition duration-200 ease-in-out">
                                    {user?.username}
                                </p>
                            </Link>

                            <IoMdLogOut
                                className="text-myRed text-2xl hover:text-red-500 hover:scale-125 transition duration-200 ease-in-out"
                                onClick={logOut}
                            />
                        </div>
                    </>
                ) : (
                    <div className="w-12 h-10 flex justify-center items-center rounded-lg bg-gradient-to-r from-blue-900 to-purple-900  mt-4">
                        <Link href="/">
                            <CgLogIn className="text-yellow-500 text-2xl font-bold" />
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
