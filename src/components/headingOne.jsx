import React from "react";

function HeadingOne() {
  return (
    <div 
      className="headingOne d-flex justify-content-center align-items-center text-center text-white"
      id="scrollspyHeading1"
    >
      <div className="content-headingOne position-relative w-100 h-100">
        <img
          src="/assets/desaSawangan.jpg"
          alt="desaSawangan"
          className="position-absolute w-100 h-100 z-1 object-fit-cover"
        />
        <div className="overlay position-absolute"></div>
        <div className="headingOne-content position-relative z-3">
          <h1 className="fw-bold">Selamat Datang</h1>
          <h1 className="fw-bold">Website Resmi Desa Sawangan</h1>
          <p className="fw-bold">Sumber informasi tentang pemerintahan di Desa Sawangan</p>
        </div>
      </div>
    </div>
  );
}

export default HeadingOne;