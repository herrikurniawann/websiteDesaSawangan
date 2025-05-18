import React from "react";
import {api} from "/convex/_generated/api";
import {useQuery} from "convex/react";

function OrganisasiTab() {
  const struktur = useQuery(api.struktur.getStruktur);
  const strukturUrl = useQuery(api.files.getFileUrl, struktur ? {storageId: struktur.storageId} : "skip");
  const previousHukumTuaList = useQuery(api.hukumTua.listPreviousHukumTua);

  return (
    <div className='container'>
      <div className='card shadow-sm p-3'>
        <div className='card-body p-0'>
          <h2 className='section-title'>Struktur Organisasi Desa</h2>
          <p className='mb-3 text-center'>Informasi tentang struktur organisasi Desa Sawangan akan ditampilkan di sini.</p>
          {strukturUrl && (
            <img
              src={strukturUrl}
              alt='Struktur Organisasi'
              className='img-fluid img-thumbnail w-100'
              style={{maxHeight: 400, objectFit: "contain"}}
            />
          )}
        </div>
        <p className='text-center mt-5'>Informasi daftar hukum tua terdahulu</p>
        {previousHukumTuaList && previousHukumTuaList.length > 0 && (
          <div className='mt-2'>
            <ul className='list-group'>
              {previousHukumTuaList.map((item) => (
                <li key={item._id} className='list-group-item d-flex justify-content-between align-items-center'>
                  <div>
                    <strong>{item.name}</strong>
                    {item.tahunJabatan && <div className='text-muted small'>Tahun Jabatan: {item.tahunJabatan}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrganisasiTab;
