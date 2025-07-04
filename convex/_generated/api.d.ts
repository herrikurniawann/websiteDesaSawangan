/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as berita from "../berita.js";
import type * as files from "../files.js";
import type * as galeri from "../galeri.js";
import type * as hukumTua from "../hukumTua.js";
import type * as resident from "../resident.js";
import type * as struktur from "../struktur.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  berita: typeof berita;
  files: typeof files;
  galeri: typeof galeri;
  hukumTua: typeof hukumTua;
  resident: typeof resident;
  struktur: typeof struktur;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
