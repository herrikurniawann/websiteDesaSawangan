import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

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

export const deleteBerita = mutation({
  args: {id: v.id("berita")},
  handler: async (ctx, {id}) => {
    await ctx.db.delete(id);
  },
});

export const getBeritaById = query({
  args: {id: v.id("berita")},
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
