import { getCenter } from "geolib";
import { useState, useEffect } from "react";
import { Button, Tooltip } from "react-daisyui";
import { CgPinAlt } from "react-icons/cg";
import { FaPlus, FaRocketchat } from "react-icons/fa";
import { RiChatSmile2Line } from "react-icons/ri";

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
export const MainMap = ({ users, }) => {
    const [viewport, setViewport] = useState({
        latitude: 51,
        longitude: 12,
        width: "100%",
        height: "80vh",
        zoom: 6,
    });
    const [selectedUser, setSelectedUser] = useState(null);
    //console.log("selected", selectedUser);

    const [usersCoords, setUsersCoords] = useState(null);

    const [showPopup, setShowPopup] = useState(true);
    //console.log("showPopup", showPopup);

    const [chatOpen, setChatOpen] = useState(false);

    useEffect(() => {
        if (users !== 0 && users !== undefined && users !== null) {
            const coordinates = users.map((user) => ({
                latitude: user.location[0],
                longitude: user.location[1],
            }));
            //console.log("COOORDS", coordinates.length);
            const center = getCenter(coordinates);
            console.log("CENTER", center);
            if (coordinates.length !== 0) {
                setViewport({
                    longitude: center.longitude,
                    latitude: center.latitude,
                    width: "100%",
                    height: "80vh",
                    zoom: 4,
                });
            }
            setUsersCoords(users);
        }
    }, [users]);

    return (
        <div className="w-full flex justify-center items-center rounded-xlp-4">
            <Map
                initialViewState={{
                    latitude: viewport.latitude,
                    longitude: viewport.longitude,
                    width: "100%",
                    height: "90vh",
                    zoom: 6,
                    bearing: 0,
                    pitch: 0,
                }}
                {...viewport}
                style={{
                    width: "100%",
                    height: "90vh",
                    border: "1px solid red",
                    borderRadius: "1rem",
                }}
                mapStyle="mapbox://styles/incptd/cl9iciho8003v15nwppn42k0w"
                mapboxAccessToken={process.env.mapbox_key}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
                <GeolocateControl position="top-left" visualizePitch={true} />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
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
                                        setSelectedUser(user);
                                        setShowPopup(true);
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

                            {selectedUser !== null &&
                            selectedUser.username === user.username &&
                            showPopup ? (
                                <Popup
                                    onClose={() => setSelectedUser({})}
                                    closeOnClick={false}
                                    latitude={selectedUser.location[0]}
                                    longitude={selectedUser.location[1]}
                                >
                                    <div className="flex flex-col p-4">
                                        <div className="flex flex-col space-y-8 ">
                                            <div className="space-y-1">
                                                <div className="flex justify-between ">
                                                    <p className="text-green-500">
                                                        username:
                                                    </p>

                                                    <p className="text-blue-500 uppercase pl-2">
                                                        {selectedUser.username}
                                                    </p>
                                                </div>
                                                <div className="flex justify-between ">
                                                    <p className="text-green-500">
                                                        language:
                                                    </p>

                                                    <p className="text-blue-500 uppercase pl-2">
                                                        {selectedUser.language ===
                                                        "JavaScript (React.js and Node.js)"
                                                            ? "Javascript"
                                                            : selectedUser.language}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex justify-between">
                                                <Button className="text-green-500 w-1/2">
                                                    <FaPlus />
                                                </Button>
                                                <Button className="text-green-500 w-1/2">
                                                    <RiChatSmile2Line
                                                        className="text-2xl"
                                                        onClick={() =>
                                                            setChatOpen(!chatOpen)
                                                        }
                                                    />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Popup>
                            ) : (
                                false
                            )}
                        </div>
                    ))}
            {/* {chatOpen && <Message toUser={selecedUser} myself={}/>} */}
            </Map>
        </div>
    );
};
