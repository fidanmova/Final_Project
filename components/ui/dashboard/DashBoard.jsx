import React from "react";
import { useCurrentUser } from "../../../utils/user/hooks";
import Board from "./Board";
import LeftSide from './LeftSide';
import Messages from "./Message";

const DashBoard = () => {
    const { data, error } = useCurrentUser();
    console.log("DASHBOARDdata", data, error);
    const loading = !data && !error;
    console.log('loading', loading)

    return (
        <div className="w-full h-full flex items-center text-6xl uppercase space-x-4 m-4">
            
            <LeftSide data={data}/>
           <Board data={data}/>
            {/* <h1>DashBoard</h1>
            {loading && <p>LOADING</p>}
            <h1>{data?.user.username}</h1> */}
             <Messages data={data}/>
        </div>
    );
};

export default DashBoard;
