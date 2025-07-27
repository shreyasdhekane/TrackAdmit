// user.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addUserIfNotExists = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    username: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    try {
      const existingUser = await ctx.db
        .query("users")
        .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
        .first();

      if (existingUser) {
        return existingUser; // Return entire user object
      }

      const newUserId = await ctx.db.insert("users", {
        clerkId: args.clerkId,
        email: args.email,
        username: args.username,
        createdAt: args.createdAt,
      });

      return await ctx.db.get(newUserId); // Return new user object
    } catch (error) {
      console.error("Error in addUserIfNotExists:", error);
      throw error;
    }
  },
});

export const getCurrentUser = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});
