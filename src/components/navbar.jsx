import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navbar({ menuItems = [] }) {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  
  const handleNavigate = (path) => {
    navigate(path);
    setIsCollapsed(true);
  };

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
            aria-expanded={!isCollapsed}
            aria-label="Toggle navigation"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse justify-content-end ${isCollapsed ? '' : 'show'}`} id="navbarNav">
            <ul className="nav nav-pills">
              {menuItems.map((item, index) =>
                item.type === "dropdown" ? (
                  <li className="nav-item dropdown" key={index}>
                    <a
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {item.label}
                    </a>
                    <ul className="dropdown-menu">
                      {item.children.map((child, cIdx) => (
                        <li key={cIdx}>
                          <a className="dropdown-item" onClick={() => handleNavigate(child.path)}>
                            {child.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item" key={index}>
                    <a className="nav-link" onClick={() => handleNavigate(item.path)}>
                      {item.label}
                    </a>
                  </li>
                )
              )}
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
