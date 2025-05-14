import React, { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

function ProfileAdmin() {
  const menuItems = [
    { label: "Data", path: "/data" },
    { label: "Berita", path: "/beritaForm" },
    { label: "Profile", path: "/profileForm" },
    { label: "Galeri", path: "/galeriForm" },
    { label: "logout", path: "/logout", type: "none" },
  ];

  const [newsList, setNewsList] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      title,
      description,
      image: preview,
    };

    if (editIndex !== null) {
      const updatedList = [...newsList];
      updatedList[editIndex] = newItem;
      setNewsList(updatedList);
      setEditIndex(null);
    } else {
      setNewsList([...newsList, newItem]);
    }

    setTitle("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const item = newsList[index];
    setTitle(item.title);
    setDescription(item.description);
    setPreview(item.image);
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updatedList = newsList.filter((_, i) => i !== index);
    setNewsList(updatedList);
  };

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="container-form py-4">
        <h2 className="mb-3">Form Berita</h2>

        <button
          className="btn btn-primary mb-3"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Tutup Form" : "Tambah Berita"}
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-4 border p-3 rounded bg-light">
            <div className="mb-3">
              <label className="form-label">Judul</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Deskripsi</label>
              <textarea
                className="form-control"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Gambar</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="img-thumbnail mt-2"
                  style={{ maxHeight: 200 }}
                />
              )}
            </div>

            <div>
              <button type="submit" className="btn btn-success me-2">
                {editIndex !== null ? "Simpan Perubahan" : "Tambah Berita"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setShowForm(false);
                  setTitle("");
                  setDescription("");
                  setImage(null);
                  setPreview(null);
                  setEditIndex(null);
                }}
              >
                Batal
              </button>
            </div>
          </form>
        )}

        <div className="row">
          {newsList.map((item, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div
                className="border rounded p-3 h-100 d-flex flex-column bg-white shadow-sm"
                style={{ transition: "0.2s", position: "relative" }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt="Berita"
                    className="mb-3 img-fluid rounded"
                    style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
                  />
                )}
                <h5 className="fw-bold">{item.title}</h5>
                <p
                  className="text-muted"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </p>
                <div className="mt-auto d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-outline-warning"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProfileAdmin;
