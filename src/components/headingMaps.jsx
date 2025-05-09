import React from "react";

function HeadingMaps() {
  return (
    <div className="heading-maps">
      <h1>Maps</h1>
      <p>Explore the world with our interactive maps.</p>
      <div className="map-container">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19984.25790040598!2d124.87755681200673!3d1.4492140265941522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32870b69053dcf57%3A0x495ee227cb80a0e3!2sSawangan%2C%20Kec.%20Tombulu%2C%20Kabupaten%20Minahasa%2C%20Sulawesi%20Utara!5e1!3m2!1sid!2sid!4v1746698285626!5m2!1sid!2sid"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default HeadingMaps;
