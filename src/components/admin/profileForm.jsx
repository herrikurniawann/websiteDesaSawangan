import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";

function ProfileForm() {
  const menuItems = [
    {label: "Data", path: "/data"},
    {label: "Galeri", path: "/galeriForm"},
    {label: "Profile", path: "/profileForm"},
    {label: "logout", path: "/logout", type: "none"},
  ];

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className='admin-content py-5'>
        <h1>Profile Form</h1>
      </div>
      <Footer />
    </>
  );
}

export default ProfileForm;
