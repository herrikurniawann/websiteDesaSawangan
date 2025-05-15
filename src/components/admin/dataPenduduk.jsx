import React, { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import { useMutation, useQuery } from "convex/react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../convex/_generated/api";

function Dashboard() {
  const [loading, setLoading] = useState(Array(6).fill(false));
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
    { label: "Logout", type: "button", onClick: handleLogout },,
  ];

  const allResidents = useQuery(api.resident.getResidents) || [];
  const saveResident = useMutation(api.resident.saveResident);
  const deleteResident = useMutation(api.resident.deleteResident);

  const initialAnggotaData = Array(6)
    .fill()
    .map(() => []);
  const [anggotaKeluarga, setAnggotaKeluarga] = useState(initialAnggotaData);

  const [formData, setFormData] = useState(
    Array(6).fill({
      nama: "",
      nik: "",
      pekerjaan: "",
      jenisKelamin: "L",
      kepalaKeluarga: "false",
    })
  );

  const handleFormChange = (index, field, value) => {
    const updated = [...formData];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(updated);
  };

  const handleAnggotaChange = (lorongIndex, anggotaIndex, field, value) => {
    const updated = [...anggotaKeluarga];
    updated[lorongIndex][anggotaIndex][field] = value;
    setAnggotaKeluarga(updated);
  };

  const tambahAnggota = (lorongIndex) => {
    const updated = [...anggotaKeluarga];
    updated[lorongIndex].push({
      nama: "",
      nik: "",
      jenisKelamin: "L",
      pekerjaan: "",
    });
    setAnggotaKeluarga(updated);
  };

  const simpanData = async (index) => {
    const { nama, nik, pekerjaan, jenisKelamin, kepalaKeluarga } =
      formData[index];
    if (!nama || !pekerjaan || !nik) {
      alert("Mohon lengkapi data kepala keluarga.");
      return;
    }

    setLoading((prev) => {
      const updated = [...prev];
      updated[index] = true; // Set loading state for the current lorong
      return updated;
    });

    const newData = [
      {
        name: nama,
        idNumber: nik,
        occupation: pekerjaan,
        gender: jenisKelamin,
        headOfFamily: kepalaKeluarga === "true",
      },
    ];

    if (kepalaKeluarga === "true") {
      anggotaKeluarga[index].forEach((a) => {
        if (a.nama && a.pekerjaan && a.nik) {
          newData.push({
            name: a.nama,
            idNumber: a.nik,
            occupation: a.pekerjaan,
            gender: a.jenisKelamin,
            headOfFamily: false,
          });
        }
      });
    }

    await saveResident({ lorong: index + 1, data: newData });

    const newForm = [...formData];
    newForm[index] = {
      nama: "",
      nik: "",
      pekerjaan: "",
      jenisKelamin: "L",
      kepalaKeluarga: "false",
    };
    setFormData(newForm);

    const resetAnggota = [...anggotaKeluarga];
    resetAnggota[index] = [];
    setAnggotaKeluarga(resetAnggota);

    setLoading((prev) => {
      const updated = [...prev];
      updated[index] = false; // Reset loading state for the current lorong
      return updated;
    });

    alert("Data berhasil disimpan!");
  };

  const groupedByLorong = Array(6)
    .fill()
    .map((_, i) => allResidents.filter((r) => r.lorong === i + 1));

  const hitungStatistik = () => {
    let total = 0,
      kk = 0,
      laki = 0,
      perempuan = 0;

    allResidents.forEach((p) => {
      total++;
      if (p.headOfFamily) kk++;
      if (p.gender === "L") laki++;
      if (p.gender === "P") perempuan++;
    });

    return { total, kk, laki, perempuan };
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      try {
        await deleteResident({ id }); // Call the delete mutation
        alert("Data berhasil dihapus!");
        // Tidak perlu invalidate manual, karena useQuery akan update otomatis
      } catch (error) {
        console.error("Error deleting resident:", error);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  const stats = hitungStatistik();

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="admin-content container py-5">
        <h2 className="mb-4 text-center">Input Data Kependudukan per Lorong</h2>
        <div className="row">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-header">Lorong {index + 1}</div>
                <div className="card-body">
                  <div className="mb-3">
                    <label>NIK</label>
                    <input
                      className="form-control"
                      value={formData[index].nik}
                      onChange={(e) =>
                        handleFormChange(index, "nik", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Nama</label>
                    <input
                      className="form-control"
                      value={formData[index].nama}
                      onChange={(e) =>
                        handleFormChange(index, "nama", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Jenis Kelamin</label>
                    <select
                      className="form-select"
                      value={formData[index].jenisKelamin}
                      onChange={(e) =>
                        handleFormChange(index, "jenisKelamin", e.target.value)
                      }
                    >
                      <option value="L">Laki-laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label>Pekerjaan</label>
                    <input
                      className="form-control"
                      value={formData[index].pekerjaan}
                      onChange={(e) =>
                        handleFormChange(index, "pekerjaan", e.target.value)
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label>Apakah Kepala Keluarga?</label>
                    <select
                      className="form-select"
                      value={formData[index].kepalaKeluarga}
                      onChange={(e) =>
                        handleFormChange(
                          index,
                          "kepalaKeluarga",
                          e.target.value
                        )
                      }
                    >
                      <option value="true">Ya</option>
                      <option value="false">Bukan</option>
                    </select>
                  </div>

                  {formData[index].kepalaKeluarga === "true" && (
                    <div className="bg-light p-3 rounded mb-3">
                      <h5>Anggota Keluarga</h5>
                      {anggotaKeluarga[index].map((a, i) => (
                        <div className="row mb-2" key={i}>
                          <div className="col-md-3">
                            <input
                              className="form-control"
                              placeholder="NIK"
                              value={a.nik}
                              onChange={(e) =>
                                handleAnggotaChange(
                                  index,
                                  i,
                                  "nik",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-3">
                            <input
                              className="form-control"
                              placeholder="Nama"
                              value={a.nama}
                              onChange={(e) =>
                                handleAnggotaChange(
                                  index,
                                  i,
                                  "nama",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="col-md-3">
                            <select
                              className="form-select"
                              value={a.jenisKelamin}
                              onChange={(e) =>
                                handleAnggotaChange(
                                  index,
                                  i,
                                  "jenisKelamin",
                                  e.target.value
                                )
                              }
                            >
                              <option value="L">Laki-laki</option>
                              <option value="P">Perempuan</option>
                            </select>
                          </div>
                          <div className="col-md-3">
                            <input
                              className="form-control"
                              placeholder="Pekerjaan"
                              value={a.pekerjaan}
                              onChange={(e) =>
                                handleAnggotaChange(
                                  index,
                                  i,
                                  "pekerjaan",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => tambahAnggota(index)}
                      >
                        + Tambah Anggota
                      </button>
                    </div>
                  )}

                  <button
                    className="btn btn-primary"
                    onClick={() => simpanData(index)}
                    disabled={loading[index]}
                  >
                    {loading[index] ? "Proses..." : "Simpan Data"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">Statistik</div>
          <div className="card-body">
            <p>
              <strong>Total Penduduk:</strong> {stats.total}
            </p>
            <p>
              <strong>Kepala Keluarga:</strong> {stats.kk}
            </p>
            <p>
              <strong>Laki-laki:</strong> {stats.laki}
            </p>
            <p>
              <strong>Perempuan:</strong> {stats.perempuan}
            </p>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-header">Daftar Penduduk</div>
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>NIK</th>
                  <th>Nama</th>
                  <th>Jenis Kelamin</th>
                  <th>Pekerjaan</th>
                  <th>Kepala Keluarga</th>
                  <th>Lorong</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {groupedByLorong.flat().map((p) => (
                  <tr key={p._id}>
                    <td>{p.nik}</td>
                    <td>{p.nama}</td>
                    <td>
                      {p.jenisKelamin === "L" ? "Laki-laki" : "Perempuan"}
                    </td>
                    <td>{p.pekerjaan}</td>
                    <td>{p.kepalaKeluarga ? "Ya" : "Tidak"}</td>
                    <td>{p.lorong}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(p._id)}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;
