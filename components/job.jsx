// import Image from "next/image";

import { useEffect, useState } from "react";

export default function Jobs() {
    const [searchResults, setSearchResults] = useState([]);
    console.log("search", searchResults[0]?.jobs_results);
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
                },
                (error) => {
                    setError(error);
                }
            );
    }, []);
    return (
        <div className="m-4 ">
            <h1>JOBS </h1>
            <hr />

            {searchResults[0]?.jobs_results &&
                searchResults[0].jobs_results.map((el, i) => (
                    <div key={i} className="bg-cyan-500 w-full h-full">
                        <h2>
                            {el.id}: {el.title}
                        </h2>
                        <h4>Company: {el.company_name}</h4>
                        <p>Via: {el.via}</p>
                        <p>Date: {el.date}</p>
                        <hr />
                    </div>
                ))}
        </div>
    );
}
