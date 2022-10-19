import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
// export async function findUserWithEmailAndPassword(db, email, password) {
//   const user = await db.collection("chats").findOne({ email });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     return { ...user, password: undefined }; // filtered out password
//   }
//   return null;
// }
// export async function findUserForAuth(db, userId) {
//   return db
//     .collection("users")
//     .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })
//     .then((user) => user || null);
// }
export async function findChatById(db, chatId) {
  return db
    .collection("chats")
    .findOne({ _id: new ObjectId(chatId) }, { projection: dbProjectionChats() })
    .then((chat) => chat || null);
}
export async function findChatByChatName(db, chatName) {
  return db
    .collection("chats")
    .findOne({ chatName }, { projection: dbProjectionChats() })
    .then((chat) => chat || null);
}
// export async function findUserByEmail(db, email) {
//   return db
//     .collection("users")
//     .findOne({ email }, { projection: dbProjectionUsers() })
//     .then((user) => user || null);
// }
// ! UPDATE CHAT ? ... changes needed
// export async function updateChatById(db, id, data) {
//   return db
//     .collection("chats")
//     .findOneAndUpdate(
//       { _id: new ObjectId(id) },
//       { $set: data },
//       { returnDocument: "after", projection: { password: 0 } }
//     )
//     .then(({ value }) => value);
// }
export async function insertUser(
  db,
  {
    username,
    email,
    originalPassword,
    bio,
    city,
    avatar,
    circle,
    events,
    jobs,
    friends,
    admin,
    isVerified,
    language,
    since,
  }
) {
  const user = {
    username,
    email,
    bio,
    city,
    avatar,
    circle,
    language,
    events,
    jobs,
    friends,
    admin,
    isVerified,
    since,
  };
  const password = await bcrypt.hash(originalPassword, 10);
  const { insertedId } = await db
    .collection("chats")
    .insertOne({ ...chat, password });
  chat._id = insertedId;
  return chat;
}
// export function dbProjectionChats(prefix = "") {
//   return {
//     [`${prefix}password`]: 0,
//     [`${prefix}email`]: 0,
//     [`${prefix}emailVerified`]: 0,
//   };
// }
