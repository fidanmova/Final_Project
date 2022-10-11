import nc from "next-connect";
import { validateBody, auths } from "../../../middlewares";

import { ValidateProps } from "../../../models/schema";
import {
    findUserByEmail,
    findUserByUsername,
    insertUser,
} from "../../../utils/db";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import { slugUsername } from "../../../utils/user/slug";

const handler = nc(ncOpts);

handler.post(
    validateBody({
        type: "object",
        properties: {
            username: ValidateProps.user.username,
            email: ValidateProps.user.email,
            password: ValidateProps.user.password,
            city: ValidateProps.user.city,
            language: ValidateProps.user.language,
        },
        required: ["username", "city", "password", "email", "language"],
        additionalProperties: false,
    }),
    ...auths,
    async (req, res) => {
        try {
            const db = await dbConnect();

            let { username, city, email, password, language } = req.body;

            username = slugUsername(req.body.username);

            // if (email) {
            //     res.status(400).json({
            //         error: { message: "The email you entered is invalid." },
            //     });
            //     return;
            // }
            if (await findUserByEmail(db, email)) {
                res.status(403).json({
                    error: { message: "The email has already been used." },
                });
                return;
            }
            if (await findUserByUsername(db, username)) {
                res.status(403).json({
                    error: { message: "The username has already been taken." },
                });
                return;
            }
            const user = await insertUser(db, {
                username,
                email,
                originalPassword: password,
                city,
                language:"",
                circle: [],
                bio: "",
                events: [],
                jobs: [],
                admin: false,
                isVerified: false,
            });
            req.logIn(user, (err) => {
                if (err) throw err;
                res.status(201).json({
                    user,
                });
            });
        } catch (error) {
            console.error(error);
        }
    }
);

export default handler;
