import React from "react";

function Footer() {
  return (
    <footer 
      className="bg-dark text-white py-4"
      id="scrollspyHeading5"
    >
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src="/assets/logoMinahasaIcon.png"
                alt="logoMinahasa"
                height="50"
                style={{ width: 'auto' }}
              />
              <div className="d-flex flex-column" style={{ lineHeight: "1.1" }}>
                <span className="fw-bold fs-4 mb-0">Desa</span>
                <span className="fw-bold fs-4 mt-0">Sawangan</span>
              </div>
            </div>
            <p>Kec. Tombulu, Kabupaten Minahasa<br />Sulawesi Utara, Indonesia</p>
          </div>
          
          <div className="col-12 col-md-4 mb-4 mb-md-0">
            <h5 className="mb-3">Menu</h5>
            <ul className="list-unstyled">
              <li><a href="#scrollspyHeading1" className="text-white text-decoration-none">Home</a></li>
              <li><a href="#scrollspyHeading2" className="text-white text-decoration-none">Profile</a></li>
              <li><a href="#scrollspyHeading3" className="text-white text-decoration-none">Hukum Tua</a></li>
              <li><a href="#scrollspyHeading4" className="text-white text-decoration-none">Maps</a></li>
            </ul>
          </div>
          
          <div className="col-12 col-md-4">
            <h5 className="mb-3">Kontak</h5>
            <p>Email: desaa5963@gmail.com<br />Telepon: (0431) 123456</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-white fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-white fs-5"><i className="bi bi-twitter"></i></a>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-top text-center">
          <p className="mb-0">&copy; {new Date().getFullYear()} Desa Sawangan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;