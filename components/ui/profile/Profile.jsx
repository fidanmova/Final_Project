import React from "react";
import Image from "next/image";
import { useCurrentUser } from "../../../utils/user/hooks";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { TbBackspace, TbMessages } from "react-icons/tb";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { fetcher } from "../../../utils/fetcher";

export default function Profile({ user }) {
    const { data, mutate } = useCurrentUser();
    const router = useRouter();

    const addToCircle = async () => {
        try {
            //console.log(data?.user?._id && user._id)
            if (data?.user?._id && user._id) {
                const response = await fetcher(
                    `/api/users/${data.user.username}/updateCircle`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: data.user._id,
                            circle: user._id,
                        }),
                    }
                );

                //                console.log(`/api/users/${user.username}/updateCircle`);
                toast.success(
                    `${list.username.toUpperCase()} is now in your circle`
                );
                mutate({ user: response }, false);
            }
        } catch (error) {
            console.error("Ops...something went wrong!");
        }
    };

    const deleteFromCircle = async () => {
        try {
            if (data?.user?._id && user._id) {
                const response = await fetcher(
                    `/api/users/${data.user.username}/updateCircle`,
                    {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            id: data.user._id,
                            circle: user._id,
                        }),
                    }
                );

                mutate({ user: response }, false);
                toast.error(
                    `${user.username.toUpperCase()} is not in your circle anymore`
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full h-full lg:p-10 pt-2">
            <div className="p-8 bg-gray-900 shadow rounded-3xl  mt-0.5 opacity-80 bg-red-500/10">
                <div className="p-6 bg-gray-900 shadow rounded-3xl mt-0.5">
                    <div
                        className="w-1/3 flex items-center space-x-2 capitalize text-xl"
                        onClick={() => router.back()}
                    >
                        <TbBackspace className="text-3xl text-pink-500" />
                        <p>back</p>
                    </div>
                    <div className="lg:p-7 bg-gray-800 shadow mt-8   ">
                        <div className="grid grid-cols-1 md:grid-cols-3 ">
                            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                                <div>
                                    <p className="font-bold text-red-500 text-xl">
                                        {user?.circle?.length}
                                    </p>
                                    <p className="text">Circle</p>
                                </div>
                                <div>
                                    <p className="font-bold text-yellow-500 text-xl">
                                        {user?.code?.length
                                            ? user?.code?.length
                                            : "0"}
                                    </p>
                                    <p className="text">Code Files</p>
                                </div>
                                <div>
                                    <p className="font-bold text-purple-500  text-xl">
                                        {Math.floor(Math.random() * 10)}
                                    </p>
                                    <p className="text">Comments</p>
                                </div>
                                <div>
                                    <p className="font-bold text-blue-500 text-xl">
                                        {user?.events?.length}
                                    </p>
                                    <p className="text">Events</p>
                                </div>
                                <div className=" ">
                                    <p className="font-bold text-pink-500 text-xl">
                                        {user?.jobs?.length}
                                    </p>
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
                            {data.user._id !== user._id && (
                                <div className="lg:space-x-8 flex justify-between mt-32 md:mt-2 md:justify-center font-extrabold ">
                                    {data?.user?.circle?.includes(user._id) ? (
                                        <HiUserRemove
                                            className="text-3xl text-zinc-700"
                                            onClick={deleteFromCircle}
                                        />
                                    ) : (
                                        <HiUserAdd
                                            className="text-3xl text-green-500"
                                            onClick={addToCircle}
                                        />
                                    )}
                                    <TbMessages className="text-3xl text-purple-500" />
                                </div>
                            )}
                        </div>

                        <div className="mt-12 text-center border-b pb-4  ">
                            <h1>
                                <span className="uppercase font-extrabold text-transparent text-lg lg:text-4xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500">
                                    {" "}
                                    {user?.username}
                                </span>
                            </h1>
                            <h2 className="text-xl font-medium text">
                                {user?.email}
                            </h2>
                            <p className="text-lg font-light text mt-3">
                                {user?.city}
                            </p>

                            <p className="mt-6 text-lg">{user?.position}</p>
                            <p className="mt-2 text-lg">{user?.language}</p>
                        </div>

                        <div className="my-6 flex flex-col justify-center">
                            <p className="text-lg text-center font-light lg:px-16">
                                {user?.bio}
                            </p>
                        </div>
                        <div className="flex flex-wrap px-4 mt-6 justify-evenly">
                            <div className="w-full  lg:w-1/2 mt-4 px-2 text-lg tracking-wider overflow-x-auto ... ">
                                <span className="uppercase font-extrabold text-pink-500">
                                    Jobs
                                </span>{" "}
                                List :
                                {user?.jobs?.length > 0 ? (
                                    user.jobs.map((el, i) => (
                                        <div key={i} className=" ">
                                            <p className="text-xs">
                                                {i + 1}.&emsp;{el}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className=" italic text-xs">
                                        No Job Saved
                                    </p>
                                )}
                            </div>
                            <div className="w-full lg:w-1/2 mt-4 px-2 text-lg tracking-wider overflow-x-auto ...">
                                <span className="uppercase font-extrabold text-blue-500">
                                    Events{" "}
                                </span>
                                List :
                                {user.events.length > 0 ? (
                                    user.events.map((el, i) => (
                                        <div key={i} className=" ">
                                            <p className="text-xs">
                                                {i + 1}.&emsp;{el}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className=" italic text-xs">
                                        No Event Saved
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
