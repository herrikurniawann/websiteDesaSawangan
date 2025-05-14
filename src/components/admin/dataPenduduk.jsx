import React, { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

function Dashboard() {
  const menuItems = [
    { label: "Data", path: "/data" },
    { label: "Galeri", path: "/galeriForm" },
    { label: "Profile", path: "/profileForm" },
    { label: "logout", path: "/logout", type: "none" },
  ];

  const initialLorongData = Array(6).fill().map(() => []);
  const initialAnggotaData = Array(6).fill().map(() => []);

  const [dataPenduduk, setDataPenduduk] = useState(initialLorongData);
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
    updated[lorongIndex].push({ nama: "", nik: "", jenisKelamin: "L", pekerjaan: "" });
    setAnggotaKeluarga(updated);
  };

  const simpanData = (index) => {
    const { nama, nik, pekerjaan, jenisKelamin, kepalaKeluarga } = formData[index];
    if (!nama || !pekerjaan || !nik) {
      alert("Mohon lengkapi data kepala keluarga.");
      return;
    }

    const newData = [
      {
        nama,
        nik,
        pekerjaan,
        jenisKelamin,
        kepalaKeluarga: kepalaKeluarga === "true",
      },
    ];

    if (kepalaKeluarga === "true") {
      anggotaKeluarga[index].forEach((a) => {
        if (a.nama && a.pekerjaan && a.nik) {
          newData.push({ ...a, kepalaKeluarga: false });
        }
      });
    }

    const updated = [...dataPenduduk];
    updated[index] = [...updated[index], ...newData];
    setDataPenduduk(updated);

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

    alert("Data berhasil disimpan!");
  };

  const hitungStatistik = () => {
    let total = 0,
      kk = 0,
      laki = 0,
      perempuan = 0;
    dataPenduduk.forEach((lorong) => {
      lorong.forEach((p) => {
        total++;
        if (p.kepalaKeluarga) kk++;
        if (p.jenisKelamin === "L") laki++;
        if (p.jenisKelamin === "P") perempuan++;
      });
    });
    return { total, kk, laki, perempuan };
  };

  const stats = hitungStatistik();
  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="container-fom py-4">
        <h2 className="mb-4 text-center">Input Data Kependudukan per Lorong</h2>
        <div className="row">
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <div className="card h-100">
                <div className="card-header">Lorong {index + 1}</div>
                <div className="card-body">
                  <div className="mb-3">
                    <label>NIK Kepala Keluarga</label>
                    <input
                      className="form-control"
                      value={formData[index].nik}
                      onChange={(e) => handleFormChange(index, "nik", e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Nama Kepala Keluarga</label>
                    <input
                      className="form-control"
                      value={formData[index].nama}
                      onChange={(e) => handleFormChange(index, "nama", e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Jenis Kelamin</label>
                    <select
                      className="form-select"
                      value={formData[index].jenisKelamin}
                      onChange={(e) => handleFormChange(index, "jenisKelamin", e.target.value)}
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
                      onChange={(e) => handleFormChange(index, "pekerjaan", e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Apakah Kepala Keluarga?</label>
                    <select
                      className="form-select"
                      value={formData[index].kepalaKeluarga}
                      onChange={(e) => handleFormChange(index, "kepalaKeluarga", e.target.value)}
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
                              onChange={(e) => handleAnggotaChange(index, i, "nik", e.target.value)}
                            />
                          </div>
                          <div className="col-md-3">
                            <input
                              className="form-control"
                              placeholder="Nama"
                              value={a.nama}
                              onChange={(e) => handleAnggotaChange(index, i, "nama", e.target.value)}
                            />
                          </div>
                          <div className="col-md-3">
                            <select
                              className="form-select"
                              value={a.jenisKelamin}
                              onChange={(e) => handleAnggotaChange(index, i, "jenisKelamin", e.target.value)}
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
                              onChange={(e) => handleAnggotaChange(index, i, "pekerjaan", e.target.value)}
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

                  <button className="btn btn-primary" onClick={() => simpanData(index)}>
                    Simpan Data
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-header">Statistik</div>
          <div className="card-body">
            <p><strong>Total Penduduk:</strong> {stats.total}</p>
            <p><strong>Kepala Keluarga:</strong> {stats.kk}</p>
            <p><strong>Laki-laki:</strong> {stats.laki}</p>
            <p><strong>Perempuan:</strong> {stats.perempuan}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Dashboard;