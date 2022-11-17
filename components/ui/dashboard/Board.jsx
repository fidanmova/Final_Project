import { DashCard } from "../Card";

const Board = () => {
    return (
        <div className="w-11/12 lg:w-[65vw] lg:h-[80vh] flex flex-col justify-center items-center  bg-black/50 rounded-xl  shadow-green-500 shadow-md">
            <div className="w-full flex flex-wrap justify-center">
                <DashCard
                    text="Discover, Join or Create a Circle of Developers"
                    title="circle"
                    style="text-red-500 shadow-red-500 text-center p-2 hover:scale-95 transition duration-200 ease-in-out"
                />
                <DashCard
                    text="Don't Miss Out !  Check Events Near You"
                    title="events"
                    style="text-blue-500 shadow-blue-500 text-center p-2 hover:scale-95 transition duration-200 ease-in-out"
                />
                <DashCard
                    text="Chat with Friends & Circle"
                    title="chats"
                    style="text-purple-500 shadow-purple-500 text-center p-2 hover:scale-95 transition duration-200 ease-in-out"
                />
                <DashCard
                    text="Looking for a Job ?  Search latest Listings"
                    title="job"
                    style="text-pink-500 shadow-pink-500 text-center p-2 hover:scale-95 transition duration-200 ease-in-out"
                />
                <DashCard
                    text="Code with Friends"
                    title="code"
                    style="text-[#faff00] shadow-[#faff00]  w-full mt-2 hover:scale-95 transition duration-200 ease-in-out"
                />
            </div>
        </div>
    );
};
export default Board;
