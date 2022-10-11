import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const passwordResetToken = mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, expires: 3600, default: new Date() }, //expire in 1 hour
});

passwordResetToken.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});

passwordResetToken.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

const passwordRT =
    mongoose.model.Password_resets ||
    mongoose.model("password_reset", passwordResetToken);

export default passwordRT;
