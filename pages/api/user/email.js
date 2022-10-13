import nc from "next-connect";
import auths from "../../../middlewares/auth";
import { createToken } from "../../../utils/db";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import { transport } from "../../../utils/nodemailer/nodemailer";

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(async (req, res) => {
    if (!req.user) {
        res.json(401).end();
        return;
    }

    const db = await dbConnect();

    const OTP = await createToken(db, {
        creatorId: req.user._id,
        type: "emailVerify",
        expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });

    await transport.sendMail({
        from: "verification@devshed.com",
        to: req.user.email,
        subject: "Welcome to DevShed",
        html: `
    <p> PLEASE CONFIRM YOUR OTP CODE <p>
    <h1>${OTP}</h1>
    `,
    });

    res.status(204).end();
});

export default handler;
