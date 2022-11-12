import { getCenter } from "geolib";
import { useState, useEffect, useCallback } from "react";
import { Button, Tooltip } from "react-daisyui";
import { CgPinAlt } from "react-icons/cg";
import { FaPlus, FaMinus } from "react-icons/fa";
import { RiChatSmile2Line } from "react-icons/ri";
import Link from "next/link";
import { toast } from "react-toastify";

import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from "react-map-gl";
//import Message from "../message/Message";

export const Maps = ({ location, w, h }) => {
    //console.log("location", location);

    const [viewport, setViewport] = useState({
        latitude: location[0],
        longitude: location[1],
    });

    return (
        <div className="w-full flex justify-center items-center rounded-xlp-4">
            <Map
                initialViewState={{
                    latitude: viewport.latitude,
                    longitude: viewport.longitude,
                    zoom: 10,
                }}
                style={{ width: w, height: h }}
                mapStyle="mapbox://styles/incptd/cl9pl9omx000314nx0pmuq15g"
                mapboxAccessToken={process.env.mapbox_key}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
                <Marker
                    latitude={viewport.latitude}
                    longitude={viewport.longitude}
                    offsetLeft={-20}
                    offsetTop={-10}
                >
                    <Tooltip
                        message="You Are Here"
                        className="text-green-500 capitalize"
                    >
                        <p
                            role="img"
                            className="cursor-pointer text-2xl"
                            aria-label="push-pin"
                        >
                            <CgPinAlt className="text-2xl font-extrabold text-green-500 animate-bounce" />
                        </p>
                    </Tooltip>
                </Marker>
            </Map>
        </div>
    );
};

export const MainMap = ({
    users,
    singleUser,
    setSingleUser,
    visible,
    toggleVisible,
    user,
    addToCircle,
}) => {
    const [viewport, setViewport] = useState({
        latitude: 51,
        longitude: 12,
        width: "100%",
        height: "90vh",
        zoom: 6,
    });
    // const [selectedUser, setSelectedUser] = useState(null);
    // //console.log("selected", selectedUser);

    const [usersCoords, setUsersCoords] = useState(null);

    // const [showPopup, setShowPopup] = useState(true);

    useEffect(() => {
        if (
            users !== 0 &&
            users !== undefined &&
            users !== null &&
            singleUser === null
        ) {
            const coordinates = users.map((user) => ({
                latitude: user.location[0],
                longitude: user.location[1],
            }));
            //console.log("COOORDS", coordinates.length);
            const center = getCenter(coordinates);
            //console.log("CENTER", center);
            if (coordinates.length !== 0) {
                setViewport({
                    longitude: center.longitude,
                    latitude: center.latitude,
                    width: "100%",
                    height: "90vh",
                    zoom: 3.5,
                });
            }
            setUsersCoords(users);
        }
        if (singleUser !== null) {
            setViewport({
                longitude: singleUser.location[1],
                latitude: singleUser.location[0],
                width: "100%",
                height: "90vh",
                zoom: 6,
            });
        }
    }, [users, singleUser]);

    return (
        <div className="w-full h-full flex flex-col justify-center items-center lg:rounded-xl">
            <Map
                {...viewport}
                style={{
                    width: "100%",
                    height: "90vh",
                    border: "1px solid red",
                    borderRadius: "1rem",
                }}
                mapStyle="mapbox://styles/incptd/cl9iciho8003v15nwppn42k0w"
                mapboxAccessToken={process.env.mapbox_key}
                onMove={(nextViewport) => setViewport(nextViewport.viewport)}
            >
                <GeolocateControl position="top-left" visualizePitch={true} />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" visualizePitch={true} />
                <ScaleControl />
                {usersCoords &&
                    usersCoords.map((user, i) => (
                        <div key={i}>
                            <Marker
                                latitude={user.location[0]}
                                longitude={user.location[1]}
                                offsetLeft={-20}
                                offsetTop={-10}
                            >
                                <a
                                    onClick={() => {
                                        // setSelectedUser(user);
                                        setShowPopup(true);
                                        setSingleUser(user);
                                    }}
                                >
                                    <p
                                        role="img"
                                        className="cursor-pointer text-2xl"
                                        aria-label="push-pin"
                                    >
                                        <CgPinAlt className="text-2xl font-extrabold text-green-500 animate-bounce" />
                                    </p>
                                </a>
                            </Marker>

                            {singleUser !== null && (
                                <Popup
                                    onClose={() => setSingleUser(null)}
                                    closeOnClick={true}
                                    latitude={singleUser.location[0]}
                                    longitude={singleUser.location[1]}
                                    style={{ width: "100%" }}
                                    content="black"
                                >
                                    <div className="flex flex-col p-4 bg-black/70 rounded font-bold">
                                        <div className="flex flex-col space-y-8 ">
                                            <div className="space-y-1">
                                                <Link
                                                    href={`/user/${singleUser._id}`}
                                                >
                                                    <p className="text-blue-500  text-2xl uppercase text-center">
                                                        {singleUser.username}
                                                    </p>
                                                </Link>

                                                <div className="flex justify-between capitalize ">
                                                    <p className="text-green-500">
                                                        language:
                                                    </p>

                                                    <p className="text-blue-500 uppercase pl-2">
                                                        {singleUser.language ===
                                                        "JavaScript (React.js and Node.js)"
                                                            ? "Javascript"
                                                            : singleUser.language}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between ">
                                                    <p className="text-green-500 capitalize">
                                                        city:
                                                    </p>

                                                    <p className="text-blue-500 uppercase pl-2">
                                                        {singleUser.city}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            )}
                        </div>
                    ))}
            </Map>
        </div>
    );
};
