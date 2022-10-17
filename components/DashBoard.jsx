import React from "react";
import { useCurrentUser } from "../utils/user/hooks";

const DashBoard = () => {
    const { data, error } = useCurrentUser();
    console.log("DASHBOARDdata", data, error);
    const loading = !data && !error;

    return (
        <div className="flex flex-col justify-center items-center text-6xl uppercase">
            <h1>DashBoard</h1>
            {loading && <p>LOADING</p>}
            <h1>{data?.user.username}</h1>
        </div>
    );
};

export default DashBoard;
