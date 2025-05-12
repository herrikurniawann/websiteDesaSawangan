import React, { useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

function ELapor() {
  const form = useRef();
  const MySwal = Swal;

  useEffect(() => {
    emailjs.init("NDKF57pyxCesOUYVx");
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_lxwwe3o", "template_8plga9j", form.current).then(
      () => {
        MySwal.fire({
          title: "Berhasil",
          text: "Email berhasil dikirim!",
          icon: "success",
        }).then(() => {
          form.current.reset();
        });
      },
      (error) => {
        MySwal.fire({
          title: "Gagal",
          text: "Email Gagal dikirim!",
          icon: "error",
        }).then(() => {
          form.current.reset();
        });
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="elapor-wrapper">
        <div className="elapor-right">
          <form ref={form} onSubmit={sendEmail} className="elapor-form">
            <h2 className="form-title">eLapor</h2>
            <p className="form-desc">
              <strong>eLapor</strong> adalah layanan pelaporan digital yang
              memudahkan Anda menyampaikan masukan, keluhan, atau saran secara
              langsung dan efisien kepada pihak terkait.
            </p>
            <div className="form-group">
              <label htmlFor="name">Nama</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Pesan</label>
              <textarea
                className="form-control"
                name="message"
                id="message"
                rows="5"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Kirim
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ELapor;
