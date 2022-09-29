export const generateOTP = (opt_length) => {
    //Generate 8 digit OTP token
    let OTP = "";
    for (let i = 0; i <= opt_length; i++) {
        const random = Math.round(Math.random() * 9);
        OTP += random;
    }
    return OTP;
};
