import React from "react";
import {useMutation, useQuery} from "convex/react";
import {api} from "@convex/_generated/api";

function HeadingThree() {
    const hukumTuaList = useQuery(api.hukumTua.getHukumTua); // gunakan yang sudah ada
    const hukumTua = hukumTuaList?.[0]; // ambil hanya yang terbaru (seperti struktur)
    const hukumTuaUrl = useQuery(api.files.getFileUrl, hukumTua ? {storageId: hukumTua.storageId} : "skip");

    if (!hukumTua || !hukumTuaUrl) {
      return (
        <div className="HeadingThree" id="scrollspyHeading3">
          <div className="container py-5 text-center">
            <p>Memuat data Hukum Tua...</p>
          </div>
        </div>
      );
    }
  return (
    <div className="HeadingThree" id="scrollspyHeading3">
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <div className="content-HeadingThree d-flex flex-column flex-md-row align-items-center py-5">
            <div className="d-flex justify-content-center mb-4 mb-md-0">
              {/* {Endpoint Foto Hukum Tua} */}
              <img src={hukumTuaUrl} alt="hukumTua" style={{borderRadius: "20px"}} />
            </div>
            <div className="pe-md-4 text-center text-md-start">
              <h1 className="fw-bold">Hukum Tua</h1>
              {/* {EndPoint Nama Hukum Tua} */}
              <h2 className="fw-bold fs-1">{hukumTua.name}</h2>
              <p className="p-1 overflow-auto" style={{ maxHeight: "200px" }}>
                Shalom. Assalamualaikum, Wr,Wb. Om Swastiastu, Namo Buddhya.
                Salam Kebajikan. Segala puji dan syukur kita panjatkan kepada
                sang khalik, pemilik kehidupan kita. Karna penghantarannya kita
                masih diberikan kesempatan untuk melayani dia dalam setiap aspek
                kehidupan kita. Perkembangan digital di era modern sangat
                diperlukan untuk menunjang sarana, prasana untuk menjawab
                tantangan zaman di era modern yang serba digital ini.
                Pembentukan website desa merupakan solusi untuk menjawab
                perkembangan zaman di era modern yang serba digital. Website ini
                merupakan alat informasi, komunikasi untuk masyarakat desa
                sawangan dengan akses informasi serba digital. Profil desa
                didesain dalam website sesuai dengan informasi monografi yang
                ada di desa sawangan. Tapi dari informasi tersebut yang
                dikumpulkan masih terdapat banyak sekali kekurangan, maka dari
                itu kami memohon kritik dan saran dari Bapak/Ibu/Sdra-i sekalian
                sebagai masukan dan bahan evaluasi bagi kami, untuk dapat
                memperbaiki sebagaimanamestinya, demi perkembangan desa
                sawangan. Akhir kata, semoga website ini dapat berguna dan
                bermanfaat dan dapat mempererat hubungan kerjasama antara
                pemerintah desa sawangan dan masyarakat, demi kemajuan desa
                sawangan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeadingThree;
