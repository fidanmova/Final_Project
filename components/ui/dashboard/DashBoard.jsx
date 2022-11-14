import React from "react";
import { useCurrentUser } from "../../../utils/user/hooks";
import Board from "./Board";
import LeftSide from "./LeftSide";
import Messages from "./Message";

const DashBoard = () => {
  const { data, error } = useCurrentUser();

  const loading = !data && !error;

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center text-6xl uppercase space-y-4 lg:space-y-0 lg:space-x-4">
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
