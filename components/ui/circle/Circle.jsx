import { MainMap } from "./Maps";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import languagesList from "../../../utils/list/languagesList";
import { Button } from "react-daisyui";
import { FaPlus, FaMinus } from "react-icons/fa";
import { toast } from "react-toastify";
import { fetcher } from "../../../utils/fetcher";
import { mutate } from "swr";

const Circle = () => {
    const router = useRouter();
    const { data } = useCurrentUser();

    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    //console.log("allUsers", allUsers);

    const [byLanguage, setByLanguage] = useState("");
    //console.log("Language", byLanguage);

    const [singleUser, setSingleUser] = useState(null);
    //console.log("singleUser", singleUser);
    const [visible, setVisible] = useState(false);
    //console.log("visible", visible);

    const [circle, setCircle] = useState([]);
    //console.log("circle", circle);

    const handleSingle = (user) => {
        setSingleUser(user);
    };

    useEffect(() => {
        if (!data) {
            router.push("/");
        }
    }, [data, router]);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/circle/circle`) // get allUser
            .then((res) => res.json())
            .then(
                (results) => {
                    //ALLUSERS IN DB
                    //console.log("CIRCLE RESULTS", results);
                    if (
                        byLanguage === "" ||
                        byLanguage === "Search by language"
                    ) {
                        setAllUsers(results);
                        setLoading(false);
                    }
                    if (
                        byLanguage !== "circle" &&
                        byLanguage !== "" &&
                        byLanguage !== "Search by language"
                    ) {
                        const filteredResults = results.filter(
                            (user) => user.language === byLanguage
                        );
                        //console.log("FILTRED", filteredResults);
                        setAllUsers(filteredResults);
                        setLoading(false);
                    }
                    if (byLanguage === "circle") {
                        //if we choose to show our circle friend
                        const myc = []; //create an empty array for store the obj of each user
                        data.user.circle.map((id) => {
                            //console.log("ID ==>", id);
                            const filter = results.filter(
                                (user) => user._id === id
                            );
                            myc.push(filter[0]);
                            //console.log("FILTER==>", filter[0]);
                        });
                        //setCircle(myc);//myCircle friend
                        setAllUsers(myc);
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error(error);
                }
            );
    }, [byLanguage, circle, data]);

    const handleMyCircle = () => {
        setByLanguage("circle");
    };
    useEffect(() => {
        setLoading(true);
        fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/berlin.json?proximity=ip&types=locality&access_token=${process.env.mapbox_key}`
        )
            .then((res) => res.json())
            .then((data) => {
                // setLocation(data);
                setLoading(false);
            });
    }, []);

    const addToCircle = async () => {
        try {
            if (singleUser._id && data.user._id) {
                await fetcher(`/api/users/${data.user.username}/updateCircle`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: data.user._id,
                        circle: singleUser._id,
                    }),
                });

                console.log(`/api/users/${data.user.username}/updateCircle`);

                toast.success(`${singleUser.username} is now in your circle`);
            } else {
                toast("PORCAMADONNA");
            }
        } catch (error) {
            console.error(error);
            toast.error("Ops...something went wrong!");
        }
    };

    const deleteFromCircle = async () => {
        try {
            if (singleUser._id && data.user._id) {
                await fetcher(`/api/users/${data.user.username}/updateCircle`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        id: data.user._id,
                        circle: singleUser._id,
                    }),
                });

                console.log(`/api/users/${data.user.username}/updateCircle`);

                toast.success(`${singleUser.username} is now in your circle`);
            } else {
                toast("PORCAMADONNA");
            }
        } catch (error) {
            console.error(error);
            toast.error("Ops...something went wrong!");
        }
    };

    return (
        <div className="w-full h-full flex flex-col lg:flex-row lg:justify-center lg:items-center bg-red-500/10 lg:px-2">
            {data?.user?.location && (
                <>
                    <div className="order-2 lg:order-1 flex flex-col items-center w-full lg:w-1/5 h-full lg:h-[90vh] border border-red-500/50 bg-black/50 rounded-2xl overflow-y-scroll scrollbar-hide">
                        <h2 className="uppercase font-bold text-center pt-4">
                            Devs in this area
                            {loading && <p>LOADING...</p>}
                        </h2>
                        <div className="w-full pt-4">
                            <div className="flex w-full component-preview items-center justify-center gap-2 font-sans">
                                <select
                                    value={byLanguage}
                                    onChange={(e) =>
                                        setByLanguage(e.target.value)
                                    }
                                    className="select select-bordered w-full bg-transparent focus:border-4 focus:border-myPurple text-blue-600"
                                >
                                    <option>Search by language</option>
                                    {languagesList &&
                                        languagesList.map((language, i) => (
                                            <option key={i} value={language}>
                                                {language}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className="w-full 2xl:h-[65vh] flex flex-wrap 2xl:flex-nowrap 2xl:flex-col p-2 my-4 2xl:space-y-2 overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-[#ff2e2e]/50">
                            {allUsers.length === 0 &&
                                byLanguage !== "circle" && (
                                    <p className="uppercase">
                                        no users for this language
                                    </p>
                                )}
                            {byLanguage !== "circle" &&
                                allUsers.length !== 0 &&
                                allUsers.map((user, k) => (
                                    <div
                                        key={k}
                                        className="flex flex-col w-1/2 2xl:w-auto 2xl:flex-row 2xl:space-y-0 2xl:justify-between items-center p-2 lg:rounded hover:border-2 hover:border-green-500 hover:bg-black hover:scale-105 "
                                        onClick={() => handleSingle(user)}
                                    >
                                        <div>
                                            <p className="w-1/3 font-bold uppercase">
                                                {user.username}
                                            </p>
                                            {user.language ==
                                            "JavaScript (React.js and Node.js)" ? (
                                                <p>Javascript</p>
                                            ) : (
                                                <p>{user.language}</p>
                                            )}
                                        </div>
                                        {data?.user?.circle?.includes(
                                            user._id
                                        ) ? (
                                            <Button
                                                className="text-green-500 w-[3rem]"
                                                onClick={deleteFromCircle}
                                            >
                                                <FaMinus />
                                            </Button>
                                        ) : (
                                            <Button
                                                className="text-green-500 w-[3rem]"
                                                onClick={addToCircle}
                                            >
                                                <FaPlus />
                                            </Button>
                                        )}
                                    </div>
                                ))}

                            {byLanguage === "circle" &&
                                allUsers?.length !== 0 &&
                                allUsers?.map((circle, k) => (
                                    <div
                                        key={k}
                                        className="flex flex-col 2xl:flex-row  2xl:space-y-0 2xl:justify-between p-2 lg:rounded hover:border-2 hover:border-green-500 hover:bg-black hover:scale-105 "
                                        onClick={() => handleSingle(circle)}
                                    >
                                        <p className="w-1/3 font-bold uppercase">
                                            {circle.username}
                                        </p>
                                        {circle.language ==
                                        "JavaScript (React.js and Node.js)" ? (
                                            <p>Javascript</p>
                                        ) : (
                                            <p>{circle.language}</p>
                                        )}
                                        <div>
                                            {circle.since && (
                                                <p className="italic font-light text-sm capitalize">
                                                    {moment(
                                                        circle.since,
                                                        "YYYYMMDD"
                                                    ).fromNow()}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="w-full h-24 pl-4">
                            <div>
                                Your Circle :{" "}
                                <label onClick={handleMyCircle} className="btn">
                                    {data.user.circle.length}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 w-full lg:w-4/5 h-full flex flex-col justify-center items-center lg:px-8  ">
                        <MainMap
                            user={data.user}
                            users={allUsers}
                            location={data?.user?.location}
                            singleUser={singleUser}
                            setSingleUser={setSingleUser}
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
