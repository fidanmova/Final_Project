import mongoose from "mongoose";
const CONNECTION_URL = process.env.CONNECTION_URL;
console.log("CONNECTION", CONNECTION);

const connect = async () => {
    mongoose.connect(CONNECTION_URL);
};

export default connect;
