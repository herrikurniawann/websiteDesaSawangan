import React from "react";

function InfoCard({ title, children }) {
  return (
    <div className="info-card">
      <h3 className="card-title">{title}</h3>
      <p className="mb-0">{children}</p>
    </div>
  );
}

export default InfoCard;