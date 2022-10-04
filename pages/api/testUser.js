import dbConnect from "../../utils/mongo/dbConnect";
import userModel from "../../models/userModel";

export const handler = async (req, res) => {
    const { method } = req;

    //connect database
    await dbConnect();

    //create user
    if (method === "POST") {
        const { username, email, password } = req.body;
        try {
            //Check if user already exists
            let existingUser = await userModel.findOne({ email });

            if (existingUser) {
                return res.status(401).json({ msg: "User Already Exists!" }); //unauthorized
            }

            //Create a new user
            const newUser = new userModel({
                username,
                email,
                password, //12345
            });

            await newUser.save();

            //Generate 8 digit OTP token
            let OTP = generateOTP(8);

            //store OTP in db
            const newEVToken = new emailTokenModel({
                owner: newUser._id,
                token: OTP,
            });

            newEVToken.save();

            //send email verification

            transport.sendMail({
                from: "verification@reviewapp.com",
                to: newUser.email,
                subject: "Email verification",
                html: `
                <p> PLEASE CONFIRM YOUR OTP CODE <p>
                <h1>${OTP}</h1>
                `,
            });
            res.status(201).json({
                message:
                    "Please verify your email.OTP has been sent to your email address",
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};
