import { ObjectId } from "mongodb";
import { dbProjectionUsers } from "./user";

// ! Works:
// @desc    find all chats
// @route   GET
// @access  NOT Protected
export async function findAllChats(db) {
  return db.collection("chats").find().toArray();
}

//! Works
// @desc    find chat by id
// @route   GET /api/chats/findChatById/:chatId
// @access  Protected
export async function findChatById(db, id) {
  const chat = await db
    .collection("chats")
    .findOne({ _id: new ObjectId(id) }, { projection: dbProjectionUsers() });
  if (!chat) return null;
  return chat;
}

// ! Works:
// @desc    Add user to Group
// @route   GET /api/chats/getUsersChats
// @access  Protected
export async function findUsersChats(db, currentUser) {
  const usersChats = await db
    .collection("chats")
    .aggregate([
      {
        $match: {
          $or: [
            { users: currentUser._id.toString() },
            { creatorId: currentUser._id.toString() },
          ],
        },
      },
      { $sort: { _id: -1 } },
      //! Projection can't be used here:
      // { projection: dbProjectionUsers() },
    ])
    .toArray();
  if (usersChats.length === 0) return null;
  return usersChats;
}

// ! Works:
// @desc    CHECK if user is creator/admin of chat
// @route   GET /api/chats/:chatId/isAdmin/
// @route   PUT /api/chats/groupadd
// @route   PUT /api/chats/groupdelete
// @access  Protected
export async function isUserChatAdmin(db, chatId, currentUser) {
  const isAdmin = await db
    .collection("chats")
    .aggregate([
      {
        $match: {
          $and: [
            { _id: new ObjectId(chatId) },
            { creatorId: currentUser._id.toString() },
          ],
        },
      },
    ])
    .toArray();

  if (isAdmin.length === 0) return false;
  return true;
}

// ! Works:
// @desc    Add user to Group
// @route   POST /api/chats/createChat
// @access  Protected

export async function insertChat(db, { users, creatorId }) {
  const chatGroup = {
    users,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection("chatGroups").insertOne(chatGroup);
  chatGroup._id = insertedId;
  return chatGroup;
}
// export async function insertChat(
//   db,
//   { chatName, isGroupChat, users, content, creatorId }
// ) {
//   const chat = {
//     chatName,
//     isGroupChat,
//     users,
//     content,
//     creatorId,
//     createdAt: new Date(),
//   };
//   const { insertedId } = await db.collection("chats").insertOne(chat);
//   chat._id = insertedId;
//   return chat;
// }

// ! Works:
// @desc    Add user to Group
// @route   PUT /api/chats/groupadd
// @access  Protected
export async function findChatByIdAndAddUser(db, chatId, userId) {
  return db.collection("chats").updateOne(
    { _id: new ObjectId(chatId) },
    {
      $push: { users: userId },
    },
    {
      new: true,
    },
    { projection: dbProjectionUsers() }
  );
}

// ! Works:
// @desc    Deletes user from Group
// @route   PUT /api/chats/groupdelete
// @access  Protected
export async function findChatByIdAndDeleteUser(db, chatId, userId) {
  return db.collection("chats").updateOne(
    { _id: new ObjectId(chatId) },
    {
      $pull: { users: userId },
    },
    {
      new: true,
    },
    { projection: dbProjectionUsers() }
  );
}

//! Unconfirmed & unused:
// @desc    Modify Chat Data
// @route   POST /api/chats/modifyChat/
// @access  Protected
export async function updateChatById(db, id, data) {
  return db
    .collection("chats")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after", projection: { password: 0 } }
    )
    .then(({ value }) => value);
}

// ! Does NOT WORK:
// export async function findChats(db, before, by, limit = 10) {
//   return db
//     .collection("chats")
//     .aggregate([
//       {
//         $match: {
//           ...(by && { creatorId: new ObjectId(by) }),
//           ...(before && { createdAt: { $lt: before } }),
//         },
//       },
//       { $sort: { _id: -1 } },
//       { $limit: limit },
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
// }

// export function dbProjectionChats(prefix = "") {
//   return {
//     [`${prefix}password`]: 0,
//     [`${prefix}email`]: 0,
//     [`${prefix}emailVerified`]: 0,
//   };
// }
