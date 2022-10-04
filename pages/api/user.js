import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { transport } from "../../utils/nodemailer/nodemailer";
import jwt from "jsonwebtoken";
import { randomByte, sendError } from "../../utils/auth/helper";
import userModel from "../../models/userModel";
import emailTokenModel from "../../models/emailVerificationToken";
import { generateOTP } from "../../utils/auth/generateOTP";
import passwordRT from "../../models/passwordResetToken";
import connect from "../../utils/mongo/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET;

export const userSignup = async (req, res) => {
    connect().catch((err) => console.error(err));
    
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
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user)
            return res.status(400).json({
                message: "User Not Exist",
            });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({
                message: "Incorrect Password !",
            });

        const payload = {
            user: {
                id: user.id,
                name: user.username,
            },
        };

        jwt.sign(
            payload,
            JWT_SECRET,
            {
                expiresIn: "1h",
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({ token });
            }
        );
    } catch (err) {
        sendError(res, err.message, 500);
    }
};

export const verifyOTP = async (req, res, next) => {
    const { userId, OTP } = req.body;
    console.log("userId, OTP", userId, OTP);
    try {
        if (!mongoose.isValidObjectId(userId))
            return sendError(res, "Ops..Invalid User Id");

        const user = await userModel.findById(userId);
        // console.log("U S E R ", user);
        if (!user) return sendError(res, "Ops..user not found!");

        if (user.isVerified) return sendError(res, "User is already verified!");

        const token = await emailTokenModel.findOne({ owner: userId });
        // console.log("T O K E N", token);

        if (!token) return sendError(res, " Token may be expired!");

        const isMatch = await token.compareToken(OTP);
        // console.log("Match", isMatch);
        if (!isMatch) return sendError(res, "Token does not match!");

        await user.updateOne({ isVerified: true });

        await emailTokenModel.findByIdAndDelete(token._id);

        transport.sendMail({
            from: "verification@reviewapp.com",
            to: user.email,
            subject: "Welcome Email",
            html: "<h1>Your profile is active, start to review your favorite movies</h1>",
        });
        res.json({ message: "Your account has been verified" });
    } catch (err) {
        console.error(err);
    }
};

export const resendEVT = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await userModel.findById(userId);
        console.log("U S E R ", user);
        if (!user) return sendError(res, "Ops..user not found!", 404);
        if (user.isVerified) return sendError("Ops..user is already verified!");

        const oldToken = await emailTokenModel.findOne({ owner: userId });
        if (oldToken)
            return sendError(res, "You can request a new token in 1h");

        //Generate 8 digit OTP token
        let OTP = "";
        for (let i = 0; i <= 7; i++) {
            const random = Math.round(Math.random() * 9);
            OTP += random;
        }

        //store OTP in db
        const newEVToken = new emailTokenModel({
            owner: user._id,
            token: OTP,
        });

        newEVToken.save();

        transport.sendMail({
            from: "verification@reviewapp.com",
            to: newUser.email,
            subject: "Email verification",
            html: `
        <p> PLEASE CONFIRM YOUR OTP CODE <p>
        <h1>${OTP}</h1>
        `,
        });
        res.json({ message: "New OTP has been send to your email" });
    } catch (err) {
        return sendError(res, err.message);
    }
};
export const forgetPassword = async (req, res) => {
    const { email } = req.body;
    console.log("email", email);
    try {
        //check if email
        if (!email) return sendError(res, "Enter a valid email!");

        const user = await userModel.findOne({ email });
        console.log("user_email", user);

        // check if user exists
        if (!user) return sendError(res, "User not found!", 404);
        //check if user has already a token
        const oldToken = await passwordRT.findOne({ owner: user._id });
        console.log("old", oldToken);
        if (oldToken)
            return sendError(res, "you can request a new token in 1h", 404);
        // generate strong resetPassword Token
        const token = await randomByte();
        console.log("token", token);
        const newPassRT = await passwordRT({ owner: user._id, token });
        await newPassRT.save();

        //reset url
        const resetPassURL = `htttp://localhost:3000/reset-password?token=${token}&id=${user._id}`;

        transport.sendMail({
            from: "security@reviewapp.com",
            to: user.email,
            subject: "Reset Password",
            html: `
         <p> Click here to reset your password<p>
         <a href="${resetPassURL}" target="_blank"> Reset Password </a>
         `,
        });
        res.json({ message: "Check your email for further instructions." });
    } catch (err) {
        return sendError(res, err);
    }
};

export const verifyPassToken = (req, res) => {
    res.json({ valid: true });
};

export const resetPassword = async (req, res) => {
    const { newPassword, userId } = req.body;

    try {
        const user = await userModel.findById(userId);
        const token = await passwordRT.findOne({ owner: userId });

        await user.updateOne({ password: newPassword });
        await passwordRT.findByIdAndDelete(token._id);

        transport.sendMail({
            from: "security@reviewapp.com",
            to: user.email,
            subject: "Password Reset Successfully",
            html: `
          <h1>Password Reset Successfully</h1> 
        `,
        });

        res.json({
            message:
                "Password reset successfully, now you can use new password.",
        });
    } catch (errors) {
        return sendError(res, errors);
    }
};
export const userProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.send({ msg: "Error!!" });
    }
};
