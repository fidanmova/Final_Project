import { MdOutlineLocationCity } from "react-icons/md";
import { useState, useEffect } from "react";
import { Maps } from "../circle/Maps";

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
        <div className="w-11/12 lg:w-[15vw] lg:h-[80vh] flex flex-col items-center justify-center bg-black/50 rounded-lg shadow-red-500 shadow-md text-xs lowercase">
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
                <div className="w-full flex items-center capitalize">
                    <p className="w-1/2 uppercase">your language:</p>
                    <p className="w-1/2"> {data?.user?.language}</p>
                </div>
                <div className="w-full flex flex-col capitalize">
                    <p className="w-1/2 pb-3 uppercase">Devs in Your Circle:</p>

                    {data?.user?.circle.length === 0 && (
                        <p className="w-1/2"> {myCircle}</p>
                    )}
                    {data?.user?.circle.length !== 0 &&
                        myCircle?.map((myc, i) => (
                            <p className="w-1/2" key={i}>
                                {myc.username}
                            </p>
                        ))}
                </div>

                <div className="flex flex-col items-center justify-center"></div>
            </div>
        </div>
    );
};

export default LeftSide;
