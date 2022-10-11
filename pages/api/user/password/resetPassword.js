import { nc } from "next-connect";
import { ncOpts } from "../../../../utils/nc";
import { ValidateProps } from "../../../../models/schema";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import {
    createToken,
    findAndDeleteTokenByIdAndType,
    findUserByEmail,
    UNSAFE_updateUserPassword,
} from "../../../../utils/db";
import { transport } from "../../../../utils/nodemailer/nodemailer";
import { validateBody } from "../../../../middlewares/ajv";

const handler = nc(ncOpts);

handler.post(
    validateBody({
        type: "object",
        properties: {
            email: ValidateProps.user.email,
        },
        required: ["email"],
        additionalProperties: false,
    }),
    async (req, res) => {
        const db = await dbConnect();

        const { email } = req.body;
        const user = await findUserByEmail(db, email);
        if (!user) {
            res.status(400).json({
                error: {
                    message: "We couldn’t find that email. Please try again.",
                },
            });
            return;
        }

        const token = await createToken(db, {
            creatorId: user._id,
            type: "passwordReset",
            expireAt: new Date(Date.now() + 1000 * 60 * 20),
        });

        await transport.sendMail({
            to: email,
            from: "no-reply@devshed.com",
            subject: "DevShed - Reset your password.",
            html: `
      <div>
        <p>Hello, ${user.name}</p>
        <p>Please follow <a href="${process.env.WEB_URI}/forget-password/${token._id}">this link</a> to reset your password.</p>
      </div>
      `,
        });

        res.status(204).end();
    }
);

handler.put(
    validateBody({
        type: "object",
        properties: {
            password: ValidateProps.user.password,
            token: { type: "string", minLength: 0 },
        },
        required: ["password", "token"],
        additionalProperties: false,
    }),
    async (req, res) => {
        const db = await getMongoDb();

        const deletedToken = await findAndDeleteTokenByIdAndType(
            db,
            req.body.token,
            "passwordReset"
        );
        if (!deletedToken) {
            res.status(403).end();
            return;
        }
        await UNSAFE_updateUserPassword(
            db,
            deletedToken.creatorId,
            req.body.password
        );
        res.status(204).end();
    }
);

export default handler;
