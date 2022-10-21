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

    events: {
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
    },
};
