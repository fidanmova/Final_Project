import { getCenter } from "geolib";
import { useState, useEffect } from "react";
import { ImConnection } from "react-icons/im";
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
} from "react-map-gl";

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
                mapStyle="mapbox://styles/incptd/cl9iciho8003v15nwppn42k0w"
                mapboxAccessToken={process.env.mapbox_key}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            />
        </div>
    );
};
export const MainMap = ({ users }) => {
    const [viewport, setViewport] = useState({
        latitude: 51.509865,
        longitude: -0.118092,
        width: "100%",
        height: "80vh",
        zoom: 6,
    });
    const [usersCoords, setUsersCoords] = useState(null);
    // console.log("XXXCoords", usersCoords);
    const [popupInfo, setPopupInfo] = useState(null);
    //console.log("popupInfo", popupInfo);

    useEffect(() => {
        if (users !== 0 && users !== undefined && users !== null) {
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
                    height: "80vh",
                    zoom: 5,
                });
            }
            setUsersCoords(users);
        }
    }, [users]);

    //console.log("VIEWPORT:", viewport);
    return (
        <div className="w-full flex justify-center items-center rounded-xlp-4">
            <Map
                initialViewState={{
                    latitude: viewport.latitude,
                    longitude: viewport.longitude,
                    width: "100%",
                    height: "80vh",
                    zoom: 6,
                    bearing: 0,
                    pitch: 0,
                }}
                {...viewport}
                style={{
                    width: "100%",
                    height: "80vh",
                    border: "1px solid red",
                    borderRadius: "1rem",
                }}
                mapStyle="mapbox://styles/incptd/cl9iciho8003v15nwppn42k0w"
                mapboxAccessToken={process.env.mapbox_key}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />
                {usersCoords &&
                    usersCoords.map((user, i) => (
                        <Marker
                            key={i}
                            latitude={user.location[0]}
                            longitude={user.location[1]}
                            offsetLeft={-20}
                            offsetTop={-10}
                            onClick={(e) => {
                                // If we let the click event propagates to the map, it will immediately close the popup
                                // with `closeOnClick: true`
                                // e.originalEvent.stopPropagation();
                                setPopupInfo(user.username);
                            }}
                        >
                            <a
                                onClick={() => {
                                    //console.log("CLICK");
                                }}
                            >
                                <p
                                    role="img"
                                    className="cursor-pointer text-2xl"
                                    aria-label="push-pin"
                                >
                                    <ImConnection className="text-2xl text-cyan-500" />
                                </p>
                            </a>
                        </Marker>
                    ))}
            </Map>
        </div>
    );
};
