import React, {useState, useEffect} from "react";
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

  const [loading, setLoading] = useState(true);
  const galleryData = useQuery(api.galeri.listGaleri);

  useEffect(() => {
    if (galleryData !== undefined) {
      setLoading(false); // Set loading to false once data is fetched
    }
  }, [galleryData]);

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className='content container py-5' style={{height: "100%"}}>
        <div className='row'>
          <div className='col-12'>
            <h1 className='text-center fw-bold'>Galeri</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <p className='text-center'>Berisi foto-foto kegiatan di desa</p>
          </div>
        </div>
        {loading ? (
          <div className='text-center py-5'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
            <p className='mt-3'>Memuat data galeri...</p>
          </div>
        ) : (
          <div className='row'>
            {galleryData?.map((item) => (
              <ImageCard key={item._id} storageId={item.storageId} source='galeri' />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

// ini bekeng komponen baru nanti
function ImageCard({storageId, source}) {
  const fileUrl = useQuery(api.galeri.getFileUrl, {storageId});

  return (
    <div className='col-md-6 col-lg-4 mb-4'>
      {fileUrl && <img src={fileUrl} alt='Gallery Image' className='img-fluid w-100' style={{maxHeight: 300, objectFit: "cover"}} />}
    </div>
  );
}

export default Galeri;
