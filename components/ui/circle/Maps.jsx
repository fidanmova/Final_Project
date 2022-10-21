import { useState } from "react";
import Map from "react-map-gl";

const Maps = ({ location, w, h }) => {
   
        const [viewport, setViewport] = useState({
            latitude: 52.4859,
            longitude: 13.4426,
            zoom: 12,
        });
    

    return (
        <div className="w-full h-full flex justify-center items-center rounded-xl border border-red-500 xl:border-none">
            <Map
                initialViewState={{
                    latitude: viewport.latitude,
                    longitude: viewport.longitude,
                    zoom: 12,
                }}
                style={{ width: w, height: h }}
                mapStyle="mapbox://styles/incptd/cl9iciho8003v15nwppn42k0w"
                mapboxAccessToken="pk.eyJ1IjoiaW5jcHRkIiwiYSI6ImNsOWZuOGtyZTA4Znczb2syaW1rYjlva20ifQ.i498IcTJnARrFJ8EcRoWFQ"
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
            />
        </div>
    );
};
export default Maps;
