export const ValidateProps = {
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

  chats: {
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

  required: ["username", "email", "city", "password"],
};
