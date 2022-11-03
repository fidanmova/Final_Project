import { ObjectId } from "mongodb";
import { dbProjectionUsers } from "./user";

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
