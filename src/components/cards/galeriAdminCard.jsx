import React from "react";
import {useQuery} from "convex/react";
import {api} from "@convex/_generated/api";

function GaleriAdminCard({title, description, storageId, onDelete}) {
  const fileUrl = useQuery(api.files.getFileUrl, storageId ? {storageId} : "skip");

  return (
    <div className='col-md-6 col-lg-4 mb-4'>
      <div className='card shadow-sm h-100'>
        {fileUrl && <img src={fileUrl} alt='img' className='card-img-top' style={{maxHeight: 200, objectFit: "cover"}} />}
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          {description && <p className='card-text text-muted'>{description}</p>}
          <button className='btn btn-danger btn-sm' onClick={onDelete}>
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

export default GaleriAdminCard;
