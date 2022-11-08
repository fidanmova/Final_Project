import { ObjectId } from "mongodb";
import { dbProjectionUsers } from "./user";

// ! Works:
// @desc    find all chats
// @route   GET api/posts/
// @access  NOT Protected
export async function findAllPosts(db) {
  return db.collection("posts").find().toArray();
}

export async function findPostById(db, id) {
  console.log("findPostById => ", id);
  const posts = await db
    .collection("posts")
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
  console.log("findPostById POSTS =>", posts);
  if (!posts[0]) return null;
  return posts[0];
}

// @route   GET /api/chats/getUsersChats
// @route   GET /api/posts/getUsersPosts
// @route   GET /api/posts/ => can get post of user; also are sent to route.
export async function findUsersPosts(db, currentUser) {
  // currentUser => new ObjectId("634db22538ea5aba7b60a1dd")
  const usersPosts = await db
    .collection("posts")
    .aggregate([
      {
        $match: { creatorId: new ObjectId(currentUser) },
      },
      { $sort: { _id: -1 } },
      //! Projection can't be used here:
      // { projection: dbProjectionUsers() },
    ])
    .toArray();
  if (usersPosts.length === 0) return null;
  // console.log("#####################################");
  // console.log("utils/db/post findUsersPosts =>", usersPosts);
  // result is [{},{}, ...]
  return usersPosts;
}

export async function findPosts(db, before, by, limit = 10) {
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

// #################
// Info about MONGODB Methods used:
// #################

// aggregate:
// It collects values from various documents and groups them together.
