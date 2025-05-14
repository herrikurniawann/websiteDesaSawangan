import React, { useState } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

function GaleriBeritaForm() {
  const menuItems = [
    { label: "Data", path: "/data" },
    { label: "Galeri", path: "/galeriForm" },
    { label: "Profile", path: "/profileForm" },
    { label: "logout", path: "/logout", type: "none" },
  ];

  const [form1Title, setForm1Title] = useState("");
  const [form1Description, setForm1Description] = useState("");
  const [form1Image, setForm1Image] = useState(null);
  const [form1Preview, setForm1Preview] = useState(null);

  const [form2Title, setForm2Title] = useState("");
  const [form2Image, setForm2Image] = useState(null);
  const [form2Preview, setForm2Preview] = useState(null);

  const [submitted1, setSubmitted1] = useState([]);
  const [submitted2, setSubmitted2] = useState([]);

  const handleForm1ImageChange = (e) => {
    const file = e.target.files[0];
    setForm1Image(file);
    setForm1Preview(URL.createObjectURL(file));
  };

  const handleForm2ImageChange = (e) => {
    const file = e.target.files[0];
    setForm2Image(file);
    setForm2Preview(URL.createObjectURL(file));
  };

  const handleSubmitForm1 = (e) => {
    e.preventDefault();
    const newItem = {
      title: form1Title,
      description: form1Description,
      image: form1Preview,
    };
    setSubmitted1([...submitted1, newItem]);

    // Reset
    setForm1Title("");
    setForm1Description("");
    setForm1Image(null);
    setForm1Preview(null);
  };

  const handleSubmitForm2 = (e) => {
    e.preventDefault();
    const newItem = {
      title: form2Title,
      image: form2Preview,
    };
    setSubmitted2([...submitted2, newItem]);

    // Reset
    setForm2Title("");
    setForm2Image(null);
    setForm2Preview(null);
  };

  return (
    <>
      <Navbar menuItems={menuItems} />
      <div className="container-form d-flex flex-column align-items-center py-5 mt-5">
        <h2 className="mb-4">Form 1 - Upload Berita</h2>
        <form
          onSubmit={handleSubmitForm1}
          className="mb-5 border p-3 rounded bg-light"
        >
          <div className="mb-3">
            <label className="form-label">Judul</label>
            <input
              type="text"
              className="form-control"
              value={form1Title}
              onChange={(e) => setForm1Title(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Deskripsi</label>
            <textarea
              className="form-control"
              rows="4"
              value={form1Description}
              onChange={(e) => setForm1Description(e.target.value)}
              required
              placeholder="Masukkan deskripsi berita di sini..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gambar</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleForm1ImageChange}
              required
            />
            {form1Preview && (
              <img
                src={form1Preview}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxHeight: 200 }}
              />
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Form 1
          </button>
        </form>

        <h2 className="mb-4">Form 2 - Upload Galeri</h2>
        <form
          onSubmit={handleSubmitForm2}
          className="mb-5 border p-3 rounded bg-light"
        >
          <div className="mb-3">
            <label className="form-label">Judul</label>
            <input
              type="text"
              className="form-control"
              value={form2Title}
              onChange={(e) => setForm2Title(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gambar</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleForm2ImageChange}
              required
            />
            {form2Preview && (
              <img
                src={form2Preview}
                alt="Preview"
                className="img-thumbnail mt-2"
                style={{ maxHeight: 200 }}
              />
            )}
          </div>

          <button type="submit" className="btn btn-success">
            Submit Form 2
          </button>
        </form>

        <h3>Data dari Form 1</h3>
        <div className="row">
          {submitted1.map((item, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="border p-2 rounded">
                <img
                  src={item.image}
                  alt="img"
                  className="img-fluid mb-2 rounded"
                  style={{ maxHeight: 200, objectFit: "cover" }}
                />
                <h5>{item.title}</h5>
                <p className="text-muted">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h3 className="mt-4">Data dari Form 2</h3>
        <div className="row">
          {submitted2.map((item, index) => (
            <div key={index} className="col-md-4 mb-3">
              <div className="border p-2 rounded">
                <img
                  src={item.image}
                  alt="img"
                  className="img-fluid mb-2 rounded"
                  style={{ maxHeight: 200, objectFit: "cover" }}
                />
                <h5>{item.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default GaleriBeritaForm;