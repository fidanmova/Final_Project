import React from "react";
import { useCurrentUser } from "../../../utils/user/hooks";
import Board from "./Board";
import LeftSide from "./LeftSide";
import Messages from "./Message";

const DashBoard = () => {
  const { data, error } = useCurrentUser();

  const loading = !data && !error;
  // console.log('loading', loading)

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center text-6xl uppercase space-y-4 lg:space-y-0 lg:space-x-4 lg:m-4">
      {loading && (
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4  rounded-full text-purple-500"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      {!loading && (
        <>
          <LeftSide data={data} />
          <Board data={data} />

          <Messages data={data} />
        </>
      )}
    </div>
  );
};

export default DashBoard;
