import { ObjectId } from "mongodb";
import { dbProjectionUsers } from "./user";

export async function findComments(db, postId, before, limit = 10) {
    return db
        .collection("comments")
        .aggregate([
            {
                $match: {
                    postId: new ObjectId(postId),
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

export async function insertComment(db, postId, { content, creatorId }) {
    // console.log("utils/db/insertComment => postId ", postId);
    // console.log("utils/db/insertComment => content ", content);
    // console.log("utils/db/insertComment => creatorId ", creatorId);

    const comment = {
        content,
        postId: new ObjectId(postId),
        creatorId,
        createdAt: new Date(),
    };
    //console.log("utils/db/insertComment => COMMENT ", comment);
    const { insertedId } = await db.collection("comments").insertOne(comment);
    comment._id = insertedId;
    return comment;
}
