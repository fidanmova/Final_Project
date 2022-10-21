import nc from "next-connect";
import { ncOpts } from "../../utils/nc";
import auths from "../../middlewares/auth";
import passport from "../../utils/auth/passport";

const handler = nc(ncOpts);

handler.use(...auths);

//Login
handler.post(passport.authenticate("local"), (req, res) => {
    console.log('LOGIN USER DATA', req, req.user)
    res.json({ user: req.user });
});

//Log out
handler.delete(async (req, res) => {
    await req.session.destroy();
    res.status(204).end();
});

export default handler;
