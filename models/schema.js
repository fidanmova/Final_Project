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
  chat: {
    chatName: { type: "string" },
    // isGroupChat: { type: "boolean", default: false },

    users: {
      type: "string",
    },
    messages: {
      content: { type: "string" },
      sender: { type: "string" },
      receiver: {
        type: "string",
      },

      // type: "array",
      // items: messageSchema,

      // date: { type: Date },
    },
    // latestMessage: {
    //   type: "string",
    // },
  },
  // required: ["chatName", "sender", "receiver"],

  // events
  events: {
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

  chat: {
    chatName: {},
  },
};
