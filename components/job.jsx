import { useState } from "react";
// import { dbConnect } from "../utils/mongo/mongodb";
import { useCurrentUser } from "../utils/user/hooks";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetcher";

export default function Jobs() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { data: { user } = {}, mutate } = useCurrentUser();
  const [searchTerms, setSearchTerms] = useState({
    job: "",
    location: "",
  });
  const [error, setError] = useState(null);
  console.log("error", error);

  //  ## Save Job Function  ##
  const saveJob = async (job) => {
    toast("Saving Job");
    const response = await fetcher(`/api/users/${user.username}/updateJobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        jobs: job,
      }),
    });
    console.log(response);
  };
  // ########################

  function jobSearchHandler(e) {
    e.preventDefault();

    fetch(`/api/job/search/${searchTerms.job}/${searchTerms.location}`)
      .then((res) => res.json())
      .then(
        (results) => {
          setSearchResults(results);
          setLoading(false);
          setError(null);
          console.log("ResultsjobSearchHandler", results[0].jobs_results);
        },
        (error) => {
          setError(error);
        }
      );
  }

  return (
    <div className="m-4 h-[85vh] ">
      <h1 className="p-4 text-2xl capitalize">job search top 10 results</h1>
      <hr />
      <div className="Search m-2">
        <form onSubmit={jobSearchHandler}>
          <input
            type="text"
            placeholder="Position"
            name="job"
            id="job"
            className="input input-bordered  bg-slate-800 m-2 w-full max-w-xs opacity-80 hover:scale-95 transition duration-200 ease-in-out"
            onChange={(e) =>
              setSearchTerms({
                ...searchTerms,
                job: e.target.value,
              })
            }
          />{" "}
          <input
            type="text"
            placeholder="City or Country"
            name="location"
            id="location"
            className="input input-bordered  bg-slate-800 m-2 w-full max-w-xs opacity-80 hover:scale-95 transition duration-200 ease-in-out"
            onChange={(e) =>
              setSearchTerms({
                ...searchTerms,
                location: e.target.value,
              })
            }
          />{" "}
          <button className="btn btn-sm  bg-cyan-700" type="submit">
            Search
          </button>
        </form>
      </div>
      <hr />
      <div className="flex flex-wrap justify-center">
        {searchResults[0]?.jobs_results &&
          searchResults[0].jobs_results.map((el, i) => (
            <div key={i} className=" ">
              <div className="card m-4 w-80 h-96 bg-slate-700 shadow-xl opacity-90 hover:scale-95 transition duration-200 ease-in-out ">
                <div className="card-body items-center text-center px-2">
                  <h2 className="card-title">{el.title}</h2>
                  <p className="text-xs">
                    {el.company_name} | {el.location}
                  </p>
                  <p className="text-xs">
                    {el.detected_extensions.posted_at} |{" "}
                    {el.detected_extensions.schedule_type} | <p>{el.via}</p>
                  </p>
                  <p className="px-6 text-xs overflow-wrap ">
                    {el.description.slice(0, 300)}
                  </p>
                  <div className="card-actions justify-end">
                    <button
                      className="btn btn-sm bg-sky-700 "
                      onClick={() =>
                        saveJob(el.title + el.location + ", " + el.via)
                      }
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <hr />
    </div>
  );
}
