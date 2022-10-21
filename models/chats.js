import mongoose from "mongoose";
const Schema = mongoose.Schema;

const chatsSchema = new Schema(
  {
    chatName: { type: String },
    isGroupChat: { type: Boolean, default: false },

    users: [
      {
        type: "string",
      },
    ],
    messages: [
      {
        content: { type: "string", required: true },
        sender: { type: "string", required: true },
        receiver: {
          type: "string",
          required: true,
        },
        date: { type: Date },
      },
    ],
    latestMessage: {
      type: "string",
    },
  },
  { collection: "chats" }
);

const ChatModel = mongoose.model("chats", chatsSchema);

export default ChatModel;
