// convex/hukumTua.js
import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const saveHukumTua = mutation({
  args: {
    name: v.string(),
    storageId: v.id("_storage"),
    isPrevious: v.boolean(), // true = terdahulu
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("hukumTua", {
      name: args.name,
      storageId: args.storageId,
      isPrevious: args.isPrevious,
      uploadedAt: Date.now(),
    });
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
