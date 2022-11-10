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
    location: { type: Array },
    circle: {
      type: Array,
    },
    friends: { type: Array },
    admin: {
      type: Boolean,
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
      type: Array,
    },
    jobs: {
      type: Array,
    },
    code: { type: Array },
    isVerified: { type: Boolean || "string" },
  },

  required: ["username", "email", "password"],

  // ######################
  // CHAT components
  // ######################

  // chat => corresponds to "post"
  chat: {
    // content: { type: "string", minLength: 1 },
    chatName: { type: "string", minLength: 1 },
    users: { type: Array },
  },
  // message => corresponds to "comment"
  message: {
    content: { type: "string", minLength: 1 },
  },
  post: {
    content: { type: "string", minLength: 1 },
  },
  comment: {
    content: { type: "string", minLength: 1 },
  },

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
  },

  // //message
  // message: {
  //     sender: { type: String },
  //     receiver: { type: String },
  //     message: { type: String },
  //     created_at: { type: Date },
  // },
};
