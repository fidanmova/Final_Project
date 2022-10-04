import crypto from "crypto";

//error handling
export const sendError = (res, err, statusCode = 401) => {
    res.status(statusCode).json({ err });
};

// generate strong resetPassword
export const randomByte = () => {
    return new Promise((res, rej) => {
        crypto.randomBytes(30, (err, buff) => {
            if (err) rej(err);
            const buffString = buff.toString("hex");
            console.log("String", String);
            res(buffString);
        });
    });
};
