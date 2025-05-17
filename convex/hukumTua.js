// convex/hukumTua.js
import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const saveHukumTua = mutation({
  args: {
    name: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("hukumTua").first(); // Check if a record already exists
    const uploadedAt = Date.now(); // Use JavaScript timestamp

    if (existing) {
      // Delete the old storage file and update the existing record
      await ctx.storage.delete(existing.storageId);
      await ctx.db.patch(existing._id, {
        name: args.name,
        storageId: args.storageId,
        uploadedAt,
      });
    } else {
      // Insert a new record if none exists
      await ctx.db.insert("hukumTua", {
        name: args.name,
        storageId: args.storageId,
        uploadedAt,
      });
    }
  },
});

export const listHukumTua = query(async (ctx) => {
  return await ctx.db.query("hukumTua").order("desc").collect();
});

export const deleteHukumTua = mutation({
  args: {id: v.id("hukumTua")},
  handler: async (ctx, {id}) => {
    await ctx.db.delete(id);
  },
});

export const getHukumTua = query({
  handler: async (ctx) => {
    return await ctx.db.query("hukumTua").order("desc").collect();
  },
});
