import React from "react";
import Navbar from "../components/navbar";
import HeadingOne from "../components/headingOne";
import HeadingTwo from "../components/headingTwo";
import HeadingThree from "../components/headingThree";
import HeadingMaps from "../components/headingMaps";
import Footer from "../components/footer";

function Home() {
  return (
    <>
      <Navbar />
      <HeadingOne />
      <HeadingTwo />
      <HeadingThree />
      <HeadingMaps />
      <Footer />
    </>
  );
}

export default Home;