import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ProfileHeader from "../components/profile/profileHeader";
import ProfileTabs from "../components/profile/profileTabs";
import BerandaTab from "../components/profile/berandaTabs";
import SejarahTab from "../components/profile/sejarahTabs";
import WilayahTab from "../components/profile/wilayahTabs";
import OrganisasiTab from "../components/profile/organisasiTabs";

function Profile() {
  const [activeTab, setActiveTab] = useState("beranda");

  const menuItems = [
    { label: "Home", path: "/" },
    { label: "Profile", path: "/profile" },
    {
      label: "Lainnya",
      type: "dropdown",
      children: [
        { label: "Infografis", path: "/infografis" },
        { label: "Berita", path: "/berita" },
        { label: "E-Lapor", path: "/eLapor" },
        { label: "Galeri", path: "/galeri" },
        { label: "Masuk Admin", path: "/login" },
      ],
    },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "beranda":
        return <BerandaTab />;
      case "sejarah":
        return <SejarahTab />;
      case "wilayah":
        return <WilayahTab />;
      case "organisasi":
        return <OrganisasiTab />;
      default:
        return <BerandaTab />;
    }
  };

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="container-fluid p-0">
        <ProfileHeader />
        <ProfileTabs activeTab={activeTab} handleTabChange={handleTabChange} />
        <div className="tab-content py-4">{renderTabContent()}</div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
