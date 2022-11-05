import React from "react";
import { useCurrentUser } from "../../../utils/user/hooks";
import Board from "./Board";
import LeftSide from "./LeftSide";
import Messages from "./Message";

const DashBoard = () => {
  const { data, error } = useCurrentUser();
  //console.log("DASHBOARDdata", data, error);
  const loading = !data && !error;
  // console.log('loading', loading)

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center text-6xl uppercase space-y-4 lg:space-y-0 lg:space-x-4 lg:m-4">
      <LeftSide data={data} />
      <Board data={data} />
      {/* <h1>DashBoard</h1>
            {loading && <p>LOADING</p>}
            <h1>{data?.user.username}</h1> */}
      <Messages data={data} />
    </div>
  );
};

export default DashBoard;
