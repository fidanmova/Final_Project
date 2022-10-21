import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Maps from "./Maps";
import { useCurrentUser } from "../../../utils/user/hooks";

const Circle = () => {
    const { data, error } = useCurrentUser();
    console.log('data', data)
    const [test, setTest] = useState();

    return (
        <div className="flex flex-col justify-center items-center bg-black/50">
            {data.user.location && (
                <>
                    <div className="w-full h-full flex justify-center items-center p-8">
                        <Maps location={data.user.location} w={1000} h={600} />
                    </div>
                    {/* <p>{data.user.location[0]}</p> - <p>{data.user.location[1]}</p> */}
                </>
            )}
        </div>
    );
};

export default Circle;
