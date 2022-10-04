import dbConnect from "../../../utils/mongo/dbConnect";
dbConnect();

export default async function testUser(req, res) {
    console.log("CONNECTING..........");
    await dbConnect();
    console.log("CONNECTED TO MONGO");
}
