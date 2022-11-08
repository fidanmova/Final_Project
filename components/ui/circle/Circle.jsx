import { MainMap } from "./Maps";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";

const Circle = () => {
    const router = useRouter();
    const { data } = useCurrentUser();

    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);

    const [singleUser, setSingleUser] = useState(null);
    console.log("singleUser", singleUser);
    const [visible, setVisible] = useState(false);
    console.log("visible", visible);

    const toggleVisible = () => {
        setVisible(!visible);
    };

    //console.log("allUsers", allUsers);
    useEffect(() => {
        if (!data) {
            router.push("/");
        }
    }, [data, router]);

    const handleSingle = (user) => {
        setSingleUser(user);
    };

    useEffect(() => {
        setLoading(true);
        fetch(`/api/circle/circle`)
            .then((res) => res.json())
            .then(
                (results) => {
                    //console.log("CIRCLE RESULTS", results);
                    setAllUsers(results);
                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                }
            );
    }, []);

    // const [location, setLocation] = useState(null);
    // console.log('location', location)
    

    // useEffect(() => {
    //     setLoading(true);
    //     fetch(
    //         `https://api.mapbox.com/geocoding/v5/mapbox.places/berlin.json?proximity=ip&types=locality&access_token=${process.env.mapbox_key}`
    //     )
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setLocation(data);
    //             setLoading(false);
    //         });
    // }, []);

    return (
        <div className="w-full h-full flex flex-col lg:flex-row lg:justify-center lg:items-center bg-red-500/10 lg:px-2">
            {data?.user?.location && (
                <>
                    <div className="order-2 lg:order-1 flex flex-col items-center w-full lg:w-1/5 h-full lg:h-[90vh] border border-red-500/50 bg-black/50 rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h2 className="uppercase font-bold text-center pt-4">
                            Devs in this area
                            {loading && <p>LOADING...</p>}
                        </h2>
                        <div className="w-11/12 flex flex-wrap lg:flex-nowrap lg:flex-col lg:justify-center pt-8 lg:pt-16 lg:space-y-2 ">
                            {allUsers &&
                                allUsers.map((user, k) => (
                                    <div
                                        key={k}
                                        className="flex flex-col lg:flex-row justify-between p-2 rounded hover:border-2 hover:border-green-500 hover:bg-black hover:scale-105 "
                                        onClick={() => handleSingle(user)}
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
                                                    {moment(
                                                        user.since,
                                                        "YYYYMMDD"
                                                    ).fromNow()}
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
                    <div className="order-1 lg:order-2 w-full lg:w-4/5 h-full flex flex-col justify-center items-center lg:px-8  ">
                        {visible && (
                            <div classNam="fixed z-50 w-[800px] bg-black h-[90vh]">
                                lol
                            </div>
                        )}
                        <MainMap
                            users={allUsers}
                            location={data?.user?.location}
                            singleUser={singleUser}
                            setSingleUser={setSingleUser}
                            visible={visible}
                            toggleVisible={toggleVisible}
                            w="100%"
                            h="80vh"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default Circle;
