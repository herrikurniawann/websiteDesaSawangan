import React, { useState, useEffect } from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import BeritaCard from "@components/cards/beritaCard";

function Berita() {
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

  const [loading, setLoading] = useState(true);
  const beritaData = useQuery(api.berita.listBerita);

  function truncateWords(text, wordLimit) {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }

  useEffect(() => {
    if (beritaData !== undefined) {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, [beritaData]);

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="container py-5 mt-5" style={{ height: "100%" }}>
        <h1 className="text-center my-4 fw-bold">Berita Desa</h1>
        <p className="text-center">
          Informasi terbaru tentang apa yang terjadi, berita terkini, dan
          artikel jurnalistik dari Desa Sawangan bisa Anda temukan di sini.{" "}
        </p>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Memuat data berita...</p>
          </div>
        ) : (
          <div className="row">
            {beritaData?.map((item) => (
              <BeritaCard
                key={item._id}
                id={item._id}
                title={item.title}
                description={truncateWords(item.description, 10)}
                storageId={item.storageId}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Berita;
