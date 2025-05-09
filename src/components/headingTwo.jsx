import React from "react";

function HeadingTwo() {
  return (
    <div
      className="bg-white py-5"
      style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}
      id="scrollspyHeading2"
    >
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <div className="content-HeadingTwo d-flex flex-column flex-md-row align-items-center">
            <div className="pe-md-4 text-center text-md-start">
              <h1 className="fw-bold mb-4">Mengenal Desa</h1>
              <p>
                Jelajahi berbagai informasi lengkap mengenai Desa melalui
                website ini, yang dirancang untuk memberikan pemahaman
                menyeluruh tentang kehidupan di Desa. Anda dapat menelusuri
                berbagai aspek penting seperti pemerintahan Desa, data dan
                profil penduduk, kondisi demografi, potensi sumber daya lokal,
                serta berita-berita terbaru yang relevan dan aktual bagi
                masyarakat Desa.
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <img
                src="assets/informationAssets.png"
                alt="ilustrasiweb"
                className="information-assets ms-md-3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadingTwo;