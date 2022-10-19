import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventsSchema = new Schema(
  {
    event_title: {
      type: String,
    },
    when: {
      type: String,
    },
    location: {
      type: String,
    },

    created_at: Date,
  },

  // ## Specifies What Collection Schema is for ##
  { collection: "berlin_nov_2022" }
);

const Events = mongoose.model("Events", eventsSchema);

export default Events;
