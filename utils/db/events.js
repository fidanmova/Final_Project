// ##  All Events Function ##
export async function getAllEvents(db) {
  return db.collection("berlin_nov_2022").find();
}
