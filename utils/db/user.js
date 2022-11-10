import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export async function findUserWithEmailAndPassword(db, email, password) {
  const user = await db.collection("users").findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    return { ...user, password: undefined }; // filtered out password
  }
  return null;
}

export async function findUserForAuth(db, userId) {
  return db
    .collection("users")
    .findOne({ _id: new ObjectId(userId) }, { projection: { password: 0 } })
    .then((user) => user || null);
}

//@description     Get or Search all users via username
//@route           GET /api/user/:userId
// export async function findUserById(db, userId) {
//   console.log("USER ID =========>", userId);
//   const user = db.collection("users").findOne(
//     { _id: new ObjectId(userId) }
//     // { projection: dbProjectionUsers() }
//   );
//   if (!user) return null;
//   console.log("user ^^^ ", user);
//   return user;
// }

export async function findUserById(db, userId) {
  console.log("USER ID =========>", userId);
  return db
    .collection("users")
    .findOne({ _id: new ObjectId(userId) }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

//@description     Get or Search all users via username
//@route           GET /api/user/:username
export async function findUserByUsername(db, username) {
  return db
    .collection("users")
    .findOne({ username }, { projection: dbProjectionUsers() })
    .then((user) => {
      return user || null;
    });
}

//@description     Get or Search all users via username
//@route           GET /api/users/search?search=
//@access          Public
export async function findUserByUsernameSearch(db, keyword) {
  const searchResults = db
    .collection("users")
    .aggregate([
      {
        $match: { username: { $regex: keyword, $options: "i" } },
      },
      { $sort: { username: -1 } },
    ])
    .toArray();
  console.log("searchResults from db/user", searchResults);
  if (searchResults.length === 0) return null;
  return searchResults;
}

export async function findUserByEmail(db, email) {
  return db
    .collection("users")
    .findOne({ email }, { projection: dbProjectionUsers() })
    .then((user) => user || null);
}

export async function updateUserById(db, id, data) {
  return db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after", projection: { password: 0 } }
    )
    .then(({ value }) => value);
}

export async function updateUserCode(db, id, code) {
  // console.log("ID====>", id);
  return db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $push: { code: code } },
      { returnDocument: "after", projection: { password: 0 } }
    )
    .then(({ value }) => value)
    .catch((er) => {
      console.log(er);
    });
}

export async function updateUserEvents(db, id, event) {
  // console.log("Event =>", event);

  return db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $push: { events: event } },
      { returnDocument: "after", projection: { password: 0 } }
    )
    .then(({ value }) => value)
    .catch((er) => {
      console.log(er);
    });
}

export async function updateUserJobs(db, id, job) {
  // console.log("ID====>", id);
  return db
    .collection("users")
    .findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $push: { jobs: job } },
      { returnDocument: "after", projection: { password: 0 } }
    )
    .then(({ value }) => value)
    .catch((er) => {
      console.log(er);
    });
}

export async function insertUser(
  db,
  {
    username,
    email,
    originalPassword,
    bio,
    city,
    location,
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
    location,
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
    .collection("users")
    .insertOne({ ...user, password });
  user._id = insertedId;
  return user;
}

export async function updateUserPasswordByOldPassword(
  db,
  id,
  oldPassword,
  newPassword
) {
  const user = await db.collection("users").findOne(new ObjectId(id));
  if (!user) return false;
  const matched = await bcrypt.compare(oldPassword, user.password);
  if (!matched) return false;
  const password = await bcrypt.hash(newPassword, 10);
  await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { password } });
  return true;
}

export async function updateUserPassword(db, id, newPassword) {
  const password = await bcrypt.hash(newPassword, 10);
  await db
    .collection("users")
    .updateOne({ _id: new ObjectId(id) }, { $set: { password } });
}

export function dbProjectionUsers(prefix = "") {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
  };
}

export function dbProjectionUsersSmall(prefix = "") {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
    [`${prefix}isVerified`]: 0,
    [`${prefix}admin`]: 0,
    [`${prefix}bio`]: 0,
    [`${prefix}language`]: 0,
    [`${prefix}friends`]: 0,
  };
}
