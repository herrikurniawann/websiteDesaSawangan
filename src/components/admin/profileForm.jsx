import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";

function ProfileForm() {
  const menuItems = [
    { label: "Data", path: "/data" },
    { label: "Galeri", path: "/galeriForm" },
    { label: "Profile", path: "/profileForm" },
    { label: "logout", path: "/logout", type: "none" },
  ];

  return (
    <>
      <Navbar menuItems={menuItems} />
      <h1>Profile Form</h1>
      <Footer />
    </>
  );
}

export default ProfileForm;
