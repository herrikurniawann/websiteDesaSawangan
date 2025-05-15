import { action } from "./_generated/server";
import { v } from "convex/values";
import bcrypt from "bcryptjs";

// Helper functions for database access
// These are not Convex functions, just regular functions
const checkUserExists = async (ctx, email) => {
  // Create a proper internal query ID for getUserByEmail
  const getUserByEmailId = "users:getUserByEmail";
  return await ctx.runQuery(getUserByEmailId, { email });
};

const createUser = async (ctx, email, passwordHash) => {
  // Create a proper internal mutation ID for insertUser
  const insertUserId = "users:insertUser";
  return await ctx.runMutation(insertUserId, {
    email,
    passwordHash,
    // Note: Removed role parameter as it's not in your schema
  });
};

const updateUserPassword = async (ctx, userId, newPasswordHash) => {
  // Create a proper internal mutation ID for updatePassword
  const updatePasswordId = "users:updatePassword";
  return await ctx.runMutation(updatePasswordId, {
    userId,
    newPasswordHash,
  });
};

// 🔐 Register
export const register = action({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Use the helper function to check if user exists
    const existingUser = await checkUserExists(ctx, args.email);
    
    if (existingUser) throw new Error("Email sudah terdaftar");

    const hash = await bcrypt.hash(args.password, 10);
    
    // Use the helper function to create user
    await createUser(ctx, args.email, hash);

    return { success: true, message: "Berhasil daftar" };
  },
});

// 🔐 Login
export const login = action({
  args: {
    email: v.string(),
    password: v.string()
  },
  handler: async (ctx, args) => {
    // Use the helper function to get user by email
    const user = await checkUserExists(ctx, args.email);

    if (!user) throw new Error("Email tidak ditemukan");

    const match = await bcrypt.compare(args.password, user.passwordHash);
    if (!match) throw new Error("Password salah");

    return {
      success: true,
      userId: user._id,
      email: user.email,
      // Removed role from response as it doesn't exist in your schema
    };
  },
});

// 🔐 Ganti password
export const changePassword = action({
  args: {
    userId: v.id("users"),
    oldPassword: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    // Get user by ID using a proper query
    const getUserById = "users:getUserById";
    const user = await ctx.runQuery(getUserById, { userId: args.userId });
    
    if (!user) throw new Error("User tidak ditemukan");

    const match = await bcrypt.compare(args.oldPassword, user.passwordHash);
    if (!match) throw new Error("Password lama salah");

    const newHash = await bcrypt.hash(args.newPassword, 10);
    
    // Use the helper function to update password
    await updateUserPassword(ctx, args.userId, newHash);

    return { success: true, message: "Password berhasil diubah" };
  },
});