import { ObjectId } from "mongodb";
import { dbProjectionUsers, dbProjectionUsersSmall } from "./user";

//! TRIAL TO ADD MEMBERS TO MESSAGES ARRAY
export async function trialAddMembersToMessages(db) {
  // console.log("ID from messages trial", id);
  const members = await db
    .collection("messages")
    .aggregate([
      // {
      //   $match: {
      //     chatId: new ObjectId(id.toString()),
      //   },
      // },
      {
        $lookup: {
          from: "chats",
          localField: "users",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      // { $project: dbProjectionUsers("members.") },
      { $project: dbProjectionUsersSmall("members.") },
    ])
    .toArray();
  console.log("MEMBERS ===> ", members);
  if (!members) return null;
  return members;
}

export async function findMessages(db, chatId, before, limit = 10) {
  return db
    .collection("messages")
    .aggregate([
      {
        $match: {
          chatId: new ObjectId(chatId),
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

export async function insertMessage(db, chatId, { content, creatorId }) {
  const message = {
    content,
    chatId: new ObjectId(chatId),
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection("messages").insertOne(message);
  message._id = insertedId;
  return message;
}
