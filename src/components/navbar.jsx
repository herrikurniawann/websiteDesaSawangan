import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {}, []);
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top px-3">
        <div className="container-fluid">
          <div className="d-flex align-items-center gap-2">
            <img
              src="/assets/logoMinahasa.png"
              alt="logoMinahasa"
              height="50"
              style={{ width: 'auto' }}
            />
            <div className="d-flex flex-column" style={{ lineHeight: "1.1" }}>
              <span className="fw-bold fs-4 mb-0">Desa</span>
              <span className="fw-bold fs-4 mt-0">Sawangan</span>
            </div>
          </div>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/")}>
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => navigate("/profile")}>
                  Profile
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  MenuLain
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" onClick={() => navigate("/infografis")}>
                      Infografis
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => navigate("/berita")}>
                      Berita
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => navigate("/eLapor")}>
                      E-Lapor
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => navigate("/login")}>
                      Masuk Admin
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-root-margin="0px 0px -40%"
        data-bs-smooth-scroll="true"
        className="scrollspy-example bg-body-tertiary p-3 rounded-2"
        tabIndex="0"
      ></div>
    </>
  );
}

export default Navbar;