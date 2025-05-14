import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Galeri() {
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

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Galeri</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p className="text-center">Berisi foto-foto kegiatan di desa</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Galeri;
