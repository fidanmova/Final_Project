import { ObjectId } from "mongodb";
import { dbProjectionChat } from "./user";

export async function findEditorMessages(db, limit = 10) {
  const allEditorMessages = await db
    .collection("editorChats")
    .aggregate([
      {
        $match: {},
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
      { $project: dbProjectionChat("creator.") },
    ])
    .toArray();
  if (allEditorMessages.length === 0) return null;
  return allEditorMessages;
}

export async function insertEditorMessage(db, { content, creatorId }) {
  const message = {
    content,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection("editorChats").insertOne(message);
  message._id = insertedId;
  return message;
}
