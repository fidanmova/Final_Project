import PageTemplate from "../components/ui/PageTemplate";
import { getAllEvents } from "../utils/db/events";
import { dbConnect } from "../utils/mongo/mongodb";
import { useCurrentUser } from "../utils/user/hooks";
import Image from "next/image";
import { toast } from "react-toastify";
import { fetcher } from "../utils/fetcher";

export default function Events({ eventsAsString }) {
    const { data: { user } = {}, mutate } = useCurrentUser();

    //  ## Save Event Function  ##
    const saveEvent = async (event) => {
        try {
            const response = await fetcher(
                `/api/users/${user.username}/updateEvents`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userId: user._id,
                        events: event,
                    }),
                }
            );
            toast.success("Event saved successfully");
            mutate({ user: response }, false);
        } catch (error) {
            toast.error("ops...something went wrong");
        }
    };

    return (
        <PageTemplate content="Dev-Shed Community" title="DevShed-Events">
            <div className="m-4 h-[85vh] flex flex-col items-center ">
                <div className="p-4 text-2xl capitalize flex flex-col lg:flex-row items-center">
                    <h1 className="uppercase font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-pink-500 px-4">
                        events
                    </h1>
                    <p>I.T. berlin, nov-2022</p>
                </div>
                <div className="divider"></div>
                <div className="lg:h-[71vh] overflow-y-scroll overflow-x-hidden z-0 scrollbar-thin scrollbar-track-[#242424] scrollbar-thumb-[#0037ff]/50">
                    <div className="h-full flex flex-col lg:flex-row lg:flex-wrap lg:items-center lg:justify-center ">
                        {eventsAsString?.map((el, i) => (
                            <div
                                key={i}
                                className="card m-4 w-11/12 lg:w-64 h-96 bg-slate-700/90 shadow-xl opacity-90 hover:scale-95 transition duration-200 ease-in-out "
                            >
                                <figure className="px-2 pt-4">
                                    <a
                                        href={el.event_link}
                                        rel="noreferrer"
                                        target="_blank"
                                    >
                                        <Image
                                            src={el.image}
                                            width="250px"
                                            height="160px"
                                            alt="image"
                                            className="rounded-xl w-[30rem] h-[160px]"
                                        />
                                    </a>
                                </figure>
                                <div className="card-body items-center text-center px-4">
                                    <p className="card-title text-xs ">
                                        {el.event_title}
                                    </p>
                                    <p className="text-xs">{el.when}</p>
                                    <p className="text-xs">{el.location}</p>
                                    <p className="text-xs">{el.cost}</p>
                                    <div className="card-actions">
                                        <a
                                            href={el.event_link}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <button className="btn btn-sm bg-cyan-700 text-xs">
                                                Visit
                                            </button>
                                        </a>
                                        <button
                                            className="btn btn-sm bg-sky-700 text-xs"
                                            onClick={() =>
                                                saveEvent(
                                                    el.event_title +
                                                        ", " +
                                                        el.when
                                                )
                                            }
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="divider"></div>
            </div>
        </PageTemplate>
    );
}

// ## Get JSON Data from DB ####

export async function getServerSideProps() {
    const db = await dbConnect();
    const events = await getAllEvents(db);

    // ## Arrange Data fro Rendering ##
    const allEvents = await events.toArray();
    let eventsAsString = JSON.parse(JSON.stringify(allEvents));

    return {
        props: { eventsAsString },
    };
}
