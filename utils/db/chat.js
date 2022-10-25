import { ObjectId } from "mongodb";
import { dbProjectionUsers } from "./user";

export async function findPChatById(db, id) {
  const chats = await db
    .collection("chats")
    .aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $limit: 1 },
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
  if (!chats[0]) return null;
  return chats[0];
}

export async function findChats(db, before, by, limit = 10) {
  return db
    .collection("posts")
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

export async function insertPost(db, { content, creatorId }) {
  const post = {
    content,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection("posts").insertOne(post);
  post._id = insertedId;
  return post;
}

// // ##  All Events Function ##
// export async function getAllChats(db) {
//   return db.collection("chats").find();
// }

// // #############################################################

// import { ObjectId } from "mongodb";

// export async function findChatById(db, chatId) {
//   return db
//     .collection("chats")
//     .findOne({ _id: new ObjectId(chatId) })
//     .then((chat) => chat || null);
// }

// export async function findChatByChatName(db, chatName) {
//   return db
//     .collection("chats")
//     .findOne({ chatName })
//     .then((chat) => chat || null);
// }

// export async function findChatsByUserId(db, userId) {
//   return db
//     .collection("chats")
//     .find({ "chat.users": { $elemMatch: { userId } } })
//     .then((chat) => chat || null);
// }

// export async function findAllChats(db) {
//   return db
//     .collection("chats")
//     .findOne()
//     .then((chat) => chat || null);
// }

// // ! UPDATE CHAT ? ... changes needed
// // export async function updateChatById(db, id, data) {
// //   return db
// //     .collection("chats")
// //     .findOneAndUpdate(
// //       { _id: new ObjectId(id) },
// //       { $set: data },
// //       { returnDocument: "after", projection: { password: 0 } }
// //     )
// //     .then(({ value }) => value);
// // }

// //! Later maybe needed if modified for "chats"
// // export async function insertUser(
// //   db,
// //   {
// //     username,
// //     email,
// //     originalPassword,
// //     bio,
// //     city,
// //     avatar,
// //     circle,
// //     events,
// //     jobs,
// //     friends,
// //     admin,
// //     isVerified,
// //     language,
// //     since,
// //   }
// // ) {
// //   const user = {
// //     username,
// //     email,
// //     bio,
// //     city,
// //     avatar,
// //     circle,
// //     language,
// //     events,
// //     jobs,
// //     friends,
// //     admin,
// //     isVerified,
// //     since,
// //   };
// //   const password = await bcrypt.hash(originalPassword, 10);
// //   const { insertedId } = await db
// //     .collection("chats")
// //     .insertOne({ ...chat, password });
// //   chat._id = insertedId;
// //   return chat;
// // }
