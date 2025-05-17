import React, {useState} from "react";
import Navbar from "@components/navbar";
import Footer from "@components/footer";
import {useNavigate} from "react-router-dom";
import {useMutation, useQuery} from "convex/react";
import {api} from "@convex/_generated/api";

function HukumTuaForm() {
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
    {label: "Hukum Tua", path: "/hukumTuaForm"},
    {label: "Ganti Password", path: "/gantiPW"},
    {label: "Logout", type: "button", onClick: handleLogout},
  ];

  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const saveHukumTua = useMutation(api.hukumTua.saveHukumTua);
  const hukumTuaList = useQuery(api.hukumTua.getHukumTua); // gunakan yang sudah ada
  const hukumTua = hukumTuaList?.[0]; // ambil hanya yang terbaru (seperti struktur)

  const hukumTuaUrl = useQuery(api.files.getFileUrl, hukumTua ? {storageId: hukumTua.storageId} : "skip");

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadFileAndGetStorageId = async (file) => {
    const uploadUrl = await generateUploadUrl();
    const res = await fetch(uploadUrl, {
      method: "POST",
      headers: {"Content-Type": file.type},
      body: file,
    });
    const {storageId} = await res.json();
    return storageId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) {
      alert("Nama dan gambar wajib diisi.");
      return;
    }

    setIsUploading(true);
    try {
      const storageId = await uploadFileAndGetStorageId(image);
      await saveHukumTua({name, storageId});
      alert(hukumTua ? "Hukum Tua berhasil diperbarui!" : "Hukum Tua berhasil ditambahkan!");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className='admin-content py-5 container'>
        <h1 className='mb-4'>Hukum Tua Form</h1>

        <form onSubmit={handleSubmit} className='border p-3 rounded bg-light'>
          <div className='mb-3'>
            <label className='form-label'>Nama Hukum Tua</label>
            <input type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Foto Hukum Tua</label>
            <input type='file' className='form-control' accept='image/*' onChange={handleImageChange} required />
            {preview && <img src={preview} alt='Preview' className='img-thumbnail mt-3' style={{maxHeight: 200}} />}
          </div>
          <button type='submit' className={`btn ${hukumTua ? "btn-warning" : "btn-primary"}`} disabled={isUploading}>
            {isUploading ? "Proses..." : hukumTua ? "Ganti Hukum Tua" : "Upload"}
          </button>
        </form>
        <div className='mt-5'>
          <h2 className='text-center'>Hukum Tua Saat Ini</h2>
          {hukumTuaUrl ? (
            <div className='m-auto p-3 shadow-sm' style={{maxWidth: 300}}>
              <div className='ratio ratio-1x1'>
                <img
                  src={hukumTuaUrl}
                  alt={hukumTua.name}
                  className='w-100 h-100 object-fit-cover' // Full width and height with cover
                />
              </div>
              <h5 className='text-center mt-3 fw-bold'>{hukumTua.name}</h5>
            </div>
          ) : (
            <p className='text-muted'>Belum ada Hukum Tua yang diunggah.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HukumTuaForm;
