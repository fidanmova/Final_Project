import React, { useCallback } from "react";
import Link from "next/link";
import { useCurrentUser } from "../utils/user/hooks";
import { ImPacman } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/router";
import { fetcher } from "../utils/fetcher";
import { CgLogIn } from "react-icons/cg";

const Header = () => {
    const router = useRouter();
    const { data: { user } = {}, mutate } = useCurrentUser();
    console.log("USER", user);

    const logOut = useCallback(
        async (e) => {
            e.preventDefault();

            try {
                const response = await fetcher("/api/auth", {
                    method: "DELETE",
                });
                console.log("response", response);
                mutate({ user: null }, false);
                router.replace("/");
            } catch (e) {
                console.error(e);
            }
        },
        [mutate, router]
    );

    return (
        <>
            <Link href="/">
                <button className="uppercase font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500">
                    DevShed
                </button>
            </Link>

            <button className="flex items-center space-x-4">
                {user !== null ? (
                    <>
                        <div className="flex mr-8 items-center space-x-4">
                            <Link href="/circle">
                                <p className="text-red-500 text-xl rounded-lg hover:bg-red-500/50 hover:text-gray-300 p-2">
                                    CIRCLE
                                </p>
                            </Link>
                            <Link href="/chat">
                                <p className="text-purple-500 text-xl rounded-lg hover:bg-purple-500/50 hover:text-gray-300 p-2">
                                    CHAT
                                </p>
                            </Link>{" "}
                            <Link href="/events">
                                <p className="text-blue-500 text-xl rounded-lg hover:bg-blue-500/50 hover:text-gray-300 p-2">
                                    EVENTS
                                </p>
                            </Link>
                            <Link href="/job">
                                <p className="text-pink-500 text-xl rounded-lg hover:bg-pink-500/50 hover:text-gray-300 p-2">
                                    JOBS
                                </p>
                            </Link>
                        </div>
                        <div className="flex space-x-4 items-center p-2 border-4 border-yellow-500/50 rounded-xl">
                            <ImPacman
                                className="text-yellow-500 text-lg"
                                href="/dashboard"
                            />
                            <Link href="dashboard">
                                <p className="font-bold uppercase">
                                    {user?.username}
                                </p>
                            </Link>

                            <IoMdLogOut
                                className="text-myRed text-2xl hover:text-red-500"
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
            </button>
        </>
    );
};

export default Header;
