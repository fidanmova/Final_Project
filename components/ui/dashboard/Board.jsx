import { DashCard } from "../Card";

const Board = () => {
  return (
    <div className="w-11/12 lg:w-[65vw] h-[80vh] flex flex-col justify-center items-center  bg-black/50 rounded-xl  shadow-green-500 shadow-md">
      <div className="w-full flex flex-wrap justify-center">
        <DashCard
          text="discover, join or create a circle of developers"
          title="circle"
          style="text-red-500 shadow-red-500 text-center p-2 hover:scale-95 transition duration-200 ease-in-out"
        />
        <DashCard
          text="check all events around you"
          title="events"
          style="text-blue-500 shadow-blue-500 text-center p-2 hover:scale-95 transition duration-200 ease-in-out"
        />
        <DashCard
          text="chat with your friend and with your circle"
          title="chats"
          style="text-purple-500 shadow-purple-500 text-center p-2 hover:scale-95 transition duration-200 ease-in-out"
        />
        <DashCard
          text="looking for a job? check last listenings"
          title="job"
          style="text-pink-500 shadow-pink-500 text-center p-2 hover:scale-95 transition duration-200 ease-in-out"
        />
        <DashCard
          text="Discuss your code with your friend"
          title="code"
          style="text-yellow-500 shadow-yellow-500 w-full h-auto mt-4 hover:scale-95 transition duration-200 ease-in-out"
        />
      </div>
    </div>
  );
};
export default Board;
