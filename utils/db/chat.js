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
// @desc   fetch only users chats
// @route   GET /api/chats/getUsersChats
// @access  Protected
export async function findUsersChats(db, currentUser) {
  // currentUser => new ObjectId("634db22538ea5aba7b60a1dd")
  const usersChats = await db
    .collection("chats")
    .aggregate([
      {
        $match: {
          $or: [
            // { users: { $elemMatch: { $eq: currentUser.toString() } } },
            { creatorId: new ObjectId(currentUser) },
          ],
        },
      },
      { $sort: { _id: -1 } },
      //! Projection can't be used here:
      // { projection: dbProjectionUsers() },
    ])
    .toArray();
  // console.log("#####################################");
  // console.log("utils/db/chat findUsersChats =>", usersChats);
  // result is [{},{}, ...]
  if (usersChats.length === 0) return null;
  return usersChats;
}

//! #############################
//? TRIAL of UseSWRInfinite
// @desc    Add user to Group
// @route   GET /api/chats/getUsersChatsBy/:userId
// @access  Protected
// export async function findUsersChatsBy(db, userId) {
//   console.log("usersId from getUsersChatsBy =>", userId);
//   const usersChats = await db
//     .collection("chats")
//     .aggregate([
//       {
//         $match: {
//           $or: [{ users: userId.toString() }, { creatorId: userId.toString() }],
//         },
//       },
//       { $sort: { _id: -1 } },
//       //! Projection can't be used here:
//       // { projection: dbProjectionUsers() },
//     ])
//     .toArray();
//   console.log("usersChats from getUsersChatsBy =>", usersChats);
//   if (usersChats.length === 0) return null;
//   return usersChats;
// }
//! #############################

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
// @desc    creates a chat with username
// @route   POST /api/chats/createChat
// @access  Protected
// export async function insertChat(db, { users, creatorId }) {
//   const chat = {
//     users,
//     creatorId,
//     createdAt: new Date(),
//   };
//   const { insertedId } = await db.collection("chats").insertOne(chat);
//   chat._id = insertedId;
//   return chat;
// }

// @desc    creates a chat with username
// // @route   POST /api/chats/createChat
// @route   POST /api/chats/
// @access  Protected
export async function insertChat(db, { chatName, users, content, creatorId }) {
  const chat = {
    chatName,
    users,
    content,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection("chats").insertOne(chat);
  chat._id = insertedId;
  return chat;
}

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
