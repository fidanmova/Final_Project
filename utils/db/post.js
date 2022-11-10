import { ObjectId } from "mongodb";
import { dbProjectionUsers } from "./user";

// ! Works:
// @desc    find all chats
// @route   GET api/posts/
// @access  NOT Protected
export async function findAllPosts(db, before, by, limit = 10) {
  const allPosts = await db
    .collection("posts")
    .aggregate([
      {
        $match: {},
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
  if (allPosts.length === 0) return null;
  return allPosts;
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

// @route   GET PAGES/posts/
// @route   GET /api/posts/ => can get post of user; also are sent to route.
export async function findUsersPosts(db, currentUser) {
  console.log("currentUser from db/posts/findUsersPosts", currentUser);
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
  console.log("POST from db/post/insertPost =>", post);
  const { insertedId } = await db.collection("posts").insertOne(post);
  post._id = insertedId;
  return post;
}

// #################
// Info about MONGODB Methods used:
// #################

// aggregate:
// It collects values from various documents and groups them together.
