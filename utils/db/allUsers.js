// ##  All Users Function ##
export async function getAllUsers(db) {
    return db.collection("users").find();
  }