export const ValidateProps = {
<<<<<<< HEAD
  // user
  user: {
    username: {
      type: "string",
    },
=======
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
        location: [],
        circle: [],
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
        isVerified: { type: Boolean || "string" },
    },
    required: ["username", "email", "password"],
>>>>>>> naty-circle-geolocation

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
<<<<<<< HEAD
      type: "array",
    },
    jobs: {
      type: "array",
    },
    isVerified: { type: "boolean" || "string" },
  },
  required: ["username", "email", "city", "password"],

  // chat

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
=======
        event_title: {
            type: "string",
        },
        when: {
            type: "string",
        },
        location: {
            type: "string",
        },

        created_at: Date,
>>>>>>> naty-circle-geolocation
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
