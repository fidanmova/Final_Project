import { useEffect, useState } from "react";
import Map from "react-map-gl";

const Maps = ({ location, w, h, users }) => {
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
export default Maps;
