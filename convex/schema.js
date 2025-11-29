import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // Users table
  users: defineTable({
    // Clerk auth
    name: v.string(),
    tokenIdentifier: v.string(), // Clerk user ID for auth
     email: v.string(),
    imageUrl: v.optional(v.string()),

        // Onboarding
    hasCompletedOnboarding: v.boolean(),

    // Attendee preferences (from onboarding)
    location: v.optional(
      v.object({
        city: v.string(),
        state: v.optional(v.string()), // Added state field
        country: v.string(),
      })
    ),
  })
});