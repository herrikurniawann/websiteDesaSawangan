import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Komponen wrapper untuk halaman admin
const withAdminAuth = (Component) => {
  return function ProtectedComponent(props) {
    const navigate = useNavigate();

    useEffect(() => {
      // Cek apakah user sudah login
      const userId = localStorage.getItem("userId");
      if (!userId) {
        // Jika belum login, arahkan ke halaman login
        navigate("/login", { replace: true });
      }
    }, [navigate]);

    // Fungsi logout
    const handleLogout = () => {
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      navigate("/login", { replace: true });
    };

    return (
      <div className="admin-layout">
        <div className="admin-header">
          <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
        <Component {...props} />
      </div>
    );
  };
};

export default withAdminAuth;