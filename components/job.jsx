import { useState, useEffect } from "react";
// import { dbConnect } from "../utils/mongo/mongodb";
import { useCurrentUser } from "../utils/user/hooks";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetcher";

import { PacmanLoader } from "react-spinners";

export default function Jobs() {
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const { data: { user } = {}, mutate } = useCurrentUser();
    const [searchTerms, setSearchTerms] = useState({
        job: "React Developer",
        location: "Berlin",
    });
    const [error, setError] = useState(null);
    console.log("error", error);

    //  ## Save Job Function  ##
    const saveJob = async (job) => {
        try {
            const response = await fetcher(
                `/api/users/${user?.username}/updateJobs`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user._id,
                        jobs: job,
                    }),
                }
            );
            mutate({ user: response }, false);
            toast("Job Saved");
        } catch (error) {
            toast.error(error);
        }
    };
    // ########################

    useEffect(() => {
        fetch(`/api/job/search/${searchTerms.job}/${searchTerms.location}`)
            .then((res) => res.json())
            .then(
                (results) => {
                    setSearchResults(results);
                    setLoading(false);
                    setError(null);
                    // console.log("ResultsjobSearchHandler", results[0].jobs_results);
                },
                (error) => {
                    setError(error);
                }
            );
    }, [searchTerms]);

    function jobSearchHandler(e) {
        e.preventDefault();

        fetch(`/api/job/search/${searchTerms.job}/${searchTerms.location}`)
            .then((res) => res.json())
            .then(
                (results) => {
                    setSearchResults(results);
                    setLoading(false);
                    setError(null);
                    // console.log("ResultsjobSearchHandler", results[0].jobs_results);
                },
                (error) => {
                    setError(error);
                }
            );
    }

    return (
        <div className="h-[85vh] w-full flex flex-col items-center">
            <h1 className="p-4 text-2xl capitalize text-left">
                <span className="uppercase font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-red-600 via-purple-500 to-yellow-500 px-4">
                    jobs
                </span>{" "}
                search top 10 results
            </h1>
            <div className="divider "></div>
            
                <form onSubmit={jobSearchHandler}className="w-11/12 flex items-center">
                    <input
                        type="text"
                        placeholder="Position"
                        name="job"
                        id="job"
                        className="input input-bordered  bg-slate-800 w-1/3 lg:w-[18vw] opacity-80 hover:scale-95 transition duration-200 ease-in-out"
                        onChange={(e) =>
                            setSearchTerms({
                                ...searchTerms,
                                job: e.target.value,
                            })
                        }
                    />
                    <input
                        type="text"
                        placeholder="City or Country"
                        name="location"
                        id="location"
                        className="input input-bordered w-1/3 lg:w-[18vw] bg-slate-800 m-2 opacity-80 hover:scale-95 transition duration-200 ease-in-out"
                        onChange={(e) =>
                            setSearchTerms({
                                ...searchTerms,
                                location: e.target.value,
                            })
                        }
                    />
                    <button className="btn  bg-cyan-700" type="submit">
                        Search
                    </button>
                </form>
            
            <div className="w-full ">
                <PacmanLoader
                    color="#c536d6"
                    loading={isLoading}
                    size={40}
                    speedMultiplier={0}
                />
                <div className="w-full lg:h-[65vh] flex flex-col items-center lg:items-start lg:flex-row lg:flex-wrap justify-center overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-pink-500/50">
                    {searchResults[0]?.jobs_results &&
                        searchResults[0]?.jobs_results.map((el, i) => (
                            <div
                                key={i}
                                className=" rounded-xl m-1 w-11/12 lg:w-[18vw] lg:h-[42vh] bg-slate-700 shadow-xl opacity-90 hover:border-2"
                            >
                                <div className="flex flex-col items-center justify-center text-center p-2 w-full ">
                                    <h2 className="card-title h-[10vh]">{el.title}</h2>
                                    <div className="h-[6vh] py-2">
                                    <p className="text-xs w-full">
                                        {el.company_name} | {el.location}
                                    </p>
                                    <p className="text-xs">
                                        {el.detected_extensions.posted_at} |{" "}
                                        {el.detected_extensions.schedule_type} |{" "}
                                        {el.via}
                                    </p></div>
                                    <p className="p-6 text-xs overflow-wrap text-justify h-[18vh] overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-green-300/50">
                                        {el.description}
                                    </p>
                                    <div className="card-actions w-full lg:w-1/2 py-4 justify-end">
                                        <button
                                            className="btn lg:btn-sm w-full bg-pink-700"
                                            onClick={() =>
                                                saveJob(
                                                    el.title +
                                                        el.location +
                                                        ", " +
                                                        el.via
                                                )
                                            }
                                        >
                                            <p className="font-extrabold tracking-widest ">
                                                Save
                                            </p>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className="divider"></div>
        </div>
    );
}
