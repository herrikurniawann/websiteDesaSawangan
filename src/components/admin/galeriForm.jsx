import React, {useEffect, useState} from "react";
import Navbar from "../navbar";
import Footer from "../footer";
import {useMutation, useQuery} from "convex/react";
import {api} from "../../../convex/_generated/api";

function GaleriBeritaForm() {
  const menuItems = [
    {label: "Data", path: "/data"},
    {label: "Galeri", path: "/galeriForm"},
    {label: "Profile", path: "/profileForm"},
    {label: "logout", path: "/logout", type: "none"},
  ];
  // loading state form 1 and 2
  const [loadingForm1, setLoadingForm1] = useState(false); // Loading state for Form 1
  const [loadingForm2, setLoadingForm2] = useState(false); // Loading state for Form 2

  // State for Form 1 (Berita)
  const [form1Title, setForm1Title] = useState("");
  const [form1Description, setForm1Description] = useState("");
  const [form1Image, setForm1Image] = useState(null);
  const [form1Preview, setForm1Preview] = useState(null);

  // State for Form 2 (Galeri)
  const [form2Title, setForm2Title] = useState("");
  const [form2Image, setForm2Image] = useState(null);
  const [form2Preview, setForm2Preview] = useState(null);

  // Convex hooks
  const generateBeritaUploadUrl = useMutation(api.berita.generateUploadUrl);
  const saveBerita = useMutation(api.berita.saveBerita);
  const listBerita = useQuery(api.berita.listBerita);

  const generateGaleriUploadUrl = useMutation(api.galeri.generateUploadUrl);
  const saveGaleri = useMutation(api.galeri.saveGaleri);
  const listGaleri = useQuery(api.galeri.listGaleri);

  const handleForm1ImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm1Image(file);
      setForm1Preview(URL.createObjectURL(file));
    }
  };

  const handleForm2ImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm2Image(file);
      setForm2Preview(URL.createObjectURL(file));
    }
  };

  const handleSubmitForm1 = async (e) => {
    e.preventDefault();
    if (!form1Image) return;

    setLoadingForm1(true); // Set loading state to true
    try {
      const postUrl = await generateBeritaUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        body: form1Image,
      });
      const {storageId} = await result.json();

      await saveBerita({
        title: form1Title,
        description: form1Description,
        storageId,
      });

      setForm1Title("");
      setForm1Description("");
      setForm1Image(null);
      setForm1Preview(null);
    } finally {
      setLoadingForm1(false); // Reset loading state
    }
  };

  const handleSubmitForm2 = async (e) => {
    e.preventDefault();
    if (!form2Image) return;

    setLoadingForm2(true); // Set loading state to true
    try {
      const postUrl = await generateGaleriUploadUrl();
      const result = await fetch(postUrl, {
        method: "POST",
        body: form2Image,
      });
      const {storageId} = await result.json();

      await saveGaleri({
        title: form2Title,
        storageId,
      });

      setForm2Title("");
      setForm2Image(null);
      setForm2Preview(null);
    } finally {
      setLoadingForm2(false); // Reset loading state
    }
  };

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className='admin-content py-5 container '>
        <h2 className='mb-4'>Upload Berita</h2>
        <form onSubmit={handleSubmitForm1} className='mb-5 border p-3 rounded bg-light'>
          <div className='mb-3'>
            <label className='form-label'>Judul</label>
            <input type='text' className='form-control' value={form1Title} onChange={(e) => setForm1Title(e.target.value)} required />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Deskripsi</label>
            <textarea className='form-control' rows={4} value={form1Description} onChange={(e) => setForm1Description(e.target.value)} required />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Gambar</label>
            <input type='file' className='form-control' accept='image/*' onChange={handleForm1ImageChange} required />
            {form1Preview && <img src={form1Preview} alt='Preview' className='img-thumbnail mt-2' style={{maxHeight: 200}} />}
          </div>

          <button type='submit' className='btn btn-primary' disabled={loadingForm1}>
            {loadingForm1 ? "Mengirim..." : "Submit"}
          </button>
        </form>

        <h2 className='mb-4'>Upload Galeri</h2>
        <form onSubmit={handleSubmitForm2} className='mb-5 border p-3 rounded bg-light'>
          <div className='mb-3'>
            <label className='form-label'>Judul</label>
            <input type='text' className='form-control' value={form2Title} onChange={(e) => setForm2Title(e.target.value)} required />
          </div>

          <div className='mb-3'>
            <label className='form-label'>Gambar</label>
            <input type='file' className='form-control' accept='image/*' onChange={handleForm2ImageChange} required />
            {form2Preview && <img src={form2Preview} alt='Preview' className='img-thumbnail mt-2' style={{maxHeight: 200}} />}
          </div>

          <button type='submit' className='btn btn-primary' disabled={loadingForm2}>
            {loadingForm2 ? "Mengirim..." : "Submit"}
          </button>
        </form>

        <h3>Data Berita</h3>
        <div className='row'>
          {listBerita?.map((item) => (
            <ImageCard key={item._id} title={item.title} description={item.description} storageId={item.storageId} source='berita' />
          ))}
        </div>

        <h3 className='mt-4'>Data Galeri</h3>
        <div className='row'>
          {listGaleri?.map((item) => (
            <ImageCard key={item._id} title={item.title} storageId={item.storageId} source='galeri' />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

function ImageCard({title, description, storageId, source}) {
  const fileUrl = useQuery(source === "berita" ? api.berita.getFileUrl : api.galeri.getFileUrl, {storageId});

  return (
    <div className='col-md-6 col-lg-4 mb-4'>
      <div className='card shadow-sm h-100'>
        {fileUrl && <img src={fileUrl} alt='img' className='card-img-top' style={{maxHeight: 200, objectFit: "cover"}} />}
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          {description && <p className='card-text text-muted'>{description}</p>}
        </div>
      </div>
    </div>
  );
}

export default GaleriBeritaForm;
