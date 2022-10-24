import Maps from "./Maps";
import { useCurrentUser } from "../../../utils/user/hooks";
import { useEffect, useState } from "react";
// import { getAllUsers } from "../../../utils/db/allUsers";
// import  {dbConnect } from "../../../utils/mongo/mongodb";


const Circle = () => {
    const { data, error } = useCurrentUser();
    if (data) {
        console.log("CIRCLE USER DATA:", data);
    }
    const [loading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState(null);
    console.log("users", allUsers);

    useEffect(() => {
        setLoading(true);
        fetch(`/api/circle/circle`)
            .then((res) => res.json())
            .then(
                (results) => {
                    setAllUsers(results);
                    setLoading(false);

                    console.log("CIRCLE RESULTS", results);
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
                    <div className="w-1/5 h-full border border-purple-500/50 bg-black/50">
                        <h2 className="uppercase font-bold text-center pt-4">
                            Devs in this area
                {loading && <p>LOADING...</p>}
                        </h2>
                    </div>
                    <div className="w-4/5 h-full flex justify-center items-center px-8">
                        <Maps
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

// export async function getServerSideProps() {
//     const db = await dbConnect();
//     const users = await getAllUsers(db);
//     console.log("XXXgetserverside users", users);

//     // const allEvents = await events.toArray();
//     // let eventsAsString = JSON.parse(JSON.stringify(allEvents));

//     return {
//         props: { users },
//     };
// }
