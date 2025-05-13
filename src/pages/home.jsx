import React from "react";
import Navbar from "../components/navbar";
import HeadingOne from "../components/headingOne";
import HeadingTwo from "../components/headingTwo";
import HeadingThree from "../components/headingThree";
import HeadingMaps from "../components/headingMaps";
import Footer from "../components/footer";

function Home() {
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
        { label: "Masuk Admin", path: "/login" },
      ],
    },
  ];

  return (
    <>
      <Navbar menuItems={menuItems} />
      <HeadingOne />
      <HeadingTwo />
      <HeadingThree />
      <HeadingMaps />
      <Footer />
    </>
  );
}

export default Home;
