import { nc } from "next-connect";
import { findUserById } from "../../../../utils/db";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { ncOpts } from "../../../../utils/nc";

const handler = nc(ncOpts);
handler.get(async (req, res) => {
    const db = await dbConnect();
    const user = await findUserById(db, req.query.userId);
    res.json({ user });
});
