import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

function Infografis() {
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

  const residents = useQuery(api.resident.getResidents) || [];

  const total = residents.length;
  const male = residents.filter((r) => r.jenisKelamin === "L").length;
  const female = residents.filter((r) => r.jenisKelamin === "P").length;
  const heads = residents.filter((r) => r.kepalaKeluarga).length;

  const occupationStats = residents.reduce((acc, r) => {
    acc[r.pekerjaan] = (acc[r.pekerjaan] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <Navbar menuItems={menuItems} />

      <div className="py-5 content">
        <div className="container text-center">
          <h1 className="fw-bold mb-0">Infografis Desa</h1>
          <p className="lead py-2">
            Memberikan informasi lengkap mengenai karakteristik demografi
            penduduk suatu wilayah. Mulai dari jumlah penduduk, jenis kelamin,
            agama, dan aspek penting lainnya yang menggambarkan komposisi
            populasi secara rinci.
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row g-4 justify-content-center">
          <StatCard title="Total Penduduk" value={total} color="#17a2b8" />
          <StatCard title="Laki-laki" value={male} color="#007bff" />
          <StatCard title="Perempuan" value={female} color="#e83e8c" />
          <StatCard title="Kepala Keluarga" value={heads} color="#28a745" />
        </div>

        <div className="mt-5">
          <h4 className="text-center mb-3">Statistik Pekerjaan</h4>
          {Object.keys(occupationStats).length === 0 ? (
            <p className="text-center">Belum ada data pekerjaan.</p>
          ) : (
            <ul className="list-group mb-5">
              {Object.entries(occupationStats).map(([job, count]) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={job}
                >
                  {job}
                  <span className="badge bg-primary rounded-pill">{count}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="col-6 col-sm-6 col-md-3">
      <div
        className="card text-center shadow stat-card h-100"
        style={{ borderBottom: `4px solid ${color}` }}
      >
        <div className="card-body">
          <h6 className="card-title fw-semibold">{title}</h6>
          <h2 className="fw-bold" style={{ color }}>
            {value}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Infografis;
