import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// 🔍 Ambil user berdasarkan email
export const getUserByEmail = query({
  args: {
    email: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// 🔍 Ambil user berdasarkan ID
export const getUserById = query({
  args: {
    userId: v.id("users")
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// ➕ Tambahkan user baru
export const insertUser = mutation({
  args: {
    email: v.string(),
    passwordHash: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      email: args.email,
      passwordHash: args.passwordHash,
      // Note: We're removing the role field here as it's not in your schema
    });
  },
});

// ✏️ Perbarui password
export const updatePassword = mutation({
  args: {
    userId: v.id("users"),
    newPasswordHash: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      passwordHash: args.newPasswordHash,
    });
  },
});

// Get all users (optional helper function)
export const getAllUsers = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});