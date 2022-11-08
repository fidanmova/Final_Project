// @desc    Find User
// @route   GET /api/search/:searchText
// @access  Protected
export async function findUserBySearchText(db, searchText) {
  let userPattern = new RegExp(`^${searchText}`);
  return db
    .collection("users")
    .find({
      username: { $regex: userPattern, $options: "i" },
    })
    .toArray();
}
