import { MdOutlineLocationCity } from "react-icons/md";
import { useState, useEffect } from "react";
import { Maps } from "../circle/Maps";

const LeftSide = ({ data }) => {
    const [location, setLocation] = useState();
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
        <div className="w-11/12 lg:w-[15vw] lg:h-[80vh] flex flex-col items-center bg-black/50 rounded-lg shadow-red-500 shadow-md text-xs lowercase">
            <h1 className="text-xl my-4 capitalize">
                Hi {data?.user?.username}
            </h1>
            <div className="w-11/12 h-full flex flex-col space-y-4 lg:space-y-12">
                <div className="flex items-center justify-center space-x-2">
                    {" "}
                    <MdOutlineLocationCity className="text-green-500 text-4xl" />
                    <p className="text-lg capitalize">{data?.user?.city}</p>
                </div>
                <Maps location={data?.user?.location} w="90vw" h="30vh" />
                <div className="flex flex-col items-center justify-center capitalize">
                    <p>your language is:</p>
                    <p> {data?.user?.language}</p>
                </div>
                <div className="flex flex-col items-center justify-center capitalize">
                    <p>Your Circle:</p>
                    <p>
                        {data.user.circle.length !== 0
                            ? data.user.circle
                            : "Not in a circle yet"}
                    </p>
                </div>
                
                <div className="flex flex-col items-center justify-center"></div>
            </div>
        </div>
    );
};

export default LeftSide;
