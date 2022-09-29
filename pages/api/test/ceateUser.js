import connect from "../../../utils/mongo/mongo";

export default async function testUser(req, res) {
    const { username, email } = req.body;
    console.log("CONNECTING..........");
    await connect();
    console.log("CONNECTED TO MONGO");
}
