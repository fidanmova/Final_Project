import Maps from "./Maps";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";

const Circle = () => {
    //const router = useRouter();
    const { data, error } = useCurrentUser();
    if (data) {
        console.log("CIRCLE USER DATA:", data);
    }
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    console.log("allUsers", allUsers);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/circle/circle`)
            .then((res) => res.json())
            .then(
                (results) => {
                    console.log("CIRCLE RESULTS", results);
                    setAllUsers(results);
                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                }
            );
    }, []);

    return (
        <div className="w-full h-full flex justify-center items-center bg-red-500/10 p-2">
            {data?.user?.location && (
                <>
                    <div className="flex flex-col items-center w-1/5 h-full border border-purple-500/50 bg-black/50">
                        <h2 className="uppercase font-bold text-center pt-4">
                            Devs in this area
                            {loading && <p>LOADING...</p>}
                        </h2>
                        <div className="w-11/12 flex flex-col justify-center pt-16 space-y-2">
                            {allUsers &&
                                allUsers.map((user, k) => (
                                    <div
                                        key={k}
                                        className="flex flex-col lg:flex-row justify-between"
                                    >
                                        <p className="w-1/3 font-bold uppercase">
                                            {user.username}
                                        </p>
                                        {user.language ==
                                        "JavaScript (React.js and Node.js)" ? (
                                            <p>Javascript</p>
                                        ) : (
                                            <p>{user.language}</p>
                                        )}
                                        <div>
                                            {user.since && (
                                                <p className="italic font-light text-sm capitalize">
                                                    {moment(user.since).format(
                                                        "L"
                                                    )}
                                                </p>
                                            )}
                                            {user.location && (
                                                <p className="text-[8px] text-green-500">
                                                    {user.location[0]}-
                                                    {user.location[1]}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="w-4/5 h-full flex justify-center items-center px-8">
                        <Maps users={allUsers}
                            location={data?.user?.location}
                            w="100%"
                            h="60vh"
                        />
                    </div>
                    {/* <p>{data.user.location[0]}</p> - <p>{data.user.location[1]}</p> */}
                </>
            )}
        </div>
    );
};

export default Circle;
