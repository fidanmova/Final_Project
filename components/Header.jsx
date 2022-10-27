import React, { useCallback } from "react";
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
  //   console.log("USER", user);

  const logOut = useCallback(
    async (e) => {
      e.preventDefault();

      try {
        const response = await fetcher("/api/auth", {
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
    <>
      <Link href="/">
        <h1 className="uppercase font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500 cursor-pointer hover:scale-95 transition duration-200 ease-in-out">
          DevShed
        </h1>
      </Link>

      <div className="flex items-center space-x-4">
        {user !== null ? (
          <Link href="/dashboard">
            <>
              <ImPacman className="text-yellow-500 text-lg" />
              <p className="font-bold uppercase">{user?.username}</p>
              <IoMdLogOut
                className="text-myRed text-xl cursor-pointer hover:scale-150 transition duration-200 ease-in-out"
                onClick={logOut}
              />
            </>
          </Link>
        ) : (
          <div className="w-12 h-10 flex justify-center items-center rounded-lg bg-gradient-to-r from-blue-900 to-purple-900  mt-4 ">
            <Link href="/">
              <CgLogIn className="text-yellow-500 text-2xl font-bold" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
