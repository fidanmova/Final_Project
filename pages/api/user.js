import userModel from "../../models/userModel";
import dbConnect from "../../utils/mongo/dbConnect";

export default async function createUser(req, res) {
    try {
        const { username, email, password, city, language } = req.body;
        // #### Connecting to DB ####

        await dbConnect();

        // #### Creating test Users Using Faker ####

        const user = await userModel.create({
            username: username,
            email: email,
            password: password,
            city: city,
            language: language,
        });
        if (!user) {
            return res.json({ code: "User not created" });
        }
        // #### Confirm Message  ####
        console.log("1 Test User Created");
        res.json({ message: "1 New User Created" });
    } catch (error) {
        // #### Error Message ####
        console.log(error);
        res.status(400).json({ status: "Not able to create a new user." });
    }
}
