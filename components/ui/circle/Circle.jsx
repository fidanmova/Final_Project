import { useEffect, useState } from "react";
import Link from "next/link";
const Circle = () => {
    const [mensen, setMensen] = useState([]);
    const [location, setLocation] = useState();

    const fetchApiData = async ({ latitude, longitude }) => {
        const res = await fetch(
            `https://openmensa.org/api/v2/canteens?near[lat]=${latitude}&near[lng]=${longitude}&near[dist]=5000`
        );
        const data = await res.json();
        setMensen(data);
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLocation({ latitude, longitude });
            });
        }
    }, []);

    useEffect(() => {
        // Fetch data from API if `location` object is set
        if (location) {
            console.log("Location: " + location.latitude, location.longitude);
        }
    }, [location]);

    return (
        <div className="flex justify-center items-center">
            {location && (
                <>
                    <p>{location.latitude}</p> -<p>{location.longitude}</p>
                </>
            )}
        </div>
    );
};

export default Circle;
//
//https://www.google.pl/maps/@51.5088233,-0.1296787,13z
