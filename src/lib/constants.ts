export const FREE_DAILY_LIMIT = Number(process.env.FREE_DAILY_MESSAGE_LIMIT) || 20;

export const PLANS = {
    free: {
        name: "Free",
        price: 0,
        dailyMessages: FREE_DAILY_LIMIT,
        features: [
            `${FREE_DAILY_LIMIT} messages per day`,
            "Access to base AI model",
            "Conversation history (7 days)",
            "Standard response speed",
        ],
    },
    pro: {
        name: "Pro",
        price: 12,
        dailyMessages: Infinity,
        features: [
            "Unlimited messages",
            "Access to advanced AI models",
            "Unlimited conversation history",
            "Priority response speed",
            "File uploads (coming soon)",
        ],
    },
} as const;

export type PlanKey = keyof typeof PLANS;
