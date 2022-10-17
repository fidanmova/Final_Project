import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { findUserForAuth, findUserWithEmailAndPassword } from "../db";
import { dbConnect } from "../mongo/mongodb";

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
    dbConnect().then((db) => {
        findUserForAuth(db, id).then(
            (user) => {
                console.log(user);
                done(null, user);
            },
            (err) => done(err)
        );
    });
});

passport.use(
    new LocalStrategy(
        { usernameField: "email", passReqToCallback: true },
        async (req, email, password, done) => {
            const db = await dbConnect();
            const user = await findUserWithEmailAndPassword(
                db,
                email,
                password
            );
            console.log("PASSPORT user", user);
            if (user) done(null, user);
            else
                done(null, false, {
                    message: "Email or password is incorrect",
                });
        }
    )
);

export default passport;
