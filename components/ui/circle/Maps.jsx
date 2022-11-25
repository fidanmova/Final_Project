import { getCenter } from "geolib";
import { useState, useEffect } from "react";
import { Tooltip } from "react-daisyui";
import { CgPinAlt } from "react-icons/cg";
import Link from "next/link";
import { useRouter } from "next/router";

import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
//import Message from "../message/Message";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { TbMessages } from "react-icons/tb";
import { ImProfile } from "react-icons/im";

export const Maps = ({ location, w, h }) => {
  const [viewport, setViewport] = useState({
    latitude: location[0],
    longitude: location[1],
  });
  useEffect(() => {
    if (!location) {
      setViewport({ latitude: "49.6", longitude: "9.1" });
    }
  }, [location]);

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
          <Tooltip message="You Are Here" className="text-green-500 capitalize">
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
  deleteFromCircle,
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

  const router = useRouter();
  const [usersCoords, setUsersCoords] = useState(null);
  // console.log("usersCoords", usersCoords);
  // console.log("single=>", singleUser);

  useEffect(() => {
    if (users && users !== null && singleUser === null) {
      const coordinates = users.map((user) => ({
        latitude: user.location[0].toString(),
        longitude: user.location[1].toString(),
      }));
      //   console.log("COOORDS", coordinates);
      const center = getCenter(coordinates);
      //   console.log("CENTER", center);
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
          usersCoords.map((use, i) => (
            <div key={i}>
              <Marker
                latitude={use.location[0]}
                longitude={use.location[1]}
                offsetLeft={-20}
                offsetTop={-10}
              >
                <a
                  onClick={() => {
                    // setSelectedUser(user);

                    setSingleUser(use);
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
                  content="black"
                >
                  <div className="flex flex-col p-4 bg-black/80 rounded font-bold">
                    <div className="flex flex-col  ">
                      <div className="space-y-8">
                        <Link href={`/user/${singleUser._id}`}>
                          <p className="hover:underline uppercase font-extrabold text-transparent text-lg lg:text-xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500 hover:scale-95 transition duration-200 ease-in-out text-center hover:tracking-widest cursor-pointer">
                            {singleUser.username}
                          </p>
                        </Link>

                        <div className="flex justify-between capitalize ">
                          <p className="text-green-500">language:</p>

                          <p className="text-blue-500 uppercase pl-2">
                            {singleUser.language ===
                            "JavaScript (React.js and Node.js)"
                              ? "Javascript"
                              : singleUser.language}
                          </p>
                        </div>
                        <div className="flex justify-between ">
                          <p className="text-green-500 capitalize">city:</p>

                          <p className="text-blue-500 uppercase pl-2">
                            {singleUser.city}
                          </p>
                        </div>
                        <div className="h-12 flex justify-evenly items-center">
                          {user?.circle?.includes(singleUser._id) ? (
                            <HiUserRemove
                              className="text-3xl text-zinc-700 cursor-pointer"
                              onClick={() => deleteFromCircle(singleUser)}
                            />
                          ) : (
                            <HiUserAdd
                              className="text-3xl text-green-500 cursor-pointer"
                              onClick={() => addToCircle(singleUser)}
                            />
                          )}
                          <TbMessages
                            className="text-3xl text-purple-500 cursor-pointer"
                            onClick={() => router.push("/chats")}
                          />
                          <Link href={`/user/${singleUser._id}`}>
                            <ImProfile className="text-3xl text-[#ef7f23] cursor-pointer" />
                          </Link>
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
