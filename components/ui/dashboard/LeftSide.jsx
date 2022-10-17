import { MdOutlineLocationCity } from "react-icons/md";
const LeftSide = ({ data }) => {
    return (
        <div className="flex flex-col items-center bg-black/50 rounded-lg w-[15vw] h-[80vh]  shadow-red-500 shadow-md text-xs lowercase">
            <h1 className="text-3xl my-6 capitalize">
                Hi {data?.user?.username}
            </h1>
            <div className="w-11/12 h-full flex flex-col justify-between">
                <div className="flex items-center justify-center space-x-2">
                    {" "}
                    <MdOutlineLocationCity className="text-green-500 text-4xl" />
                    <p className="text-xl capitalize">{data?.user?.city}</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p>Your fav coding language is</p>
                    <p> {data?.user?.language}</p>
                </div>
                <div className="flex flex-col items-center justify-center capitalize">
                    <p>Your Circle:</p>
                    <p>{data?.user?.circle}</p> 
                </div>
                <div className="flex flex-col items-center justify-center">
                   
                </div>
            </div>
        </div>
    );
};

export default LeftSide;
