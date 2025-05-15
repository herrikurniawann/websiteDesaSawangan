import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

function Login() {
  const [formType, setFormType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userId, setUserId] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();
  const MySwal = Swal;

  const login = useAction(api.auth.login);
  const changePassword = useAction(api.auth.changePassword);

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Profile", path: "/profile" },
    {
      label: "Lainnya",
      type: "dropdown",
      children: [
        { label: "Infografis", path: "/infografis" },
        { label: "Berita", path: "/berita" },
        { label: "E-Lapor", path: "/eLapor" },
        { label: "Galeri", path: "/galeri" },
        { label: "Masuk Admin", path: "/login" },
      ],
    },
  ];

  useEffect(() => {
    // Load dari localStorage
    const savedUserId = localStorage.getItem("userId");
    const savedEmail = localStorage.getItem("email");
    if (savedUserId) {
      setUserId(savedUserId);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setEmail("admin@gmail.com"); // default kalau belum login
    }
  }, [formType]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await login({ email, password });
      setUserId(result.userId);

      // Simpan ke localStorage
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("email", email);

      MySwal.fire({
        title: "Berhasil",
        text: "Login berhasil!",
        icon: "success",
      });

      navigate("/data");
    } catch (err) {
      MySwal.fire({
        title: "Gagal",
        text: err.message,
        icon: "error",
      });
    }
  };

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
      setFormType("login");
    } catch (err) {
      MySwal.fire({
        title: "Gagal",
        text: err.message,
        icon: "error",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    setUserId(null);
    setEmail("admin@gmail.com");
    setFormType("login");
    navigate("/login");
  };

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <div
          className="card-login shadow p-4 rounded-4 mx-auto"
          style={{ maxWidth: "100%", width: "80%", height: "50%" }}
        >
          <h2 className="text-center mb-4 fw-bold">
            {formType === "login" ? "Silahkan Masuk" : "Ganti Password"}
          </h2>

          <form
            onSubmit={formType === "login" ? handleLogin : handleChangePassword}
          >
            {formType === "login" && (
              <>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="********"
                  />
                  <div className="form-check mt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="showPassword"
                      checked={showPassword}
                      onChange={() => setShowPassword(!showPassword)}
                    />
                    <label className="form-check-label" htmlFor="showPassword">
                      Lihat Password
                    </label>
                  </div>
                </div>
              </>
            )}

            {formType === "change" && (
              <>
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
                    <label
                      className="form-check-label"
                      htmlFor="showOldPassword"
                    >
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
                    <label
                      className="form-check-label"
                      htmlFor="showNewPassword"
                    >
                      Lihat Password Baru
                    </label>
                  </div>
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn-submit w-100 py-2 mt-3 fw-bold"
            >
              {formType === "login" ? "Login" : "Simpan Password Baru"}
            </button>
          </form>

          <p
            className="text-center mt-4 text-primary"
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "14px",
            }}
            onClick={() =>
              setFormType(formType === "login" ? "change" : "login")
            }
          >
            {formType === "login"
              ? "Lupa password? Ganti di sini"
              : "Kembali ke Login"}
          </p>

          {userId && (
            <div className="text-center mt-2">
              <button className="btn btn-link text-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Login;
