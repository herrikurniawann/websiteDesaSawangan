import React from "react";

function SejarahTab() {
  const sejarahSections = [
    {
      title: "Sejarah Singkat Desa Sawangan Kec. Tombulu",
      isMainTitle: true,
      subsections: [
        {
          title: "Penduduk Mula-Mula",
          content:
            "Penduduk mula-mula yang mendiami Desa Sawangan (pada waktu itu belum berstatus Desa, baru merupakan kelompok-kelompok manusia) ialah orang-orang yang berasal dari Ares Tikala Manado."
        },
        {
          title: "Asal Usul Desa Sawangan",
          content:
            "Sawangan lama didiami oleh kelompok-kelompok orang sejak Tahun 1800, dan Sawangan belum berstatus Desa. Pada waktu itu orang-orang masih hidup berkelompok dan yang menjadi kepala dari salah satu kelompok tersebut ialah dipilih seorang yang kuat untuk menjadi pemimpin mereka yang disebut Walian dan orang kedua disebut Tonaas. Tugas Tonaas bilamana orang-orang mau keluar berperang, membuka kebun, berburu, maka Tonaas yang menentukan boleh atau tidak.\n\nPada Tahun 1880 kelompok-kelompok manusia ini membentuk status Desa. Mulai saat itu kepala-kepala inilah yang disebut Walian, kemudian dihapuskan dan digantikan dengan sebutan Hukum Tua yang langsung dipilih oleh penduduk setempat.\n\nSebutan Hukum Tua berasal dari kata Ukung Tua yang sekarang disebut Hukum Tua atau Kepala Kampung atau Kepala Desa. Pertama-tama yang dilantik sebagai Hukum Tua Bapak Joseph Runtuwene pada Tahun 1880, Kepala Distrik Ares ialah Johakim Bernard Lasut."
        },
        {
          title: "Asal Usul Nama Sawangan",
          content:
            "Nama Sawangan diambil dari kata Pahsawangan artinya Pinasawangan oleh Dua Buah Sungai (Pertemuan Dua Buah Sungai ), yaitu Sungai Tikala dan Sungai Saluhesem."
        },
        {
          title: "Perubahan-Perubahaan Di Desa Sawangan",
          content:
            "Akibat serangan penyakit Malaria, penduduk Desa Sawangan pada Tahun 1923-1934 tinggal 300 orang. Oleh pemimpin Desa pada saat itu Hukum Tua benama Martinus Mawuntu mengajukan permohonan kepada Pemerintah Belanda untuk memindahkan Desa Sawangan kearah utara sejauh kira-kira 200 Meter.\n\nPada waktu itu Pemerintah Belanda mengirim Tim Kesehatan untuk memeriksa lokasi penduduk. Hasil pemeriksaan mereka menyatakan bahwa lokasi penduduk tersebut terletak di daerah lembah yang menyebabkan pertukaran udara didalamnya lambat sehingga penularan malaria lebih cepat dan sumber air banyak nyamuk malaria. Oleh karena itu Pemerintah Belanda menyetujui dan mengharuskan Desa untuk dipindahkan kearah utara, dan terjadilah pemindahan penduduk dari Desa Sawangan Lama ke Desa Sawangan Baru ( Sekarang ).\n\nPada Tanggal 16 September 1936 secara resmi penggunaan permukiman Wilayah Desa Sawangan Baru dengan diadakannya Pentahbisan Desa Sawangan Baru. Pada waktu itu Hukum Tua Martinus Mawuntu dan Hukum Besar Mayor Ompi."
        }
      ]
    },
    {
      title: "Adat Istiadat Desa Sawangan",
      isMainTitle: false,
      subsections: [
        {
          title: "Pertanian",
          content:
            "Bilamana membuka kebun baru, maka dipanggil Tonaas untuk lebih dahulu mengadakan paras kebun tersebut, setelah itu kebun dikerjakan beramai-ramai secara gotong royong (Mapalus). Demikian pula setelah hasil pertama dari kebun tersebut diambil, lebih dahulu harus dimakan oleh Tonaas."
        },
        {
          title: "Pentahbisan Rumah Baru",
          content:
            "Yang mula-mula datang memasang lampu ialah Tonaas, kemudian diadakan tari-tarian Maowe/Marambak."
        },
        {
          title: "Kepercayaan",
          content:
            "Semua penduduk mengakui adanya Tuhan, dan menganut Agama Kristen."
        },
        {
          title: "Perkawinan",
          content:
            "Sepasang pemuda-pemudi yang saling jatuh cinta, maka kewajiban dari sang lelaki bersama-sama dengan orang tuanya mengadakan lamaran pada si wanita melalui orang tuanya mengantar harta berupa kebun kelapa atau bentuk lainnya yang dijadikan milik bersama (Pamehe)."
        },
        {
          title: "Kesenian",
          content: "Maengket, tari jajar, tari perang (cakalele )"
        }
      ]
    }
  ];

  // Helper function untuk menampilkan konten dengan line breaks
  const renderContent = (content) => {
    return content.split("\n\n").map((paragraph, idx) => (
      <p className="mb-3" key={idx}>
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="container">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="section-title">Sejarah Desa</h2>
          {sejarahSections.map((section, idx) => (
            <div
              className="info-card p-4 mx-auto"
              style={{ maxWidth: "100%" }}
              key={idx}
            >
              {section.isMainTitle ? (
                <h3 className="fs-4 fw-bold text-primary mb-2">{section.title}</h3>
              ) : (
                <h4 className="fs-5 fw-semibold text-primary mb-3">{section.title}</h4>
              )}
              
              {section.subsections.map((subsection, subIdx) => (
                <React.Fragment key={subIdx}>
                  <h3 className="fs-5 fw-semibold text-primary mb-2">
                    {subsection.title}
                  </h3>
                  {renderContent(subsection.content)}
                  {subIdx < section.subsections.length - 1 && <br />}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SejarahTab;