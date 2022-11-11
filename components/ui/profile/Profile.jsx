import React from "react";
import Image from "next/image";

export default function Profile({ user }) {
  return (
    <div className="p-16 pt-2">
      <div className="p-8 bg-gray-900 shadow mt-24 rounded-3xl  mt-0.5 opacity-80 bg-red-500/10">
        <div
          className="p-6 bg-gray-900 shadow mt-24 rounded-3xl    mt-0.5 
 "
        >
          <div className="p-7 mt-2 bg-gray-800 shadow mt-24   ">
            <div className="grid grid-cols-1 md:grid-cols-3 ">
              <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                <div>
                  <p className="font-bold text-xl">22</p>
                  <p className="text">Friends</p>
                </div>
                <div>
                  <p className="font-bold  text-xl">{user.code.length}</p>
                  <p className="text">Code Files</p>
                </div>
                <div>
                  <p className="font-bold  text-xl">89</p>
                  <p className="text">Comments</p>
                </div>
                <div>
                  <p className="font-bold  text-xl">{user.events.length}</p>
                  <p className="text">Events</p>
                </div>
                <div className=" ">
                  <p className="font-bold  text-xl">{user.jobs.length}</p>
                  <p className="text">Jobs </p>
                </div>
              </div>

              <div className="relative ">
                <div className="w-48 h-48 bg-yellow-400 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-sky-700 ">
                  <Image
                    width={220}
                    height={220}
                    alt={user?.username}
                    className="rounded-full"
                    src={
                      user?.avatar
                        ? `${user.avatar}`
                        : `https://avatar.tobi.sh/${user?._id}`
                    }
                  />
                </div>
              </div>

              <div className="space-x-8 flex justify-between mt-32 md:mt-2 md:justify-center">
                <button className="btn-lg text py-2 px-4 uppercase rounded-xl bg-sky-700 hover:bg-gray-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5 ">
                  Connect
                </button>
                <button className="btn-lg text py-2 px-4 uppercase rounded-xl bg-sky-700 hover:bg-gray-900 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  Message
                </button>
              </div>
            </div>
            <div className="flex flex-wrap ml-4 mt-6 justify-evenly">
              <div className=" w-1/3 mt-4 text-lg tracking-wider overflow-x-auto ...">
                Jobs List :
                {user.jobs.map((el, i) => (
                  <div key={i} className=" ">
                    <p className="text-xs">
                      {i + 1}.&emsp;{el}
                    </p>
                  </div>
                ))}
              </div>
              <div className="w-1/3 mt-4 text-lg tracking-wider overflow-x-auto ...">
                Events List :
                {user.events.map((el, i) => (
                  <div key={i} className=" ">
                    <p className="text-xs">
                      {i + 1}.&emsp;{el}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 text-center border-b pb-4  ">
              <h1 className="text-6xl font-medium text capitalize">
                {" "}
                {user?.username}
              </h1>
              <h2 className="text-xl font-medium text"> {user?.email}</h2>
              <p className="text-lg font-light text mt-3">{user?.city}</p>

              <p className="mt-6 text-lg">{user?.position}</p>
              <p className="mt-2 text-lg">{user?.language}</p>
            </div>

            <div className="my-6 flex flex-col justify-center">
              <p className="text-lg text-center font-light lg:px-16">
                {user?.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
