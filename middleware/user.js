import mongoose from "mongoose";
import passwordRT from "../models/passwordResetToken";
import { sendError } from "../utils/auth/helper";

const verifyPassToken = async (req, res, next) => {
    const { token, userId } = req.body;
    console.log("token, userId", token, userId);

    if (!token.trim() || !mongoose.isValidObjectId(userId))
        return sendError(res, "invalid request");

    const resetToken = await passwordRT.findOne({ owner: userId });
    if (!resetToken)
        return sendError(res, "Unauthorized access to password reset");

    const matched = await resetToken.compareToken(token);
    if (!matched)
        return sendError(res, "Unauthorized access to password reset");

    req.resetToken = resetToken;

    next();
};

export { verifyPassToken };
