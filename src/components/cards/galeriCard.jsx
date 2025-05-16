import React from "react";
import {useQuery} from "convex/react";
import {api} from "/convex/_generated/api";

function GaleriCard({storageId}) {
  const fileUrl = useQuery(api.files.getFileUrl, {storageId});

  return (
    <div className='col-md-6 col-lg-4 mb-4'>
      {fileUrl && <img src={fileUrl} alt='Gallery Image' className='img-fluid w-100' style={{maxHeight: 300, objectFit: "cover"}} />}
    </div>
  );
}

export default GaleriCard;
