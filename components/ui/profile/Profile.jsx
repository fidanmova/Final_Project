import React from "react";
import Image from "next/image";
import { useCurrentUser } from "../../../utils/user/hooks";

export default function Profile() {
  const { data: { user } = {}, mutate } = useCurrentUser();

  return (
    <div className="p-16 pt-2">
      <div className="p-8 bg-gray-900 shadow mt-24 rounded-3xl  border-2 border-yellow-400  mt-0.5 opacity-80 bg-red-500/10">
        <div
          className="p-6 bg-gray-900 shadow mt-24 rounded-3xl    mt-0.5 
 "
        >
          <div className="p-7 mt-2 bg-gray-800 shadow mt-24   ">
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-xl">22</p>
                  <p className="text">Friends</p>
                </div>
                <div>
                  <p className="font-bold  text-xl">10</p>
                  <p className="text">Codes</p>
                </div>
                <div>
                  <p className="font-bold  text-xl">89</p>
                  <p className="text">Comments</p>
                </div>
              </div>
              <div className="relative ">
                <div className="w-48 h-48 bg-yellow-400 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-sky-700 ">
                  <Image
                    width={180}
                    height={180}
                    alt={user?.username}
                    className="rounded-full"
                    src={
                      user?.avatar ? "" : `https://avatar.tobi.sh/${user?._id}`
                    }
                  />
                </div>
              </div>

              <div className="space-x-8 flex justify-between mt-32 md:mt-2 md:justify-center">
                <button className="text py-2 px-4 uppercase rounded-xl bg-sky-700 hover:bg-gray-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 ">
                  Connect
                </button>
                <button className="text py-2 px-4 uppercase rounded-xl bg-sky-700 hover:bg-gray-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Message
                </button>
              </div>
            </div>

            <div className="mt-20 text-center border-b pb-12">
              <h1 className="text-6xl font-medium text capitalize">
                {" "}
                {user?.username}
              </h1>
              <h2 className="text-xl font-medium text"> {user?.email}</h2>
              <p className="font-light text mt-3">my location</p>

              <p className="mt-8 text">Full Stack Web Developer</p>
              <p className="mt-2 text">languages</p>
            </div>

            <div className="mt-12 flex flex-col justify-center">
              <p className="text text-center font-light lg:px-16">
                An artist of considerable range, Ryan — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure. An artist of considerable
                range.
              </p>
              <div className="space-x-8 flex justify-between mt-32 md:mt-2 md:justify-center">
                <button className="text py-2 px-4 uppercase rounded-xl bg-sky-700 hover:bg-gray-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  {" "}
                  My Codes
                </button>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
