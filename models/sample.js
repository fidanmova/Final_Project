import mongoose from "mongoose";

const sampleSchema = mongooseSchema({
    name: String,
    email: String,
    movie_id: ObjectId,
    text: String,
    data: Date,
});

export const sampleModel = mongoose.model("sample", sampleSchema);
