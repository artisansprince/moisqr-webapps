'use client';  // Menandakan bahwa ini adalah Client Component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // Import useRouter dari next/router
import axios from 'axios';

const ObjectDetails = () => {
  const [object, setObject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();  // Menggunakan useRouter() untuk mendapatkan ID dari URL
  const { id } = router.query;  // Mendapatkan ID dari URL

  useEffect(() => {
    if (!id) return;  // Jika id belum tersedia, tidak perlu melakukan fetching

    const fetchObjectData = async () => {
      try {
        const response = await axios.get(`http://localhost:9977/api/public/objects/get-by-id/${id}`);
        setObject(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchObjectData();
  }, [id]);  // Menjalankan efek setiap kali ID berubah

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{object?.name}</h1>
      <p>{object?.description}</p>
      <img src={`http://localhost:9977${object?.image_url}`} alt={object?.name} />
      <p>Location: {object?.location}</p>
      <p>Category ID: {object?.category_id}</p>
      <p>Category Name: {object?.category_name}</p>
      <p>Created at: {new Date(object?.created_at).toLocaleString()}</p>
      <p>Updated at: {new Date(object?.updated_at).toLocaleString()}</p>
    </div>
  );
};

export default ObjectDetails;
