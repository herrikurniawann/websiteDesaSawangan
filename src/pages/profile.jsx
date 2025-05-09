import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Profile() {
  return (
    <>
      <Navbar />
      <div className="container py-5 mt-5">
        <h1 className="text-center my-4">Profil Desa</h1>
        <div className="row">
          <div className="col-12">
            <p>Halaman profil desa sedang dalam pengembangan.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;