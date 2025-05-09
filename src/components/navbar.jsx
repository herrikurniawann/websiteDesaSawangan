import React, { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navbar() {
  useEffect(() => {}, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top px-3">
        <div className="container-fluid d-flex justify-content-around align-items-center">
          <div className="d-flex align-items-center gap-2">
            <img
              src="/assets/logoMinahasa.png"
              alt="logoMinahasa"
              height="50"
            />
            <div className="d-flex flex-column" style={{ lineHeight: "1.1" }}>
              <span className="fw-bold fs-4 mb-0">Desa</span>
              <span className="fw-bold fs-4 mt-0">Sawangan</span>
            </div>
          </div>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <a className="nav-link" href="#scrollspyHeading1">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#scrollspyHeading2">
                Profile
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                MenuLain
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#scrollspyHeading3">
                    Third
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#scrollspyHeading4">
                    Fourth
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#scrollspyHeading5">
                    Fifth
                  </a>
                </li>
              </ul>
            </li>
          </ul>
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
