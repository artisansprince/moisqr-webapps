'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";

export default function ObjectsPage() {
  const [objects, setObjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newObject, setNewObject] = useState({ name: '', description: '', location: '', category_id: '', images: [] });
  const [editingObject, setEditingObject] = useState(null);
  const [previewImages, setPreviewImages] = useState([]); // Untuk preview gambar saat edit
  const [selectedObject, setSelectedObject] = useState(null); // Untuk menyimpan objek yang dipilih untuk detail

  const baseURL = 'http://localhost:9977/api'; // Ganti dengan URL API yang sesuai

  useEffect(() => {
    fetchObjects();
    fetchCategories();
  }, []);

  const fetchObjects = async () => {
    try {
      const response = await axios.get(`${baseURL}/objects/get-all`);
      setObjects(response.data);
    } catch (error) {
      console.error('Failed to fetch objects', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseURL}/categories/get-all`);
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  const handleCreateObject = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newObject.name);
      formData.append('description', newObject.description);
      formData.append('location', newObject.location);
      formData.append('category_id', newObject.category_id);

      newObject.images.forEach((image) => formData.append('images', image));

      await axios.post(`${baseURL}/objects/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setNewObject({ name: '', description: '', location: '', category_id: '', images: [] });
      fetchObjects();
    } catch (error) {
      console.error('Failed to create object', error);
    }
  };

  const handleDeleteObject = async (id) => {
    try {
      await axios.delete(`${baseURL}/objects/delete/${id}`);
      fetchObjects();
    } catch (error) {
      console.error('Failed to delete object', error);
    }
  };

  const handleEditObject = (object) => {
    setEditingObject({ ...object, images: [] });
    setPreviewImages(object.images || []); // Set gambar yang sudah ada sebagai preview awal
  };

  const handleUpdateObject = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editingObject.name);
      formData.append('description', editingObject.description);
      formData.append('location', editingObject.location);
      formData.append('category_id', editingObject.category_id);

      if (editingObject.images.length > 0) {
        editingObject.images.forEach((image) => formData.append('images', image));
      }

      await axios.put(`${baseURL}/objects/update/${editingObject.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setEditingObject(null);
      setPreviewImages([]);
      fetchObjects();
    } catch (error) {
      console.error('Failed to update object', error);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setNewObject({ ...newObject, images: [...newObject.images, ...files] });
  };

  const handleEditImageChange = (event) => {
    const files = Array.from(event.target.files);
    setEditingObject({ ...editingObject, images: [...editingObject.images, ...files] });
    setPreviewImages([...previewImages, ...files]);
  };

  const handleImagePreview = (images) => {
    return images.map((image, index) => (
      <div key={index} className="inline-block mr-2">
        <img src={URL.createObjectURL(image)} alt={`preview-${index}`} className="w-20 h-20 object-cover" />
      </div>
    ));
  };

  const handleViewDetail = (object) => {
    setSelectedObject(object);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-5 w-full">
        <h1 className="text-3xl mb-5">Pengelolaan Objek</h1>

        <div className="mb-5">
          <input
            type="text"
            placeholder="Nama objek"
            value={newObject.name}
            onChange={(e) => setNewObject({ ...newObject, name: e.target.value })}
            className="border px-4 py-2 mr-2"
          />
          <input
            type="text"
            placeholder="Deskripsi objek"
            value={newObject.description}
            onChange={(e) => setNewObject({ ...newObject, description: e.target.value })}
            className="border px-4 py-2 mr-2"
          />
          <input
            type="text"
            placeholder="Lokasi objek"
            value={newObject.location}
            onChange={(e) => setNewObject({ ...newObject, location: e.target.value })}
            className="border px-4 py-2 mr-2"
          />
          <select
            value={newObject.category_id}
            onChange={(e) => setNewObject({ ...newObject, category_id: e.target.value })}
            className="border px-4 py-2 mr-2"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border px-4 py-2 mr-2"
          />

          <div className="mt-2">
            {handleImagePreview(newObject.images)}
          </div>

          <button onClick={handleCreateObject} className="bg-blue-500 text-white px-4 py-2 mt-4">
            Tambah Objek
          </button>
        </div>

        {editingObject && (
          <div className="mb-5">
            <input
              type="text"
              value={editingObject.name}
              onChange={(e) => setEditingObject({ ...editingObject, name: e.target.value })}
              className="border px-4 py-2 mr-2"
            />
            <input
              type="text"
              value={editingObject.description}
              onChange={(e) => setEditingObject({ ...editingObject, description: e.target.value })}
              className="border px-4 py-2 mr-2"
            />
            <input
              type="text"
              value={editingObject.location}
              onChange={(e) => setEditingObject({ ...editingObject, location: e.target.value })}
              className="border px-4 py-2 mr-2"
            />
            <select
              value={editingObject.category_id}
              onChange={(e) => setEditingObject({ ...editingObject, category_id: e.target.value })}
              className="border px-4 py-2 mr-2"
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleEditImageChange}
              className="border px-4 py-2 mr-2"
            />

            <div className="mt-2">
              {handleImagePreview(previewImages)}
            </div>

            <button onClick={handleUpdateObject} className="bg-yellow-500 text-white px-4 py-2">
              Update Objek
            </button>
          </div>
        )}

        <div>
          <h2 className="text-2xl mb-3">Daftar Objek</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {objects.map((object) => (
              <div key={object.id} className="border rounded-lg overflow-hidden shadow-lg bg-white">
                <img
                  src={object.images?.[0]?.url || '/placeholder.jpg'} // Ganti '/placeholder.jpg' dengan gambar default jika tidak ada gambar
                  alt={object.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{object.name}</h3>
                  <p className="text-gray-500 mb-2">Kategori: {object.category?.name}</p>
                  <p className="text-gray-700 mb-4 truncate">{object.description}</p>
                  <button
                    onClick={() => handleViewDetail(object)}
                    className="text-blue-500 hover:underline"
                  >
                    Lihat Detail
                  </button>
                  <button
                    onClick={() => handleEditObject(object)}
                    className="ml-2 text-yellow-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteObject(object.id)}
                    className="ml-2 text-red-500 hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedObject && (
          <div className="mt-5 p-5 border rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-semibold">{selectedObject.name}</h3>
            <img
              src={selectedObject.images?.[0]?.url || '/placeholder.jpg'}
              alt={selectedObject.name}
              className="w-full h-64 object-cover mt-3"
            />
            <p className="mt-3">{selectedObject.description}</p>
            <p className="mt-3">Lokasi: {selectedObject.location}</p>
            <p className="mt-3">Kategori: {selectedObject.category?.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
