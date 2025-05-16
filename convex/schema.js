import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

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
  users: defineTable({
    email: v.string(),
    passwordHash: v.string(),
  }).index("by_email", ["email"]),
  penduduk: defineTable({
    lorong: v.number(),
    nama: v.string(),
    nik: v.string(),
    pekerjaan: v.string(),
    jenisKelamin: v.union(v.literal("L"), v.literal("P")),
    kepalaKeluarga: v.boolean(),
  }),
  struktur: defineTable({
    storageId: v.id("_storage"),
    uploadedAt: v.number(),
  }),
  hukumTua: defineTable({
    name: v.string(),
    storageId: v.id("_storage"),
    isPrevious: v.boolean(), // 👈 this replaces the need for hukumTuaTerdahulu table
    uploadedAt: v.number(),
  }),
});
