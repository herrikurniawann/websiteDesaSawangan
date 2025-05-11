import React, { useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

function Profile() {
  const [activeTab, setActiveTab] = useState("beranda");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        <header className="header-bg">
          <div className="overlay position-absolute">
            <div className="text-content-profile text-center">
              <h1 className="display-4 fw-bold">PROFILE DESA SAWANGAN</h1>
              <p className="fs">Kecamatan Tombulu, Kabupaten Minahasa</p>
              <p className="fs">Provinsi Sulawesi Utara</p>
            </div>
          </div>
        </header>
        <div className="bg-white shadow-sm">
          <div className="container">
            <ul className="nav nav-pills nav-fill p-2">
              <li className="nav-item">
                <button
                  onClick={() => handleTabChange("beranda")}
                  className={`nav-link ${
                    activeTab === "beranda" ? "active" : ""
                  }`}
                >
                  Beranda
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleTabChange("sejarah")}
                  className={`nav-link ${
                    activeTab === "sejarah" ? "active" : ""
                  }`}
                >
                  Sejarah
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleTabChange("wilayah")}
                  className={`nav-link ${
                    activeTab === "wilayah" ? "active" : ""
                  }`}
                >
                  Wilayah
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => handleTabChange("organisasi")}
                  className={`nav-link ${
                    activeTab === "organisasi" ? "active" : ""
                  }`}
                >
                  Organisasi
                </button>
              </li>
            </ul>
            <div className="tab-content py-4">
              {activeTab === "beranda" && (
                <div className="container">
                  <div className="column">
                    <div className="col-md-100">
                      <div className="card shadow-sm mb-4">
                        <div className="card-body m-auto">
                          <h2 className="section-title">Informasi Umum</h2>
                          <div className="row">
                            <div className="col-md-6 mb-3">
                              <div className="info-card">
                                <h3 className="card-title">Nama Desa</h3>
                                <p className="mb-0">SAWANGAN</p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="info-card">
                                <h3 className="card-title">
                                  Tahun Pembentukan
                                </h3>
                                <p className="mb-0">1880</p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="info-card">
                                <h3 className="card-title">
                                  Dasar Hukum Pembentukan
                                </h3>
                                <p className="mb-0">1936 (DITAHBISKAN)</p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="info-card">
                                <h3 className="card-title">No. Kode Wilayah</h3>
                                <p className="mb-0">07</p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="info-card">
                                <h3 className="card-title">No. Kode Pos</h3>
                                <p className="mb-0">95661</p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="info-card">
                                <h3 className="card-title">Kecamatan</h3>
                                <p className="mb-0">TOMBULU</p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="info-card">
                                <h3 className="card-title">Kabupaten/Kota</h3>
                                <p className="mb-0">MINAHASA</p>
                              </div>
                            </div>
                            <div className="col-md-6 mb-3">
                              <div className="info-card">
                                <h3 className="card-title">Provinsi</h3>
                                <p className="mb-0">SULAWESI UTARA</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-100">
                      <div className="card shadow-sm h-100">
                        <div className="card-body">
                          <h2 className="section-title">Lokasi Desa</h2>
                          <div className="bg-light p-3  mb-3 rounded">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19984.25790040598!2d124.87755681200673!3d1.4492140265941522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870b69053dcf57%3A0x495ee227cb80a0e3!2sSawangan%2C%20Kec.%20Tombulu%2C%20Kabupaten%20Minahasa%2C%20Sulawesi%20Utara!5e1!3m2!1sid!2sid!4v1746698285626!5m2!1sid!2sid"
                              style={{ border: 0 }}
                              loading="lazy"
                              title="Peta Desa Sawangan"
                              allowFullScreen
                            ></iframe>
                            <h5>Desa Sawangan</h5>
                          </div>
                          <p className="text-muted mb-4">
                            Desa Sawangan terletak di Kecamatan Tombulu,
                            Kabupaten Minahasa, Sulawesi Utara.
                          </p>
                          <div className="info-card">
                            <h3 className="card-title">Luas Wilayah</h3>
                            <p className="mb-0">892 HA KM²</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "sejarah" && (
                <div className="container">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h2 className="section-title">Sejarah Desa</h2>
                      <div
                        className="info-card p-4 mx-auto"
                        style={{ maxWidth: "100%" }}
                      >
                        <h3 className="fs-4 fw-bold text-primary mb-2">
                          Sejarah Singkat Desa Sawangan Kec. Tombulu
                        </h3>
                        <h4 className="fs-5 fw-semibold text-primary mb-3">
                          Penduduk Mula-Mula
                        </h4>
                        <p className="mb-3">
                          Penduduk mula-mula yang mendiami Desa Sawangan (pada
                          waktu itu belum berstatus Desa, baru merupakan
                          kelompok-kelompok manusia) ialah orang-orang yang
                          berasal dari Ares Tikala Manado.
                        </p>
                        <h3 className="fs-5 fw-semibold text-primary mb-2">
                          Asal Usul Desa Sawangan
                        </h3>
                        <p className="mb-3">
                          Sawangan lama didiami oleh kelompok-kelompok orang
                          sejak Tahun 1800, dan Sawangan belum berstatus Desa.
                          Pada waktu itu orang-orang masih hidup berkelompok dan
                          yang menjadi kepala dari salah satu kelompok tersebut
                          ialah dipilih seorang yang kuat untuk menjadi pemimpin
                          mereka yang disebut Walian dan orang kedua disebut
                          Tonaas. Tugas Tonaas bilamana orang-orang mau keluar
                          berperang, membuka kebun, berburu, maka Tonaas yang
                          menentukan boleh atau tidak.
                          <br />
                          Pada Tahun 1880 kelompok-kelompok manusia ini
                          membentuk status Desa. Mulai saat itu kepala-kepala
                          inilah yang disebut Walian, kemudian dihapuskan dan
                          digantikan dengan sebutan Hukum Tua yang langsung
                          dipilih oleh penduduk setempat.
                          <br />
                          Sebutan Hukum Tua berasal dari kata Ukung Tua yang
                          sekarang disebut Hukum Tua atau Kepala Kampung atau
                          Kepala Desa. Pertama-tama yang dilantik sebagai Hukum
                          Tua Bapak Joseph Runtuwene pada Tahun 1880, Kepala
                          Distrik Ares ialah Johakim Bernard Lasut.
                        </p>
                        <h3 className="fs-5 fw-semibold text-primary mb-2">
                          Asal Usul Nama Sawangan
                        </h3>
                        <p className="mb-3">
                          Nama Sawangan diambil dari kata Pahsawangan artinya
                          Pinasawangan oleh Dua Buah Sungai (Pertemuan Dua Buah
                          Sungai ), yaitu Sungai Tikala dan Sungai Saluhesem.
                        </p>
                        <h3 className="fs-5 fw-semibold text-primary mb-2">
                          Perubahan-Perubahaan Di Desa Sawangan
                        </h3>
                        <p className="mb-3">
                          Akibat serangan penyakit Malaria, penduduk Desa
                          Sawangan pada Tahun 1923-1934 tinggal 300 orang. Oleh
                          pemimpin Desa pada saat itu Hukum Tua benama Martinus
                          Mawuntu mengajukan permohonan kepada Pemerintah
                          Belanda untuk memindahkan Desa Sawangan kearah utara
                          sejauh kira-kira 200 Meter.
                          <br />
                          Pada waktu itu Pemerintah Belanda mengirim Tim
                          Kesehatan untuk memeriksa lokasi penduduk. Hasil
                          pemeriksaan mereka menyatakan bahwa lokasi penduduk
                          tersebut terletak di daerah lembah yang menyebabkan
                          pertukaran udara didalamnya lambat sehingga penularan
                          malaria lebih cepat dan sumber air banyak nyamuk
                          malaria. Oleh karena itu Pemerintah Belanda menyetujui
                          dan mengharuskan Desa untuk dipindahkan kearah utara,
                          dan terjadilah pemindahan penduduk dari Desa Sawangan
                          Lama ke Desa Sawangan Baru ( Sekarang ).
                          <br />
                          Pada Tanggal 16 September 1936 secara resmi penggunaan
                          permukiman Wilayah Desa Sawangan Baru dengan
                          diadakannya Pentahbisan Desa Sawangan Baru. Pada waktu
                          itu Hukum Tua Martinus Mawuntu dan Hukum Besar Mayor
                          Ompi.
                        </p>
                      </div>
                      <div
                        className="info-card p-4 mx-auto"
                        style={{ maxWidth: "100%" }}
                      >
                        <h4 className="fs-5 fw-semibold text-primary mb-3">
                          Adat Istiadat Desa Sawangan
                        </h4>
                        <h3 className="fs-5 fw-semibold text-primary mb-2">
                          Pertanian
                        </h3>
                        <p className="mb-3">
                          Bilamana membuka kebun baru, maka dipanggil Tonaas
                          untuk lebih dahulu mengadakan paras kebun tersebut,
                          setelah itu kebun dikerjakan beramai-ramai secara
                          gotong royong (Mapalus). Demikian pula setelah hasil
                          pertama dari kebun tersebut diambil, lebih dahulu
                          harus dimakan oleh Tonaas.
                        </p>
                        <br />
                        <h3 className="fs-5 fw-semibold text-primary mb-2">
                          Pertanian
                        </h3>
                        <p className="mb-3">
                          Bilamana membuka kebun baru, maka dipanggil Tonaas
                          untuk lebih dahulu mengadakan paras kebun tersebut,
                          setelah itu kebun dikerjakan beramai-ramai secara
                          gotong royong (Mapalus). Demikian pula setelah hasil
                          pertama dari kebun tersebut diambil, lebih dahulu
                          harus dimakan oleh Tonaas.
                        </p>
                        <br />
                        <h3 className="fs-5 fw-semibold text-primary mb-2">
                          Pentahbisan Rumah Baru
                        </h3>
                        <p className="mb-3">
                          Yang mula-mula datang memasang lampu ialah Tonaas,
                          kemudian diadakan tari-tarian Maowe/Marambak.
                        </p>
                        <h3 className="fs-5 fw-semibold text-primary mb-2">
                          Kepercayaan
                        </h3>
                        <p className="mb-3">
                          Semua penduduk mengakui adanya Tuhan, dan menganut
                          Agama Kristen.
                        </p>
                        <br />
                        <h3 className="fs-5 fw-semibold text-primary mb-2">
                          Perkawinan
                        </h3>
                        <p className="mb-3">
                          Sepasang pemuda-pemudi yang saling jatuh cinta, maka
                          kewajiban dari sang lelaki bersama-sama dengan orang
                          tuanya mengadakan lamaran pada si wanita melalui orang
                          tuanya mengantar harta berupa kebun kelapa atau bentuk
                          lainnya yang dijadikan milik bersama (Pamehe).
                        </p>
                        <br />
                        <h3 className="fs-5 fw-semibold text-primary mb-2">
                          Kesenian
                        </h3>
                        <p className="mb-3">
                          Maengket, tari jajar, tari perang (cakalele )
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "wilayah" && (
                <div className="container">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h2 className="section-title">Wilayah Desa</h2>
                      <p className="mb-3">
                        Desa Sawangan dengan Luas Wilayah keseluruhan 892
                        Hektar, terdiri dari dataran pemukiman penduduk,
                        perbukitan dan lembah serta areal pertanian, dengan
                        batas wilayah : Sebelah Utara berbatasan dengan Desa
                        Tikela/ Maumbi Kalawat, Sebelah Timur berbatasan dengan
                        Desa Maumbi dan Desa Kuwil Sebelah Selatan berbatasan
                        dengan Desa Kamangta dan Desa Tombuluan Sebelah Barat
                        berbatasan dengan Desa Kamangta dan Desa Tikela.
                      </p>
                      <hr />
                      <p className="mb-3">
                        Desa Sawangan terbagi dalam 6 Wilayah Jaga, dimana
                        masing-masing jaga dikoordinir oleh Kepala Jaga yang
                        disebut Pala dan Meweteng yang berfungsi mengawasi dan
                        mengkoordinir aktifitas pembangunan dan pelayan
                        masyarakat di masing-masing wilayahnya.
                      </p>
                      <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                          <div className="info-card">
                            <h3 className="card-title">Tipologi Desa</h3>
                            <p className="mb-0">DATARAN RENDAH</p>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="info-card">
                            <h3 className="card-title">
                              Tingkat Perkembangan Desa
                            </h3>
                            <p className="mb-0">SWASEMBADA/SWADAYA/SWAKARYA</p>
                          </div>
                        </div>
                        <div className="col-md-4 mb-3">
                          <div className="info-card">
                            <h3 className="card-title">Luas Wilayah</h3>
                            <p className="mb-0">892 HA KM²</p>
                          </div>
                        </div>
                      </div>
                      <h3 className="fs-4 fw-bold text-primary mb-3">
                        Batas Wilayah
                      </h3>
                      <div className="row mb-4">
                        <div className="col-md-6 mb-3">
                          <div className="info-card">
                            <h4 className="card-title">Sebelah Utara</h4>
                            <p className="mb-0">DESA TIKELA</p>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="info-card">
                            <h4 className="card-title">Sebelah Selatan</h4>
                            <p className="mb-0">DESA KAMANGTA & TOMBULUAN</p>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="info-card">
                            <h4 className="card-title">Sebelah Barat</h4>
                            <p className="mb-0">DESA KAMANGTA & TIKELA</p>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="info-card">
                            <h4 className="card-title">Sebelah Timur</h4>
                            <p className="mb-0">DESA MAUMBI & KUWIL</p>
                          </div>
                        </div>
                      </div>
                      <h3 className="fs-4 fw-bold text-primary mb-3">
                        Orbitasi (Jarak dari Pusat Pemerintahan)
                      </h3>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="info-card">
                            <h4 className="card-title">
                              Jarak dari Pusat Pemerintahan Kecamatan
                            </h4>
                            <p className="mb-0">12 KM</p>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="info-card">
                            <h4 className="card-title">
                              Jarak dari Pusat Pemerintahan Kota
                            </h4>
                            <p className="mb-0">3 KM</p>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="info-card">
                            <h4 className="card-title">
                              Jarak dari Ibukota Kabupaten
                            </h4>
                            <p className="mb-0">40 KM</p>
                          </div>
                        </div>
                        <div className="col-md-6 mb-3">
                          <div className="info-card">
                            <h4 className="card-title">
                              Jarak dari Ibukota Provinsi
                            </h4>
                            <p className="mb-0">3 KM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
