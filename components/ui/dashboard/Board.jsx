import DashCard from "../Card";
import Link from "next/link";

const Board = ({ data }) => {
  return (
    <div className="w-11/12 lg:w-[65vw] h-[80vh] flex flex-col justify-center items-center  bg-black/50 rounded-xl  shadow-green-500 shadow-md">
      <h1 className="text-xl mb-2">dashboard</h1>
      <div className="w-full flex flex-wrap justify-center ">
        <DashCard
          text="discover, join or create a circle of developers"
          title="circle"
          style="text-red-500 shadow-red-500 hover:scale-95 transition duration-200 ease-in-out"
        />
        <DashCard
          text="check all events around you"
          title="events"
          style="text-blue-500 shadow-blue-500 hover:scale-95 transition duration-200 ease-in-out"
        />
        <DashCard
          text="chat with your friend and with your circle"
          title="chat"
          style="text-purple-500 shadow-purple-500 hover:scale-95 transition duration-200 ease-in-out"
        />
        <DashCard
          text="looking for a job? check last listenings"
          title="job"
          style="text-pink-500 shadow-pink-500 hover:scale-95 transition duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};

export default Board;
