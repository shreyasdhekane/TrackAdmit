// universities.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { nanoid } from "nanoid";

export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get the current user from the database using clerkId
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }
    if (user.clerkId !== identity.subject) {
      throw new Error("Not authorized to view these universities");
    }
    return await ctx.db
      .query("universities")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const createUniversity = mutation({
  args: {
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
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user._id !== args.userId) {
      throw new Error("Not authorized to create universities for this user");
    }

    // 🔒 Limit check: max 8 universities per user
    const existingUniversities = await ctx.db
      .query("universities")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    if (existingUniversities.length >= 8) {
      throw new Error("You can only add up to 8 universities.");
    }

    const base = args.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "");
    const slug = `${base}-${nanoid(6)}`;

    return await ctx.db.insert("universities", {
      ...args,
      slug,
    });
  },
});

export const updateUniversity = mutation({
  args: {
    id: v.id("universities"),
    name: v.string(),
    program: v.string(),
    country: v.string(),
    city: v.string(),
    deadline: v.number(),
    status: v.string(),
    tier: v.string(),
    fee: v.string(),
    rank: v.string(),
    notes: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const university = await ctx.db.get(args.id);
    if (!university) {
      throw new Error("University not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user._id !== university.userId) {
      throw new Error("Not authorized to update this university");
    }
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const removeUniversity = mutation({
  args: { id: v.id("universities") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const university = await ctx.db.get(args.id);
    if (!university) {
      throw new Error("University not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user._id !== university.userId) {
      throw new Error("Not authorized to delete this university");
    }

    await ctx.db.delete(args.id);
  },
});

export const getUniversityBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get the logged-in user by Clerk ID
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Get university by slug
    const university = await ctx.db
      .query("universities")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();

    if (!university) {
      throw new Error("University not found");
    }

    // 🔐 Check if this user created the university
    if (university.userId !== user._id) {
      throw new Error("Not authorized to access this university");
    }

    return { university };
  },
});

export const updateUniversityFields = mutation({
  args: {
    id: v.id("universities"),
    name: v.optional(v.string()),
    program: v.optional(v.string()),
    country: v.optional(v.string()),
    city: v.optional(v.string()),
    deadline: v.optional(v.number()),
    status: v.optional(v.string()),
    tier: v.optional(v.string()),
    fee: v.optional(v.string()),
    rank: v.optional(v.string()),
    notes: v.optional(v.string()),
    universityUrl: v.optional(v.string()),
    testsRequired: v.optional(v.array(v.string())),
    documentsRequired: v.optional(v.array(v.string())),
    submitted: v.optional(v.boolean()),
    result: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const university = await ctx.db.get(args.id);
    if (!university) {
      throw new Error("University not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user._id !== university.userId) {
      throw new Error("Not authorized to update this university");
    }

    // Create update object with only provided fields
    const updates: Record<string, any> = {};
    for (const [key, value] of Object.entries(args)) {
      if (key !== "id" && value !== undefined) {
        updates[key] = value;
      }
    }

    await ctx.db.patch(args.id, updates);
  },
});
