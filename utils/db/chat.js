import { ObjectId } from "mongodb";

export async function findChatById(db, chatId) {
  return db
    .collection("chats")
    .findOne({ _id: new ObjectId(chatId) })
    .then((chat) => chat || null);
}

export async function findChatByChatName(db, chatName) {
  return db
    .collection("chats")
    .findOne({ chatName })
    .then((chat) => chat || null);
}

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

//! Later maybe needed, modified for "chats"
// export async function insertUser(
//   db,
//   {
//     username,
//     email,
//     originalPassword,
//     bio,
//     city,
//     avatar,
//     circle,
//     events,
//     jobs,
//     friends,
//     admin,
//     isVerified,
//     language,
//     since,
//   }
// ) {
//   const user = {
//     username,
//     email,
//     bio,
//     city,
//     avatar,
//     circle,
//     language,
//     events,
//     jobs,
//     friends,
//     admin,
//     isVerified,
//     since,
//   };
//   const password = await bcrypt.hash(originalPassword, 10);
//   const { insertedId } = await db
//     .collection("chats")
//     .insertOne({ ...chat, password });
//   chat._id = insertedId;
//   return chat;
// }
