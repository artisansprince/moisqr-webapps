'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Sidebar from "../../components/sidebar";

export default function DetailObjectPage() {
  const [object, setObject] = useState(null);
  const [qrCodeLoading, setQrCodeLoading] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const baseURL = 'http://localhost:9977';

  useEffect(() => {
    if (id) {
      fetchObjectDetail(id);
    }
  }, [id]);

  const fetchObjectDetail = async (objectId) => {
    try {
      const response = await axios.get(`${baseURL}/api/objects/get-by-id/${objectId}`);
      setObject(response.data);
    } catch (error) {
      console.error('Failed to fetch object detail', error);
    }
  };

  const handleGenerateQRCode = async () => {
    if (!id) return;
    setQrCodeLoading(true);
    try {
      const response = await axios.post(`${baseURL}/api/objects/generate-qr/${id}`);
      setObject((prev) => ({ ...prev, qr_image_url: response.data.qr_image_url }));
    } catch (error) {
      console.error('Failed to generate QR code', error);
    } finally {
      setQrCodeLoading(false);
    }
  };

  if (!object) return <p>Loading...</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="container mx-auto p-5">
        <h1 className="text-3xl font-bold mb-4">{object.name}</h1>
        <p className="text-gray-700 mb-2">Kategori: {object.category_name}</p>
        <p className="text-gray-500 mb-4">{object.location}</p>
        <img
          src={`${baseURL}${object.image_url}`}
          alt={object.name}
          className="w-full h-64 object-cover mb-4"
        />
        <p className="text-gray-700">{object.description}</p>
        
        <div className="mt-5">
          <h2 className="text-2xl font-semibold mb-2">QR Code</h2>
          {object.qr_image_url ? (
            <img
              src={`${baseURL}${object.qr_image_url}`}
              alt="QR Code"
              className="w-48 h-48 object-contain mb-4"
            />
          ) : (
            <p className="text-gray-500">QR Code belum tersedia.</p>
          )}
          <button
            onClick={handleGenerateQRCode}
            disabled={qrCodeLoading}
            className={`px-4 py-2 mt-2 text-white ${qrCodeLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} rounded`}
          >
            {qrCodeLoading ? 'Generating...' : 'Generate QR Code'}
          </button>
        </div>
      </div>
    </div>
  );
}





// 'use client';

// import { useState, useEffect } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import axios from 'axios';
// import Sidebar from "../../components/sidebar";


// export default function DetailObjectPage() {
//   const [object, setObject] = useState(null);
//   const { id } = useParams(); // Gunakan useParams untuk mendapatkan id dari URL
//   const router = useRouter();
//   const baseURL = 'http://localhost:9977';

//   useEffect(() => {
//     if (id) {
//       fetchObjectDetail(id);
//     }
//   }, [id]);

//   const fetchObjectDetail = async (objectId) => {
//     try {
//       const response = await axios.get(`${baseURL}/api/objects/get-by-id/${objectId}`);
//       console.log(response.data);
//       setObject(response.data);
//     } catch (error) {
//       console.error('Failed to fetch object detail', error);
//     }
//   };

//   if (!object) return <p>Loading...</p>;

//   return (
//     <div className="flex">
//       <Sidebar />
//         <div className="container mx-auto p-5">
//         <h1 className="text-3xl font-bold mb-4">{object.name}</h1>
//         <p className="text-gray-700 mb-2">Kategori: {object.category_name}</p>
//         <p className="text-gray-500 mb-4">{object.location}</p>
//         <img src={`${baseURL}${object.image_url}`} alt={object.name} className="w-full h-64 object-cover mb-4" />
//         <p className="text-gray-700">{object.description}</p>
//         </div>
//     </div>
//   );
// }
