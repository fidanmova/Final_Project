import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

// @desc    find all chats
// @route   GET
// @access  NOT Protected
export async function findAllUsers(db) {
  return db.collection("users").find().toArray();
}

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

export async function findAllUsersForChat(db) {
  const searchResults = db
    .collection("users")
    .find(
      { _id: { $exists: true } },
      { projection: { username: 1, avatar: 1 } }
    )
    .toArray();
  console.log("searchResults from db/user", searchResults);
  if (searchResults.length === 0) return null;
  return searchResults;
}

export async function findUserById(db, userId) {
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
    [`${prefix}code`]: 0,
    [`${prefix}city`]: 0,
    [`${prefix}jobs`]: 0,
    [`${prefix}events`]: 0,
    [`${prefix}location`]: 0,
    [`${prefix}circle`]: 0,
    [`${prefix}position`]: 0,
  };
}

export function dbProjectionChat(prefix = "") {
  return {
    [`${prefix}password`]: 0,
    [`${prefix}email`]: 0,
    [`${prefix}emailVerified`]: 0,
    [`${prefix}isVerified`]: 0,
    [`${prefix}admin`]: 0,
    [`${prefix}bio`]: 0,
    [`${prefix}language`]: 0,
    [`${prefix}friends`]: 0,
    [`${prefix}code`]: 0,
    [`${prefix}city`]: 0,
    [`${prefix}jobs`]: 0,
    [`${prefix}events`]: 0,
    [`${prefix}location`]: 0,
    [`${prefix}circle`]: 0,
    [`${prefix}position`]: 0,
  };
}
