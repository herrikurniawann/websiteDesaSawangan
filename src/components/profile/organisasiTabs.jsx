import React from "react";
import {api} from "/convex/_generated/api";
import {useQuery} from "convex/react";

function OrganisasiTab() {
  const struktur = useQuery(api.struktur.getStruktur);
  const strukturUrl = useQuery(api.files.getFileUrl, struktur ? {storageId: struktur.storageId} : "skip");
  return (
    <div className='container'>
      <div className='card shadow-sm'>
        <div className='card-body'>
          <h2 className='section-title'>Struktur Organisasi Desa</h2>
          <p className='mb-3'>Informasi tentang struktur organisasi Desa Sawangan akan ditampilkan di sini.</p>
          {strukturUrl && (
            <img
              src={strukturUrl}
              alt='Struktur Organisasi'
              className='img-fluid img-thumbnail w-100'
              style={{maxHeight: 400, objectFit: "contain"}}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganisasiTab;
