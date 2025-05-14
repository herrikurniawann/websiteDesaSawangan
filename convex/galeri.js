import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const saveGaleri = mutation({
  args: {
    title: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("galeri", {
      ...args,
      uploadedAt: Date.now(),
    });
  },
});

export const listGaleri = query(async (ctx) => {
  return await ctx.db.query("galeri").order("desc").collect();
});

export const getFileUrl = query({
  args: {storageId: v.id("_storage")},
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
