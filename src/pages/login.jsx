import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar.jsx";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

function Login() {
  const [userId, setUserId] = useState(null)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate(); 
  const MySwal = Swal;

  const login = useAction(api.auth.login);

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
    const savedUserId = localStorage.getItem("userId");
    const savedEmail = localStorage.getItem("email");
    if (savedUserId) {
      setUserId(savedUserId);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    } else {
      setEmail("admin@gmail.com");
    }
  }, []);

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

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
        <div
          className="card-login shadow p-4 rounded-4 mx-auto"
          style={{ maxWidth: "100%", width: "80%", height: "50%" }}
        >
          <h2 className="text-center mb-4 fw-bold">
            login
          </h2>

          <form
            onSubmit= {handleLogin }
          >
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
            <button
              type="submit"
              className="btn-submit w-100 py-2 mt-3 fw-bold"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
