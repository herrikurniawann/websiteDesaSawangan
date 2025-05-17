import React, {useState} from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "convex/react";
import {api} from "@convex/_generated/api";

function ProfileForm() {
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
    {label: "Ganti Password", path: "/gantiPW"},
    {label: "Logout", type: "button", onClick: handleLogout},
  ];
  
  // Convex hooks
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveStruktur = useMutation(api.struktur.saveStruktur);
  const struktur = useQuery(api.struktur.getStruktur); // only one
  const strukturUrl = useQuery(api.files.getFileUrl, struktur ? {storageId: struktur.storageId} : "skip");

  const [strukturImage, setStrukturImage] = useState(null);
  const [strukturPreview, setStrukturPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false); // State to track upload progress

  const handleImageChange = (setter, previewSetter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
      previewSetter(URL.createObjectURL(file));
    }
  };

  const uploadFileAndGetStorageId = async (file) => {
    if (!generateUploadUrl) {
      alert("Upload URL belum tersedia.");
      return null;
    }

    const uploadUrl = await generateUploadUrl();
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {"Content-Type": file.type},
      body: file,
    });

    const {storageId} = await res.json();
    return storageId;
  };

  const handleSubmitStruktur = async (e) => {
    e.preventDefault();
    if (!strukturImage) return;

    setIsUploading(true); // Set uploading state to true
    try {
      const storageId = await uploadFileAndGetStorageId(strukturImage);
      if (storageId) {
        await saveStruktur({storageId});
        alert(struktur ? "Struktur Organisasi berhasil diperbarui!" : "Struktur Organisasi berhasil diunggah!");
        setStrukturImage(null);
        setStrukturPreview(null);
      }
    } catch (error) {
      console.error("Error uploading Struktur Organisasi:", error);
      alert("Terjadi kesalahan saat mengunggah Struktur Organisasi.");
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className='admin-content py-5 container'>
        <h1 className='mb-4'>Profile Form</h1>

        {/* Struktur Upload */}
        <div className='mb-5'>
          <h2>{struktur ? "Ganti Struktur Organisasi" : "Upload Struktur Organisasi"}</h2>
          <form onSubmit={handleSubmitStruktur} className='border p-3 rounded bg-light'>
            <div className='mb-3'>
              <label className='form-label'>Gambar Struktur Organisasi</label>
              <input
                type='file'
                className='form-control'
                accept='image/*'
                onChange={handleImageChange(setStrukturImage, setStrukturPreview)}
                required
              />
              {strukturPreview && <img src={strukturPreview} alt='Preview Struktur' className='img-thumbnail mt-3' style={{maxHeight: 200}} />}
            </div>
            <button type='submit' className={`btn ${struktur ? "btn-warning" : "btn-primary"}`} disabled={isUploading}>
              {isUploading ? "Proses..." : struktur ? "Ganti Struktur" : "Upload"}
            </button>
          </form>
        </div>

        <div className='mb-5'>
          <h2>Struktur Organisasi Saat Ini</h2>
          {strukturUrl ? (
            <img
              src={strukturUrl}
              alt='Struktur Organisasi'
              className='img-fluid img-thumbnail w-100'
              style={{maxHeight: 400, objectFit: "contain"}}
            />
          ) : (
            <p className='text-muted'>Belum ada struktur yang diunggah.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfileForm;
