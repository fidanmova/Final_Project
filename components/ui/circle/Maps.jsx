import GoogleMapReact from "google-map-react";
import { useState } from "react";
// import { IoLocation } from "react-icons/io5";
// import { BiX } from "react-icons/bi";

export const Maps = ({ location, setLocation, setBounds, places }) => {
    const [isCard, setIsCard] = useState(false);
    console.log("Card", isCard);
    const [cardData, setCardData] = useState(null);
    console.log("Data", cardData);

    return (
        <div>
            <GoogleMapReact
                bootstrapURLKeys={process.env.GOOGLE_MAPS_API_KEY}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={10}
                margin={[50, 50, 50, 50]}
                options={""}
                onChange={(e) => {
                    setLocation({ lat: e.center.lat, lng: e.center.lng });
                    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
                }}
                onChildClick={(child) => {
                    setCardData(places[child]);
                    setIsCard(true);
                }}
            ></GoogleMapReact>
        </div>
    );
};
