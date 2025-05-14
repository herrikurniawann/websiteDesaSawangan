import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  berita: defineTable({
    title: v.string(),
    description: v.string(),
    storageId: v.id("_storage"),
    uploadedAt: v.number(),
  }),
  galeri: defineTable({
    title: v.string(),
    storageId: v.id("_storage"),
    uploadedAt: v.number(),
  }),
});
