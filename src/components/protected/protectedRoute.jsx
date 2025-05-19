import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Komponen untuk rute yang hanya bisa diakses admin
export const ProtectedAdminRoute = () => {
  const isAuthenticated = localStorage.getItem("userId") !== null;
  const location = useLocation();

  // Jika tidak terautentikasi, redirect ke halaman login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Jika sudah terautentikasi, tampilkan komponen anak
  return <Outlet />;
};

// Komponen untuk rute publik yang diakses oleh semua orang
export const PublicRoute = () => {
  const isAuthenticated = localStorage.getItem("userId") !== null;
  
  // Jika admin sudah login, redirect ke halaman admin
  if (isAuthenticated) {
    return <Navigate to="/data" replace />;
  }
  
  // Jika bukan admin/user tidak login, tampilkan komponen publik
  return <Outlet />;
};

// Komponen khusus untuk halaman login
export const LoginRoute = () => {
  const isAuthenticated = localStorage.getItem("userId") !== null;
  
  // Jika sudah login, redirect ke dashboard admin
  if (isAuthenticated) {
    return <Navigate to="/data" replace />;
  }
  
  // Jika belum login, tampilkan halaman login
  return <Outlet />;
};