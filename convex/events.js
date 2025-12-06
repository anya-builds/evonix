export const createEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    startDate: v.number(),
    endDate: v.number(),
    timezone: v.string(),
    locationType: v.union(v.literal("physical"), v.literal("online")),
    venue: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.string(),
    state: v.optional(v.string()),
    country: v.string(),
    capacity: v.number(),
    ticketType: v.union(v.literal("free"), v.literal("paid")),
    ticketPrice: v.optional(v.number()),
    coverImage: v.optional(v.string()),
    themeColor: v.optional(v.string()),

    // client-only flag (NOT saved in DB)
    hasPro: v.optional(v.boolean()),
  },

  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.users.getCurrentUser);

    const hasPro = args.hasPro ?? false;

    // 🎯 1. Remove hasPro from args FIRST
    const {
      hasPro: _remove,   // ❌ remove hasPro
      ...cleanArgs       // ✔️ safe args to insert
    } = args;

    // 🎯 2. Validate free user limitations
    const defaultColor = "#1e3a8a";

    if (!hasPro && user.freeEventsCreated >= 1) {
      throw new Error("Free event limit reached. Upgrade to Pro.");
    }

    if (!hasPro && args.themeColor && args.themeColor !== defaultColor) {
      throw new Error("Custom theme colors require Pro.");
    }

    const themeColor = hasPro ? args.themeColor : defaultColor;

    // 🎯 3. Generate slug
    const slug = args.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // 🎯 4. Insert into DB with ONLY allowed fields
    const eventId = await ctx.db.insert("events", {
      ...cleanArgs,           // ✔️ no hasPro included
      themeColor,
      slug: `${slug}-${Date.now()}`,
      organizerId: user._id,
      organizerName: user.name,
      registrationCount: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // 🎯 5. Update free event count
    if (!hasPro) {
      await ctx.db.patch(user._id, {
        freeEventsCreated: user.freeEventsCreated + 1,
      });
    }

    return eventId;
  },
});
