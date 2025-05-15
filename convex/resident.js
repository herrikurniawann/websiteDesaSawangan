import {mutation, query} from "./_generated/server";
import {v} from "convex/values";

export const saveResident = mutation({
  args: {
    lorong: v.number(),
    data: v.array(
      v.object({
        name: v.string(),
        idNumber: v.string(),
        occupation: v.string(),
        gender: v.union(v.literal("L"), v.literal("P")),
        headOfFamily: v.boolean(),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const resident of args.data) {
      await ctx.db.insert("penduduk", {
        lorong: args.lorong,
        nama: resident.name,
        nik: resident.idNumber,
        pekerjaan: resident.occupation,
        jenisKelamin: resident.gender,
        kepalaKeluarga: resident.headOfFamily,
      });
    }
  },
});

export const getResidents = query({
  handler: async (ctx) => {
    return await ctx.db.query("penduduk").collect();
  },
});

export const deleteResident = mutation({
  args: {id: v.id("penduduk")}, // Use the correct table name here
  handler: async (ctx, {id}) => {
    await ctx.db.delete(id);
  },
});
