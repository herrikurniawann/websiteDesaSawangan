import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    navigate("/login");
  };
  
  const menuItems = [
    { label: "Data", path: "/data" },
    { label: "Galeri", path: "/galeriForm" },
    { label: "Profile", path: "/profileForm" },
    { label: "gantiPW", path: "/gantiPW" },
    { label: "Logout", type: "button", onClick: handleLogout },
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
