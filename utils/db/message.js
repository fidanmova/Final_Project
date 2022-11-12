import { ObjectId } from "mongodb";

export async function findMessages(db, chatId) {
  const messages = await db
    .collection("messages")
    .aggregate([
      {
        $match: {
          chatId: new ObjectId(chatId),
        },
      },
      { $sort: { createdAt: -1 } },
    ])
    .toArray();
  return messages;
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
