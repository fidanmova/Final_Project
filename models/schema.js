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
  required: ["username", "email", "city", "password"],

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
        isVerified: { type: "boolean"|| "string" },
    },
  
    required: ["username", "email", "city", "password"],
};
