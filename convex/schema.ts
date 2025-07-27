import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    username: v.string(),
    createdAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_username", ["username"]),

  universities: defineTable({
    userId: v.string(),
    name: v.string(),
    slug: v.string(),
    program: v.string(),
    country: v.string(),
    city: v.string(),
    deadline: v.number(),
    status: v.string(),
    tier: v.string(),
    fee: v.string(),
    rank: v.string(),
    notes: v.optional(v.string()),
    universityUrl: v.optional(v.string()),
    testsRequired: v.optional(v.array(v.string())),
    documentsRequired: v.optional(v.array(v.string())),
    submitted: v.optional(v.boolean()),
    result: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_slug", ["slug"]),

  documents: defineTable({
    userId: v.string(),
    title: v.string(),
    type: v.string(),
    status: v.string(),
    fileUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),
});
