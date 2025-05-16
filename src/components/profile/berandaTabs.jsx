import React from "react";
import InfoCard from "../cards/infoCard";
import MapLocation from "./mapLocation";

function BerandaTab() {
  const infoItems = [
    {title: "Nama Desa", value: "SAWANGAN"},
    {title: "Tahun Pembentukan", value: "1880"},
    {title: "Dasar Hukum Pembentukan", value: "1936 (DITAHBISKAN)"},
    {title: "No. Kode Wilayah", value: "07"},
    {title: "No. Kode Pos", value: "95661"},
    {title: "Kecamatan", value: "TOMBULU"},
    {title: "Kabupaten/Kota", value: "MINAHASA"},
    {title: "Provinsi", value: "SULAWESI UTARA"},
  ];

  return (
    <div className='container'>
      <div className='column'>
        <div className='col-md-100'>
          <div className='card shadow-sm mb-4'>
            <div className='card-body m-auto'>
              <h2 className='section-title'>Informasi Umum</h2>
              <div className='row'>
                {infoItems.map((item, index) => (
                  <div className='col-md-6 mb-3' key={index}>
                    <InfoCard title={item.title}>{item.value}</InfoCard>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className='col-md-100'>
          <div className='card shadow-sm h-100'>
            <div className='card-body'>
              <h2 className='section-title'>Lokasi Desa</h2>
              <MapLocation />
              <p className='text-muted mb-4'>Desa Sawangan terletak di Kecamatan Tombulu, Kabupaten Minahasa, Sulawesi Utara.</p>
              <InfoCard title='Luas Wilayah'>892 HA KM²</InfoCard>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BerandaTab;
