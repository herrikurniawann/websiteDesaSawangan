import React from "react";

function ProfileTabs({ activeTab, handleTabChange }) {
  const tabs = [
    { id: "beranda", label: "Beranda" },
    { id: "sejarah", label: "Sejarah" },
    { id: "wilayah", label: "Wilayah" },
    { id: "organisasi", label: "Organisasi" }
  ];

  return (
    <div className="bg-white shadow-sm">
      <div className="container">
        <ul className="nav nav-pills nav-fill p-2">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <button
                onClick={() => handleTabChange(tab.id)}
                className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProfileTabs;