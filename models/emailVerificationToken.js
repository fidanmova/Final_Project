import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const emailVerificationTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: { type: String, required: true },
    createdAt: { type: Date, expires: 3600, default: new Date() }, //expire in 1 hour
});

emailVerificationTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10);
    }

    next();
});

emailVerificationTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compare(token, this.token);
    return result;
};

const emailTokenModel = mongoose.model("Token", emailVerificationTokenSchema);

export default emailTokenModel;
