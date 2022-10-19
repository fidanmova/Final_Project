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
            fetchApiData(location);
        }
    }, [location]);

    return (
        <div>
            {mensen?.length > 0 &&
                mensen.map((mensa) => (
                    <Link href={`/mensen/${mensa.id}`} key={mensa.id}>
                        <a>
                            <h3>{mensa.name}</h3>
                        </a>
                    </Link>
                ))}
        </div>
    );
};

export default Circle;

<iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2430.448944248444!2d13.440828016053247!3d52.47100664761096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a84f9fcdd236b1%3A0x64b7914ccc30ad0a!2sWipperstra%C3%9Fe%2C%2012055%20Berlin!5e0!3m2!1sit!2sde!4v1666171189183!5m2!1sit!2sde"
    width="600"
    height="450"
    style="border:0;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
></iframe>;
