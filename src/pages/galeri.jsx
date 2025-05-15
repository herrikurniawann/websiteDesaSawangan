import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import {useQuery} from "convex/react";
import {api} from "../../convex/_generated/api";

function Galeri() {
  const menuItems = [
    {label: "Home", path: "/"},
    {label: "Profile", path: "/profile"},
    {
      label: "Lainnya",
      type: "dropdown",
      children: [
        {label: "Infografis", path: "/infografis"},
        {label: "Berita", path: "/berita"},
        {label: "E-Lapor", path: "/eLapor"},
        {label: "Galeri", path: "/galeri"},
        {label: "Masuk Admin", path: "/login"},
      ],
    },
  ];

  // Fetch gallery data from the backend
  const galleryData = useQuery(api.galeri.listGaleri);

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className='content container py-5'>
        <div className='row'>
          <div className='col-12'>
            <h1 className='text-center'>Galeri</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <p className='text-center'>Berisi foto-foto kegiatan di desa</p>
          </div>
        </div>
        <div className='row'>
          {galleryData?.map((item) => (
            <ImageCard key={item._id} storageId={item.storageId} source='galeri' />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

function ImageCard({storageId, source}) {
  const fileUrl = useQuery(api.galeri.getFileUrl, {storageId});

  return (
    <div className='col-md-6 col-lg-4 mb-4'>
      {fileUrl && <img src={fileUrl} alt='Gallery Image' className='img-fluid w-100' style={{maxHeight: 300, objectFit: "cover"}} />}
    </div>
  );
}

export default Galeri;
