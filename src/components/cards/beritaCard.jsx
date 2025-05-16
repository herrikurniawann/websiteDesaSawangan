import React from "react";
import {useQuery} from "convex/react";
import {api} from "/convex/_generated/api";
import {useNavigate} from "react-router-dom";

function BeritaCard({title, description, storageId, id}) {
  const fileUrl = useQuery(api.files.getFileUrl, {storageId});
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/berita/${id}`);
  };

  return (
    <div className='col-md-6 col-lg-4 mb-4 py-2'>
      <div className='card shadow-sm' style={{height: "24rem", cursor: "pointer"}} onClick={handleClick}>
        {fileUrl && <img src={fileUrl} alt={title} className='card-img-top' style={{maxHeight: 400, height: 200, objectFit: "cover"}} />}
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default BeritaCard;
