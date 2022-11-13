import nc from "next-connect";
import { ncOpts } from "../../../../utils/nc";
import { dbConnect } from "../../../../utils/mongo/mongodb";
import { auths } from "../../../../middlewares";
import { addToCircle, deleteFromCircle } from "../../../../utils/db/user";
const handler = nc(ncOpts);
handler.use(...auths);

handler.post(async (req, res) => {
    //console.log("req", req);
    const db = await dbConnect();
    const { id, circle } = req.body;
    const myc = await addToCircle(db, id, circle);
    //console.log("API circle", circle);
    res.json(myc);
});

handler.delete(async (req, res) => {
    //console.log("req", req);
    const db = await dbConnect();
    const { id, circle } = req.body;
    const myc = await deleteFromCircle(db, id, circle);
    //console.log("API circle", circle);
    res.json(myc);
});
export default handler;
