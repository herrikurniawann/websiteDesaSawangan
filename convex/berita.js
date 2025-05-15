import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const saveBerita = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("berita", {
      ...args,
      uploadedAt: Date.now(),
    });
  },
});

export const listBerita = query(async (ctx) => {
  return await ctx.db.query("berita").order("desc").collect();
});

export const getFileUrl = query({
  args: {storageId: v.id("_storage")},
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

export const deleteBerita = mutation({
  args: {id: v.id("berita")}, // Ensure the table name matches your database
  handler: async (ctx, {id}) => {
    await ctx.db.delete(id); // Deletes the item with the given ID
  },
});
