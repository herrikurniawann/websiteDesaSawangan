import React from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { useParams } from "react-router-dom";
import { useQuery } from "convex/react";
import { api } from "/convex/_generated/api";

function DetailBerita() {
  const { id } = useParams();
  const beritaDetail = useQuery(api.berita.getBeritaById, id ? { id } : "skip");
  const fileUrl = useQuery(
    api.berita.getFileUrl,
    beritaDetail?.storageId ? { storageId: beritaDetail.storageId } : "skip"
  );    

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

  if (!beritaDetail) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Memuat berita...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="content container py-5">
        <h1 className="fw-bold mb-4">{beritaDetail.title}</h1>
        {fileUrl && (
          <img
            src={fileUrl}
            alt={beritaDetail.title}
            className="img-fluid mb-4"
            style={{ maxHeight: "400px", objectFit: "cover", width: "100%", borderRadius: "20px" }}
          />
        )}
        <p className="fs-6">{beritaDetail.description}</p>
      </div>
      <Footer />
    </>
  );
}

export default DetailBerita;
