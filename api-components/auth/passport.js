import passport from "passport";
import { Strategy } from "passport-local";
import dbConnect from "../../utils/mongo";

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
    dbConnect().then((db) => {
        findUserForAuth(db, id).then(
            (user) => done(null, user),
            (err) => done(err)
        );
    });
});

passport.use(
    new Strategy(
        { usernameField: "email", passReqToCallback: true },
        async (req, email, password, done) => {
            const database = await dbConnect();
            const user = await database.findUserWithEmailAndPassword(
                database,
                email,
                password
            );
            if (user) done(null, user);
            else
                done(null, false, {
                    message: "User not found. Please try again.",
                });
        }
    )
);

export default passport;
