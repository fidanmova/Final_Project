import React, { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCurrentUser } from "../utils/user/hooks";
import { ImPacman } from "react-icons/im";
import { IoMdLogOut } from "react-icons/io";
import { useRouter } from "next/router";
import { fetcher } from "../utils/fetcher";
import { Button } from "react-daisyui";
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
                {/* <Image
                    src="/logo.svg"
                    alt="logo"
                    width={"150px"}
                    height={"68px"}
                    className="relative m-6"
                /> */}
                <h1 className="uppercase font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500">
                    DevShed
                </h1>
            </Link>

            <div className="flex items-center space-x-4">
                {user !== null ? (
                    <>
                        <ImPacman className="text-yellow-500 text-lg" />
                        <p className="font-bold uppercase">{user?.username}</p>
                        <IoMdLogOut
                            className="text-myRed text-xl"
                            onClick={logOut}
                        />
                    </>
                ) : (
                    <Link href="/">
                        <Button className=" bg-gradient-to-r from-blue-900 to-purple-900  mt-4">
                            <CgLogIn className="text-yellow-500 text-2xl font-bold" />
                        </Button>
                    </Link>
                )}
            </div>
        </>
    );
};

export default Header;
