import { useEffect, useState } from "react";
import Link from "next/link";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Maps } from "./Maps";

const Circle = () => {
    const [location, setLocation] = useState();

    useEffect(() => {
        if ("geolocation" in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ lat: latitude, lng: longitude });
            });
            if (location) {
                console.log(
                    "Location: " + location.latitude,
                    location.longitude
                );
            }
        }
    }, [location]);

    return (
        <div className="flex justify-center items-center">
            {location && (
                <>
                    <Maps
                        setCoordinates={setCoordinates}
                        coordinates={coordinates}
                        setBounds={setBounds}
                        places={filteredPlaces.length ? filteredPlaces : places}
                    />
                    <p>{location.latitude}</p> -<p>{location.longitude}</p>
                </>
            )}
        </div>
    );
};

export default Circle;
//
//https://www.google.pl/maps/@51.5088233,-0.1296787,13z
