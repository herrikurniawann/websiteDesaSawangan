import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { Chart } from "react-chartjs-2";
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

  const ageGroups = [
    "0-4", "5-9", "10-14", "15-19", "20-24", "25-29",
    "30-34", "35-39", "40-44", "45-49", "50-54",
    "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85+",
  ];

  const ageGroupStats = ageGroups.map((group) => {
    const [start, end] = group.includes("+") ? [85, Infinity] : group.split("-").map(Number);
    const males = residents.filter(
      (r) => r.jenisKelamin === "L" && r.umur >= start && r.umur <= (end || r.umur)
    ).length;
    const females = residents.filter(
      (r) => r.jenisKelamin === "P" && r.umur >= start && r.umur <= (end || r.umur)
    ).length;
    return { group, males, females };
  });

  const religions = [
    "Islam", "Kristen", "Katolik", "Hindu", "Buddha", "Konghucu", "Kepercayaan lainnya",
  ];

  const religionStats = religions.reduce((acc, religion) => {
    acc[religion] = residents.filter((r) => r.agama === religion).length;
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

        {/* Kelompok Umur */}
        <div className="mt-5">
          <h4 className="text-center mb-4">Berdasarkan Kelompok Umur</h4>
          <Chart
            type="bar"
            data={{
              labels: ageGroups,
              datasets: [
                {
                  label: "Laki-laki",
                  data: ageGroupStats.map((g) => -g.males),
                  backgroundColor: "#007bff",
                },
                {
                  label: "Perempuan",
                  data: ageGroupStats.map((g) => g.females),
                  backgroundColor: "#e83e8c",
                },
              ],
            }}
            options={{
              indexAxis: "y",
              scales: {
                x: {
                  stacked: true,
                  ticks: {
                    callback: function (value) {
                      return Math.abs(value);
                    },
                  },
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        </div>

        {/* Berdasarkan Agama */}
        <div className="mt-5 mb-5">
          <h4 className="text-center mb-4">Berdasarkan Agama</h4>
          <div className="row g-4 justify-content-center">
            {Object.entries(religionStats).map(([religion, count]) => (
              <div key={religion} className="col-6 col-md-3 col-lg-2">
                <div className="card text-center shadow h-100">
                  <div className="card-body">
                    <h6 className="fw-semibold mb-1">{religion}</h6>
                    <h4 className="fw-bold text-primary">{count}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
