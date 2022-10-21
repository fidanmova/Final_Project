import { useEffect, useState } from "react";

export default function Jobs() {
  const [searchResults, setSearchResults] = useState([]);
  // console.log("search", searchResults[0]?.jobs_results);
  const [isLoading, setLoading] = useState(false);
  console.log("isLoading", isLoading);

  const [error, setError] = useState(null);
  console.log("error", error);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/job/search`)
      .then((res) => res.json())
      .then(
        (results) => {
          setSearchResults(results);
          setLoading(false);
          setError(null);
          console.log("ResultsJobSearch", results[0].jobs_results);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);

  return (
    <div className="m-4 ">
      <h1 className="p-4 text-2xl capitalize">job search top 10 results</h1>
      <hr />
      <div className="Search">
        <input
          type="text"
          placeholder="Position"
          id="job"
          className="input input-bordered m-2 w-full max-w-xs opacity-80"
        />{" "}
        <input
          type="text"
          placeholder="City / Country"
          id="location"
          className="input input-bordered m-2 w-full max-w-xs opacity-80"
        />{" "}
        <button className="btn btn-sm bg-cyan-700">Search</button>
      </div>
      <hr />
      <div className="flex flex-wrap">
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
                    <button className="btn btn-sm bg-sky-700 ">Save</button>
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
