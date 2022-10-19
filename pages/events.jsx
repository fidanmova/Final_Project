import React from "react";
import PageTemplate from "../components/ui/PageTemplate";
import { getAllEvents } from "../utils/db/events";
import { dbConnect } from "../utils/mongo/mongodb";
import Image from "next/image";

import { useState } from "react";

const handler = () => {
  renderEvents();
};

const renderEvents = (eventsAsString) => {
  return eventsAsString.map((el, i) => (
    <div key={i}>
      {/* <h2>
        {i + 1} - {el.event_title}
      </h2>
      <p> {el.location}</p>
      <p> When: {el.when}</p>
      <p> Cost: {el.cost}</p>
      <hr />
      <br /> */}
      <div className="card m-4 w-64 h-96 bg-slate-700 shadow-xl  hover:scale-95 transition duration-200 ease-in-out ">
        <figure className="px-2 pt-4">
          <a href={el.event_link} rel="noreferrer" target="_blank">
            <Image
              src={el.image}
              width="250px"
              height="160px"
              // layout="fill"
              alt="image"
              className="rounded-xl hover:scale-95 transition duration-200 ease-in-out"
            />
          </a>
        </figure>
        <div className="card-body items-center text-center px-4">
          <p className="card-title text-xs ">{el.event_title}</p>
          <p className="text-xs">When : {el.when}</p>
          <p className="text-xs">Where : {el.location}</p>
          <p className="text-xs">Cost : {el.cost}</p>
          <div className="card-actions">
            <a href={el.event_link} rel="noreferrer" target="_blank">
              <button className="btn btn-sm bg-cyan-700 text-xs">Visit</button>
            </a>
            <button className="btn btn-sm bg-sky-700 text-xs">Save</button>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default function Events({ eventsAsString }) {
  const [showEvents, setShowEvents] = useState(false);

  return (
    <PageTemplate content="Dev-Shed Community" title="DevShed-Events">
      <div className="m-4 scrollbar-thin scrollbar-thumb-slate-700 ">
        <h1>Events</h1>
        <br />
        <div
          className="btn btn-base "
          onClick={() => setShowEvents(!showEvents)}
        >
          {showEvents ? "Hide" : "Show"}
        </div>

        <div className="flex flex-wrap">
          {showEvents ? renderEvents(eventsAsString) : null}
        </div>
      </div>
    </PageTemplate>
  );
}

export async function getServerSideProps() {
  const db = await dbConnect();
  const events = await getAllEvents(db);

  const allEvents = await events.toArray();
  let eventsAsString = JSON.parse(JSON.stringify(allEvents));

  return {
    props: { eventsAsString },
  };
}

// ###########################################################
// export async function getServerSideProps() {
//   let res = await fetch("https://jsonplaceholder.typicode.com/users", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   let allUsers = await res.json();
//   console.log(allUsers);

//   return {
//     props: { allUsers },
//   };
// }

// ###############################################################

// export async function handler(NextApiRequest, NextApiResponse) {
//   let { db } = await dbConnect();
//   const events = await db.collection("berlin_oct_2022").find();
//   res.status(200).json({ events });
// }
// ################################################################
