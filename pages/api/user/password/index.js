import nc from "next-connect";
import { validateBody } from "../../../../middlewares/ajv";
import auths from "../../../../middlewares/auth";
import { ValidateProps } from "../../../../models/schema";
import { updateUserPasswordByOldPassword } from "../../../../utils/db";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";

const handler = nc(ncOpts);
handler.use(...auths);

handler.put(
    validateBody({
        type: "object",
        properties: {
            oldPassword: ValidateProps.user.password,
            newPassword: ValidateProps.user.password,
        },
        required: ["oldPassword", "newPassword"],
        additionalProperties: false,
    }),
    async (req, res) => {
        if (!req.user) {
            res.json(401).end();
            return;
        }

        const db = await dbConnect();

        const { oldPassword, newPassword } = req.body;

        const success = await updateUserPasswordByOldPassword(
            db,
            req.user._id,
            oldPassword,
            newPassword
        );

        if (!success) {
            res.status(401).json({
                error: {
                    message: "The old password you entered is incorrect.",
                },
            });
            return;
        }

        res.status(204).end();
    }
);

export default handler;
