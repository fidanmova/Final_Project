import nc from "next-connect";
import { validateBody, auths } from "../../../middlewares";
import { ValidateProps } from "../../../models/schema";
import {
  findUserByEmail,
  findUserByUsername,
  insertUser,
  findAllUsers,
} from "../../../utils/db";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import { transport } from "../../../utils/nodemailer/nodemailer";
import { slugUsername } from "../../../utils/user/slug";

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await dbConnect();
  const users = await findAllUsers(db);
  if (users === null) {
    res.json("NO DATA");
  }
  res.json({ users });
});

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
    additionalProperties: true,
  }),
  ...auths,
  async (req, res) => {
    try {
      const db = await dbConnect();

      let { city, email, password, language, OTP, location } = req.body;

      let username = slugUsername(req.body.username);

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
        location: [location[0], location[1]],
        language,
        circle: [],
        friends: [],
        bio: "",
        events: [],
        jobs: [],
        admin: false,
        isVerified: false,
        since: new Date(Date.now()),
      });
      transport.sendMail({
        to: email,
        from: "no-reply@devshed.com",
        subject: "Welcome to DevShed .",
        html: `
          <div>
            <p>Hello, ${username}</p>
            <p>Your otp number ${OTP}.</p>
          </div>
          `,
      });
      req.logIn(user, (err) => {
        if (err) console.error(err);
        res.status(201).json({
          user,
          OTP,
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
);

export default handler;
