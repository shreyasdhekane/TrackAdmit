// convex/documents.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const getByUserId = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user) {
      throw new Error("User not found");
    }
    if (user._id !== args.userId) {
      throw new Error("Not authorized to view these documents");
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();
  },
});

export const createDocument = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    type: v.string(),
    status: v.string(),
    fileUrl: v.optional(v.string()),
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
      throw new Error("Not authorized to create documents for this user");
    }

    return await ctx.db.insert("documents", {
      ...args,
    });
  },
});

export const updateDocument = mutation({
  args: {
    id: v.id("documents"),
    title: v.string(),
    type: v.string(),
    status: v.string(),
    fileUrl: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user._id !== document.userId) {
      throw new Error("Not authorized to update this document");
    }

    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
  },
});

export const removeDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const document = await ctx.db.get(args.id);
    if (!document) {
      throw new Error("Document not found");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();

    if (!user || user._id !== document.userId) {
      throw new Error("Not authorized to delete this document");
    }

    await ctx.db.delete(args.id);
  },
});
