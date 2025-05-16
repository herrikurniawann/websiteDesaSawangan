import React from "react";
import InfoCard from "../cards/infoCard";

function WilayahTab() {
  const tipologiInfo = [
    {title: "Tipologi Desa", value: "DATARAN RENDAH"},
    {title: "Tingkat Perkembangan Desa", value: "SWASEMBADA/SWADAYA/SWAKARYA"},
    {title: "Luas Wilayah", value: "892 HA KM²"},
  ];

  const batasWilayah = [
    {title: "Sebelah Utara", value: "DESA TIKELA"},
    {title: "Sebelah Selatan", value: "DESA KAMANGTA & TOMBULUAN"},
    {title: "Sebelah Barat", value: "DESA KAMANGTA & TIKELA"},
    {title: "Sebelah Timur", value: "DESA MAUMBI & KUWIL"},
  ];

  const orbitasi = [
    {title: "Jarak dari Pusat Pemerintahan Kecamatan", value: "12 KM"},
    {title: "Jarak dari Pusat Pemerintahan Kota", value: "3 KM"},
    {title: "Jarak dari Ibukota Kabupaten", value: "40 KM"},
    {title: "Jarak dari Ibukota Provinsi", value: "3 KM"},
  ];

  return (
    <div className='container'>
      <div className='card shadow-sm'>
        <div className='card-body'>
          <h2 className='section-title'>Wilayah Desa</h2>
          <p className='mb-3'>
            Desa Sawangan dengan Luas Wilayah keseluruhan 892 Hektar, terdiri dari dataran pemukiman penduduk, perbukitan dan lembah serta areal
            pertanian, dengan batas wilayah : Sebelah Utara berbatasan dengan Desa Tikela/ Maumbi Kalawat, Sebelah Timur berbatasan dengan Desa Maumbi
            dan Desa Kuwil Sebelah Selatan berbatasan dengan Desa Kamangta dan Desa Tombuluan Sebelah Barat berbatasan dengan Desa Kamangta dan Desa
            Tikela.
          </p>
          <hr />
          <p className='mb-3'>
            Desa Sawangan terbagi dalam 6 Wilayah Jaga, dimana masing-masing jaga dikoordinir oleh Kepala Jaga yang disebut Pala dan Meweteng yang
            berfungsi mengawasi dan mengkoordinir aktifitas pembangunan dan pelayan masyarakat di masing-masing wilayahnya.
          </p>

          <div className='row mb-4'>
            {tipologiInfo.map((info, index) => (
              <div className='col-md-4 mb-3' key={index}>
                <InfoCard title={info.title}>{info.value}</InfoCard>
              </div>
            ))}
          </div>

          <h3 className='fs-4 fw-bold text-primary mb-3'>Batas Wilayah</h3>
          <div className='row mb-4'>
            {batasWilayah.map((batas, index) => (
              <div className='col-md-6 mb-3' key={index}>
                <InfoCard title={batas.title}>{batas.value}</InfoCard>
              </div>
            ))}
          </div>

          <h3 className='fs-4 fw-bold text-primary mb-3'>Orbitasi (Jarak dari Pusat Pemerintahan)</h3>
          <div className='row'>
            {orbitasi.map((orbit, index) => (
              <div className='col-md-6 mb-3' key={index}>
                <InfoCard title={orbit.title}>{orbit.value}</InfoCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WilayahTab;
