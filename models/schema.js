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

  // ######################
  // CHAT components
  // ######################

  chatGroup: {
    users: { type: Array },
  },
  // chat => corresponds to "post"
  chat: {
    content: { type: "string", minLength: 1 },
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

    created_at: Date,
  },
};
