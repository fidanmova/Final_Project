import { ObjectId } from "mongodb";
import { dbProjectionUsers, dbProjection } from "./user";

// ! Works:
// @desc    find all chats
// @route   GET
// @access  NOT Protected
export async function findAllChats(db) {
  return db.collection("chats").find().toArray();
}

//! Works
// @desc    find chat by id
// @route   GET /api/chats/:chatId
// @route   GET /api/singleChat/:chatId
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
  const usersChats = await db
    .collection("chats")
    .aggregate([
      {
        $match: {
          $or: [
            { users: { $elemMatch: { $eq: new ObjectId(currentUser) } } },
            { creatorId: new ObjectId(currentUser) },
          ],
        },
      },
      { $sort: { _id: -1 } },
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
            {
              _id: new ObjectId(chatId.toString()),
            },
            {
              creatorId: new ObjectId(currentUser._id.toString()),
            },
          ],
        },
      },
    ])
    .toArray();

  if (isAdmin.length === 0) return false;
  return true;
}

// @desc    creates a chat with username
// @route   POST /api/chats/
// @access  Protected
export async function insertChat(db, { chatName, users, content, creatorId }) {
  const chat = {
    chatName,
    users: users.map((u) => new ObjectId(u)),
    content,
    creatorId,
    createdAt: new Date(),
  };
  const { insertedId } = await db.collection("chats").insertOne(chat);
  chat._id = insertedId;
  return chat;
}

// ! Works
// @desc    Add user to Group
// @route   PUT /api/chats/groupadd
// @access  Protected
export async function findChatByIdAndAddUser(db, chatId, userId) {
  return db.collection("chats").updateOne(
    { _id: new ObjectId(chatId) },
    {
      $push: { users: new ObjectId(userId.toString()) },
    },
    {
      new: true,
    },
    { projection: dbProjectionUsers() }
  );
}

// ! Works
// @desc    Deletes user from Group
// @route   PUT /api/chats/groupdelete
// @access  Protected
export async function findChatByIdAndDeleteUser(db, chatId, userId) {
  return db.collection("chats").updateOne(
    { _id: new ObjectId(chatId) },
    {
      $pull: { users: new ObjectId(userId.toString()) },
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
