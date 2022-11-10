import { MainMap } from "./Maps";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/router";
import { ImPacman } from "react-icons/im";
import languagesList from "../../../utils/list/languagesList";

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

    const [myCircle, setMyCircle] = useState(null);
    console.log('Circle', myCircle)

    const handleSingle = (user) => {
        setSingleUser(user);
    };

    const toggleVisible = () => {
        setVisible(!visible);
    };

    const handleMyCircle = () => {
        if (data.user.circle.length !== 0) {
            data.user.circle.map((id) => {
                const myC = allUsers.filter((user) => user._id === id);
               console.log("MYCIRCLE",myC)
            });
        } else {
            setMyCircle("No One In Tour Circle");
        }
    };
    useEffect(() => {
        if (!data) {
            router.push("/");
        }
    }, [data, router]);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/circle/circle`)
            .then((res) => res.json())
            .then(
                (results) => {
                    //console.log("CIRCLE RESULTS", results);
                    if (
                        byLanguage === "" ||
                        byLanguage === "Search by language"
                    ) {
                        setAllUsers(results);
                        setLoading(false);
                    } else {
                        const filteredResults = results.filter(
                            (user) => user.language === byLanguage
                        );
                        setAllUsers(filteredResults);
                        setLoading(false);
                    }
                },
                (error) => {
                    console.error(error);
                }
            );
    }, [byLanguage]);

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

                        <div className="w-full h-[65vh] flex flex-wrap lg:flex-nowrap 2xl:flex-col p-2 my-4 2xl:space-y-2 overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-[#ff2e2e]/50">
                            {allUsers.length === 0 && (
                                <p className="uppercase">
                                    no users for this language
                                </p>
                            )}
                            {allUsers.length !== 0 &&
                                allUsers.map((user, k) => (
                                    <div
                                        key={k}
                                        className="flex flex-col 2xl:flex-row  2xl:space-y-0 2xl:justify-between p-2 rounded hover:border-2 hover:border-green-500 hover:bg-black hover:scale-105 "
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
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="w-full h-24 pl-4">
                            <div>
                                Your Circle :{" "}
                                <label
                                    onClick={handleMyCircle}
                                    className="btn"
                                    htmlFor="circle-modal"
                                >
                                    {data.user.circle.length}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2 w-full lg:w-4/5 h-full flex flex-col justify-center items-center lg:px-8  ">
                        <MainMap
                            users={allUsers}
                            location={data?.user?.location}
                            singleUser={singleUser}
                            setSingleUser={setSingleUser}
                            visible={visible}
                            setVisible={setVisible}
                            toggleVisible={toggleVisible}
                            w="100%"
                            h="80vh"
                        />
                    </div>
                    <input
                        type="checkbox"
                        id="circle-modal"
                        className="modal-toggle"
                    />
                    <div className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg uppercase text-center bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500">
                                HI{" "}
                                <span className="pl-2 ">
                                    {data.user.username}
                                </span>
                            </h3>
                            <div className="py-4">
                                {myCircle !== null &&
                                    typeof myCircle === "string" && (
                                        <p>{myCircle}</p>
                                    )}
                                {myCircle !== null &&
                                    typeof myCircle !== "string" &&
                                    myCircle.map((myc, i) => (
                                        <p key={i}>{myc.username}</p>
                                    ))}
                            </div>
                            <div className="modal-action">
                                <label htmlFor="circle-modal" className="btn">
                                    <ImPacman className="text-yellow-500 text-lg" />
                                </label>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Circle;
