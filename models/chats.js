// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const chatsSchema = new Schema(
//   {
//     chatName: { type: String },
//     isGroupChat: { type: Boolean, default: false },

//     users: [
//       {
//         type: "string",
//       },
//     ],
//     messages: [
//       {
//         content: { type: "string", required: true },
//         sender: { type: "string", required: true },
//         receiver: {
//           type: "string",
//           required: true,
//         },
//         date: { type: Date },
//       },
//     ],
//     latestMessage: {
//       type: "string",
//     },
//   },
//   { collection: "chats" }
// );

// const ChatModel = mongoose.model("chats", chatsSchema);

// export default ChatModel;

export const ValidateProps = {
  // user
  user: {
    username: {
      type: "string",
    },

    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    city: {
      type: "string",
    },
    circle: {
      type: "array",
    },
    admin: {
      type: "boolean",
    },
    language: {
      type: "string",
    },
    bio: {
      type: "string",
    },
    avatar: {
      type: "string",
    },
    events: {
      type: "array",
    },
    jobs: {
      type: "array",
    },
    isVerified: { type: "boolean" || "string" },
  },
  required: ["username", "email", "city", "password"],

  // chat
  chats: {
    user: {
      id: {
        $ref: "user",
      },
    },
    chats: {
      chatName: {
        type: "string",
      },
      isGroupChat: {
        type: "boolean",
        default: false,
      },
      users: {
        type: "object",
        minLength: 2,
        properties: {
          type: "object",
          properties: {
            id: {
              $ref: "user",
            },
          },
          required: ["id"],
        },
        required: ["chatName"],
      },
      messages: {
        type: "object",
        properties: {
          type: "object",
          properties: {
            content: {
              type: "string",
            },
            sender: {
              id: {
                $ref: "user",
              },
            },
            required: ["id"],
            receiver: {
              type: "object",
              properties: {
                type: "object",
                properties: {
                  id: {
                    $ref: "chats.chats.users",
                  },
                },
                required: ["id"],
              },
            },
            date: { type: "string" },
            required: ["id"],
          },
          required: ["content", "sender", "receiver"],
        },
      },
      latestMessage: {
        type: "string",
      },
    },
  },
};

// #####################

// import mongoose from "mongoose";
// const Schema = mongoose.Schema;

// const chatsSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User" },
//     chats: {
//       chatName: { type: String },
//       isGroupChat: { type: Boolean, default: false },

//       users: [
//         {
//           type: "string",
//         },
//       ],
//       messages: [
//         {
//           content: { type: "string", required: true },
//           sender: { type: "string", required: true },
//           receiver: {
//             type: "string",
//             required: true,
//           },
//           date: { type: Date },
//         },
//       ],
//       latestMessage: {
//         type: "string",
//       },
//     },
//   },
//   { collection: "chats" }
// );

// const ChatModel = mongoose.model("Chats", chatsSchema);

// export default ChatModel;
