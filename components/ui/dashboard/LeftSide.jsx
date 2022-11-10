import { useState, useEffect } from "react";
import { Maps } from "../circle/Maps";
import { CgPinAlt } from "react-icons/cg";
import { Link } from "next/link";

const LeftSide = ({ data }) => {
    const [location, setLocation] = useState();
    const [myCircle, setMyCircle] = useState();

    useEffect(() => {
        if (data.user.circle.length !== 0) {
            fetch(`/api/circle/circle`)
                .then((res) => res.json())
                .then(
                    (results) => {
                        //console.log("CIRCLE RESULTS", results);
                        data.user.circle.map((id) => {
                            const myC = results.filter(
                                (user) => user._id === id
                            );
                            setMyCircle(myC);
                        });
                    },
                    (error) => {
                        console.error(error);
                    }
                );
        } else {
            setMyCircle("No One In Tour Circle");
        }
    }, [data]);

    //console.log('location', location)

    useEffect(() => {
        if ("geolocation" in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation([latitude, longitude]);
            });
        }
    }, [location]);
    return (
        <div
            className="w-11/12 lg:w-[15vw] lg:h-[80vh] flex flex-col items-center justify-center bg-black/80 rounded-lg shadow-red-500 
        shadow-md text-xs lowercase overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-[#ff2e2e]/30 pt-10"
        >
            <h1 className="text-xl my-4 capitalize text-left">
                Hi <span className="uppercase">{data?.user?.username}</span>
            </h1>
            <div className="w-11/12 h-full flex flex-col space-y-4 lg:space-y-12">
                <div className="flex items-center">
                    <CgPinAlt className="text-2xl font-extrabold text-green-500" />
                    <p className="capitalize">{data?.user?.city}</p>
                </div>
                <Maps location={data?.user?.location} w="90vw" h="10vh" />
                <div className="w-full flex items-center capitalize">
                    <p className="w-1/2 uppercase">your language:</p>
                    <p className="w-1/2"> {data?.user?.language}</p>
                </div>
                <div className="w-full flex  capitalize">
                    <p className="w-1/2 pb-3 uppercase">
                        <span className="text-2xl text-red-500">
                            {data?.user?.circle.length}
                        </span>{" "}
                        Devs in{" "}
                        <span className="text-red-500 font-bold tracking-widest">
                            Circle:
                        </span>
                    </p>

                    {data?.user?.circle.length === 0 && (
                        <p className="w-1/2 pt-4"> {myCircle}</p>
                    )}
                    <div className="w-full max-h-[20vh] pt-2.5 flex flex-col px-2 overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-[#ff2e2e]/50">
                        {data?.user?.circle.length !== 0 &&
                            myCircle?.map((myc, i) => (
                                <p className="w-full p-4" key={i}>
                                    <span className="text-red-500">
                                        {i + 1} -
                                    </span>{" "}
                                    {myc.username}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="w-full flex capitalize">
                    <p className="w-1/2 uppercase text-blue-500 font-bold tracking-widest">
                        <span className="text-2xl">
                            {" "}
                            {data?.user?.events.length}{" "}
                        </span>{" "}
                        Events :
                    </p>
                    <div className="w-full h-[20vh] flex flex-col px-2 overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-blue-500/50">
                        {data?.user?.events &&
                            data.user.events.map((event, i) => (
                                <p key={i} className="w-full p-4">
                                    <span className="text-blue-500">
                                        {i + 1} -{" "}
                                    </span>
                                    {event}
                                </p>
                            ))}
                    </div>
                </div>
                <div className="w-full flex capitalize">
                    <p className="w-1/2 uppercase text-pink-500 font-bold tracking-widest">
                        <span className="text-2xl">
                            {" "}
                            {data?.user?.jobs.length}{" "}
                        </span>{" "}
                        Jobs :
                    </p>
                    <div className="w-full h-[20vh] flex flex-col px-2 overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-pink-500/50">
                        {data?.user?.jobs.length !== 0 &&
                            data?.user.jobs.map((job, id) => (
                                <p key={id} className="w-full p-4 pt-0">
                                    <span className="text-pink-500">
                                        {" "}
                                        {id + 1} -{" "}
                                    </span>
                                    {job}
                                </p>
                            ))}
                    </div>
                </div>

                <div className="w-full flex capitalize pb-4">
                    <p className="w-1/2 uppercase text-yellow-500 font-bold tracking-widest">
                        <span className="text-2xl">
                            {data?.user?.code.length}
                        </span>
                        Code{data?.user?.code.length > 1 ? "s" : ""} :
                    </p>
                    <div className="w-full h-[20vh] flex flex-col px-2 overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-yellow-500/50">
                        {data?.user?.code.length !== 0 &&
                            data?.user?.code.map((cod, id) => (
                                <div key={id} className="w-full p-4 pt-0">
                                    <span className="text-yellow-500">
                                        {id + 1}
                                    </span>{" "}
                                    {cod}
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftSide;
