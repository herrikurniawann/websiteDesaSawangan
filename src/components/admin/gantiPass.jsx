import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../navbar";
import Swal from "sweetalert2";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useNavigate } from "react-router-dom";

function GantiPass() {
  const [userId, setUserId] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const changePassword = useAction(api.auth.changePassword);
  const MySwal = Swal;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const menuItems = [
    { label: "Data", path: "/data" },
    { label: "Galeri", path: "/galeriForm" },
    { label: "Profile", path: "/profileForm" },
    { label: "gantiPW", path: "/gantiPW" },
    { label: "Logout", type: "button", onClick: handleLogout },
  ];

  useEffect(() => {
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) {
      setUserId(savedUserId);
    }
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!userId) {
      MySwal.fire({
        title: "Gagal",
        text: "Silakan login terlebih dahulu",
        icon: "warning",
      });
      return;
    }

    if (newPassword.length < 6) {
      MySwal.fire({
        title: "Gagal",
        text: "Password baru minimal 6 karakter",
        icon: "warning",
      });
      return;
    }

    try {
      await changePassword({
        userId,
        oldPassword,
        newPassword,
      });

      MySwal.fire({
        title: "Berhasil",
        text: "Password berhasil diganti",
        icon: "success",
      });

      setOldPassword("");
      setNewPassword("");
    } catch (err) {
      MySwal.fire({
        title: "Gagal",
        text: err.message,
        icon: "error",
      });
    }
  };
  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <div
          className="card-login shadow p-4 rounded-4 mx-auto"
          style={{ maxWidth: "100%", width: "80%", height: "50%" }}
        >
          <h2 className="text-center mb-4 fw-bold">Ganti Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password Lama</label>
              <input
                type={showOldPassword ? "text" : "password"}
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="********"
              />
              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showOldPassword"
                  checked={showOldPassword}
                  onChange={() => setShowOldPassword(!showOldPassword)}
                />
                <label className="form-check-label" htmlFor="showOldPassword">
                  Lihat Password Lama
                </label>
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password Baru</label>
              <input
                type={showNewPassword ? "text" : "password"}
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="********"
              />
              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="showNewPassword"
                  checked={showNewPassword}
                  onChange={() => setShowNewPassword(!showNewPassword)}
                />
                <label className="form-check-label" htmlFor="showNewPassword">
                  Lihat Password Baru
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="btn-submit w-100 py-2 mt-3 fw-bold"
            >
              Simpan Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default GantiPass;
