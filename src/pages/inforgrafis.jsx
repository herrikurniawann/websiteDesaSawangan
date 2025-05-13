import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Infografis() {
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
      { label: "Masuk Admin", path: "/login" }
    ]
  }
];

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="container py-5 mt-5">
        <h1 className="text-center my-4">Infografis Desa</h1>
        <div className="row">
          <div className="col-12">
            <p>Halaman infografis desa sedang dalam pengembangan.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Infografis;