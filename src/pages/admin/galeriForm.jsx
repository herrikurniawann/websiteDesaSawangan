import React, {useEffect, useState} from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import {useMutation, useQuery} from "convex/react";
import {api} from "@convex/_generated/api";
import {useNavigate} from "react-router-dom";
import GaleriAdminCard from "@components/cards/GaleriAdminCard"; // Import the new GaleriAdminCard component

function GaleriBeritaForm() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    navigate("/login");
  };

  const menuItems = [
    {label: "Data", path: "/data"},
    {label: "Galeri", path: "/galeriForm"},
    {label: "Profile", path: "/profileForm"},
    {label: "gantiPW", path: "/gantiPW"},
    {label: "Logout", type: "button", onClick: handleLogout},
  ];

  // Loading state for Form 1 and Form 2
  const [loadingForm1, setLoadingForm1] = useState(false);
  const [loadingForm2, setLoadingForm2] = useState(false);

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
  const generateBeritaUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveBerita = useMutation(api.berita.saveBerita);
  const deleteBerita = useMutation(api.berita.deleteBerita);
  const listBerita = useQuery(api.berita.listBerita);

  const generateGaleriUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveGaleri = useMutation(api.galeri.saveGaleri);
  const deleteGaleri = useMutation(api.galeri.deleteGaleri);
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

    setLoadingForm1(true);
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
      setLoadingForm1(false);
    }
  };

  const handleSubmitForm2 = async (e) => {
    e.preventDefault();
    if (!form2Image) return;

    setLoadingForm2(true);
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
      setLoadingForm2(false);
    }
  };

  const handleDeleteBerita = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      try {
        await deleteBerita({id});
        alert("Berita berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting berita:", error);
        alert("Terjadi kesalahan saat menghapus berita.");
      }
    }
  };

  const handleDeleteGaleri = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus galeri ini?")) {
      try {
        await deleteGaleri({id});
        alert("Galeri berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting galeri:", error);
        alert("Terjadi kesalahan saat menghapus galeri.");
      }
    }
  };

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className='admin-content py-5 container'>
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
            <GaleriAdminCard
              key={item._id}
              title={item.title}
              description={item.description}
              storageId={item.storageId}
              source='berita'
              onDelete={() => handleDeleteBerita(item._id)}
            />
          ))}
        </div>

        <h3 className='mt-4'>Data Galeri</h3>
        <div className='row'>
          {listGaleri?.map((item) => (
            <GaleriAdminCard
              key={item._id}
              title={item.title}
              storageId={item.storageId}
              source='galeri'
              onDelete={() => handleDeleteGaleri(item._id)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GaleriBeritaForm;
