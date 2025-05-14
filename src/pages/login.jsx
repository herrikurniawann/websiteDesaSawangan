import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [formType, setFormType] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const MySwal = Swal;
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


  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    MySwal.fire({
      title: "Berhasil",
      text: "Email berhasil dikirim!",
      icon: "success"
    });
    navigate("/adminContentOne");
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    alert(`Password berhasil diubah dari ${oldPassword} ke ${newPassword}`);
    
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
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
                  <label className="form-label fw-semibold">
                    Password Lama
                  </label>
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
                  <label className="form-label fw-semibold">
                    Password Baru
                  </label>
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
        </div>
      </div>
    </>
  );
}

export default Login;
