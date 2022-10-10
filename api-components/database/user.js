import userModel from "../../models/userModel";
import { transport } from "../../utils/nodemailer/nodemailer";
import emailTokenModel from '../../models/emailVerificationToken';

export const userSignup = async (req, res) => {
    const { username, email, password, city, language } = req.body;

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
            password,
            city,
            language, 
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
            from: "verification@devshed.com",
            to: newUser.email,
            subject: "Email verification",
            html: `
            <p> PLEASE CONFIRM YOUR OTP CODE <p>
            <h1>${OTP}</h1>
            `,
        });
        res.status(201).json({
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },

            message:
                "Please verify your email.OTP has been sent to your email address",
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};
