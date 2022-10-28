import { ObjectId } from "mongodb";
import { dbProjectionUsers } from "./user";

export async function findAllChatGroups(db) {
  return db.collection("chatGroups").find().toArray();
}

export async function findChatGroup(db, by) {
  return db
    .collection("chatGroups")
    .aggregate([
      {
        $match: {
          ...(by && { creatorId: new ObjectId(by) }),
          ...(before && { createdAt: { $lt: before } }),
        },
      },
      { $sort: { _id: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "creatorId",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      { $project: dbProjectionUsers("creator.") },
    ])
    .toArray();
}

export async function insertChatGroup(db, { users, creatorId }) {
  const chatGroup = {
    users,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection("chatGroups").insertOne(chatGroup);
  chatGroup._id = insertedId;
  return chatGroup;
}

// export async function findChatById(db, id) {
//   const chatGroups = await db
//     .collection("chatGroups")
//     .aggregate([
//       { $match: { _id: new ObjectId(id) } },
//       { $limit: 1 },
//       {
//         $lookup: {
//           from: "users",
//           localField: "creatorId",
//           foreignField: "_id",
//           as: "creator",
//         },
//       },
//       { $unwind: "$creator" },
//       { $project: dbProjectionUsers("creator.") },
//     ])
//     .toArray();
//   if (!chats[0]) return null;
//   return chats[0];
// }
