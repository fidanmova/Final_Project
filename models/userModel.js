import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Enter your username"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Enter your email"],
        lowercase: true,
        trim: true,
        validate: [
            (val) => {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                    val
                );
            },
            "Please insert a valid email address",
        ],
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
        validate: [
            (val) => {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                    val
                );
            },
            "Please insert a valid password",
        ],
    },
    city: {
        type: String,
        required: [true, "Enter your city"],
    },
    events: {
        type: Array,
    },
    group: {
        type: Array,
    },
    job: { type: Array },

    project: { type: Array },

    since: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
});
//if password update
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const userModel = mongoose.model("User") || mongoose.model("User", userSchema);

export default userModel;
