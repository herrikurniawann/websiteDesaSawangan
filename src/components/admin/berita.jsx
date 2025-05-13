import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";

function ProfileAdmin() {
  const menuItems = [
    { label: "Dashboard", path: "/adminContentOne" },
    { label: "Profile", path: "/adminContentTwo" },
    { label: "Settings", path: "/adminContentThree" },
    { label: "logout", path: "/logout", type: "none" },
  ];
  return (
    <>
      <Navbar menuItems={menuItems} />
      <div>
        <h1 className="m-100">Profile</h1>
        <p>This is your profile page.</p>
      </div>
      <Footer />
    </>
  );
}

export default ProfileAdmin;
