import React from "react";

function ProfileHeader() {
  return (
    <header className="header-bg">
      <div className="overlay position-absolute">
        <div className="text-content-profile text-center">
          <h1 className="display-4 fw-bold">PROFILE DESA SAWANGAN</h1>
          <p className="fs">Kecamatan Tombulu, Kabupaten Minahasa</p>
          <p className="fs">Provinsi Sulawesi Utara</p>
        </div>
      </div>
    </header>
  );
}

export default ProfileHeader;