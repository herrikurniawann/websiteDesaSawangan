import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

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

export const deleteGaleri = mutation({
  args: {id: v.id("galeri")},
  handler: async (ctx, {id}) => {
    await ctx.db.delete(id);
  },
});
