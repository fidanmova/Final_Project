import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import nc from "next-connect";
import { auths, validateBody } from "../../../middlewares";
import { ValidateProps } from "../../../models/schema";
import { findUserByUsername, updateUserById } from "../../../utils/db";
import { dbConnect } from "../../../utils/mongo/mongodb";
import { ncOpts } from "../../../utils/nc";
import { slugUsername } from "../../../utils/user/slug";

const upload = multer({ dest: "/tmp" });
const handler = nc(ncOpts);

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.use(...auths);

handler.get(async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

handler.patch(
  upload.single("profilePicture"),
  validateBody({
    type: "object",
    properties: {
      username: ValidateProps.user.username,
      language: ValidateProps.user.language,
      bio: ValidateProps.user.bio,
      city: ValidateProps.user.city,
    },
    additionalProperties: true,
  }),
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    const db = await dbConnect();

    let profilePicture;
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: "fill",
      });
      profilePicture = image.secure_url;
    }
    const { language, city, bio } = req.body;

    let username;

    if (req.body.username) {
      username = slugUsername(req.body.username);
      if (
        username !== req.user.username &&
        (await findUserByUsername(db, username))
      ) {
        res.status(403).json({
          error: { message: "The username has already been taken." },
        });
        return;
      }
    }

    const user = await updateUserById(db, req.user._id, {
      ...(username && { username }),
      ...(typeof language === "string" && { language }),
      ...(typeof bio === "string" && { bio }),
      ...(typeof city === "string" && { city }),
      ...(profilePicture && { profilePicture }),
    });

    res.json({ user });
  }
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
