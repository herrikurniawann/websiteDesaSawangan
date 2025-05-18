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
  const savePreviousHukumTua = useMutation(api.hukumTua.savePreviousHukumTua);
  const previousHukumTuaList = useQuery(api.hukumTua.listPreviousHukumTua);
  const deletePreviousHukumTua = useMutation(api.hukumTua.deletePreviousHukumTua);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [prevName, setPrevName] = useState("");
  const [prevTahun, setPrevTahun] = useState("");
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

  const handlePrevSubmit = async (e) => {
    e.preventDefault();
    if (!prevName) {
      alert("Nama Hukum Tua wajib diisi.");
      return;
    }

    try {
      await savePreviousHukumTua({name: prevName, tahunJabatan: prevTahun});
      alert("Hukum Tua Terdahulu berhasil ditambahkan!");
      setPrevName("");
      setPrevTahun("");
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const handleDeletePrevious = async (id) => {
    if (confirm("Yakin ingin menghapus data Hukum Tua ini?")) {
      try {
        await deletePreviousHukumTua({id});
        alert("Data berhasil dihapus!");
      } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan saat menghapus data.");
      }
    }
  };

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className='admin-content py-5 container'>
        <h1 className='mb-4 text-center'>Hukum Tua Form</h1>
        <h2 className='mb-4'>Tambah Hukum Tua Saat Ini</h2>
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
        <hr className='my-5' />
        <h2 className='mb-4'>Tambah Hukum Tua Terdahulu</h2>
        <form onSubmit={handlePrevSubmit} className='border p-3 rounded bg-light'>
          <div className='mb-3'>
            <label className='form-label'>Nama Hukum Tua</label>
            <input type='text' className='form-control' value={prevName} onChange={(e) => setPrevName(e.target.value)} required />
          </div>
          <div className='mb-3'>
            <label className='form-label'>
              Tahun Jabatan <span className='text-muted'>(opsional)</span>
            </label>
            <input
              type='text'
              className='form-control'
              value={prevTahun}
              onChange={(e) => setPrevTahun(e.target.value)}
              placeholder='Contoh: 2015-2020'
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Simpan
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

        {previousHukumTuaList && previousHukumTuaList.length > 0 && (
          <div className='mt-5'>
            <h3 className='text-center mb-4'>Daftar Hukum Tua Terdahulu</h3>
            <ul className='list-group'>
              {previousHukumTuaList.map((item) => (
                <li key={item._id} className='list-group-item d-flex justify-content-between align-items-center'>
                  <div>
                    <strong>{item.name}</strong>
                    {item.tahunJabatan && <div className='text-muted small'>Tahun Jabatan: {item.tahunJabatan}</div>}
                  </div>
                  <button className='btn btn-sm btn-danger' onClick={() => handleDeletePrevious(item._id)}>
                    Hapus
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default HukumTuaForm;
