// convex/struktur.js
import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const saveStruktur = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("struktur").first();
    const uploadedAt = Date.now(); // pakai timestamp JS

    if (existing) {
      await ctx.storage.delete(existing.storageId);
      await ctx.db.patch(existing._id, {
        storageId: args.storageId,
        uploadedAt,
      });
    } else {
      await ctx.db.insert("struktur", {
        storageId: args.storageId,
        uploadedAt,
      });
    }
  },
});

export const listStruktur = query(async (ctx) => {
  return await ctx.db.query("struktur").order("desc").collect();
});

export const deleteStruktur = mutation({
  args: {id: v.id("struktur")},
  handler: async (ctx, {id}) => {
    await ctx.db.delete(id);
  },
});

export const getStruktur = query({
  handler: async (ctx) => {
    return await ctx.db.query("struktur").order("desc").first(); // just return one
  },
});
