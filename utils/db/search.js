import { ObjectId } from "mongodb";

//! TRAIL - worked partially - needs update
// @desc    Find User
// @route   GET /api/search/:searchText
// @access  Protected
export async function findUserBySearchText(db, searchText) {
  let userPattern = new RegExp(`^${searchText}`);
  return db
    .collection("users")
    .find(
      {
        username: { $regex: userPattern, $options: "i" },
      }
      // Need to test if projection needed and if it works
      // { projection: dbProjectionUsers() }
    )
    .toArray();
}

// export async function findUserBySearch(db, searchText) {
//   let userPattern = new RegExp(`^${searchText}`);
//   return db
//     .collection("users")
//     .aggregate([
//       {
//         $match: { username: userPattern },
//       },
//     ])
//     .toArray();
// }
