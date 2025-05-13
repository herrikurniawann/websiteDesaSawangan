import React from "react";
import Footer from "../footer";
import Navbar from "../navbar";

function Settings() {
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
        <h1>Settings</h1>
        <p>Manage your settings here.</p>
      </div>
      <Footer />
    </>
  );
}

export default Settings;
