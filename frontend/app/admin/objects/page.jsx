// app/admin/objects/page.jsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/sidebar";


export default function ObjectsPage() {
  const [objects, setObjects] = useState([]);
  const [newObject, setNewObject] = useState({ name: '', description: '', image_url: '', location: '' });
  const [editingObject, setEditingObject] = useState(null);

  // Base URL API
  const baseURL = 'http://localhost:9977/api'; // Ganti dengan URL API yang sesuai

  // Fetch objek dari API
  useEffect(() => {
    fetchObjects();
  }, []);

  const fetchObjects = async () => {
    try {
      const response = await axios.get(`${baseURL}/objects/get-all`);
      setObjects(response.data);
    } catch (error) {
      console.error('Failed to fetch objects', error);
    }
  };

  const handleCreateObject = async () => {
    try {
      await axios.post(`${baseURL}/objects/create`, newObject);
      setNewObject({ name: '', description: '', image_url: '', location: '' }); // Reset form
      fetchObjects(); // Refresh objek
    } catch (error) {
      console.error('Failed to create object', error);
    }
  };

  const handleDeleteObject = async (id) => {
    try {
      await axios.delete(`${baseURL}/objects/delete/${id}`);
      fetchObjects(); // Refresh objek
    } catch (error) {
      console.error('Failed to delete object', error);
    }
  };

  const handleEditObject = (object) => {
    setEditingObject(object);
  };

  const handleUpdateObject = async () => {
    try {
      await axios.put(`${baseURL}/objects/update/${editingObject.id}`, editingObject);
      setEditingObject(null); // Close edit form
      fetchObjects(); // Refresh objek
    } catch (error) {
      console.error('Failed to update object', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-5">
      <h1 className="text-3xl mb-5">Pengelolaan Objek</h1>

      {/* Form untuk membuat objek baru */}
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
          placeholder="URL Gambar"
          value={newObject.image_url}
          onChange={(e) => setNewObject({ ...newObject, image_url: e.target.value })}
          className="border px-4 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Lokasi objek"
          value={newObject.location}
          onChange={(e) => setNewObject({ ...newObject, location: e.target.value })}
          className="border px-4 py-2 mr-2"
        />
        <button
          onClick={handleCreateObject}
          className="bg-blue-500 text-white px-4 py-2"
        >
          Tambah Objek
        </button>
      </div>

      {/* Form untuk mengedit objek */}
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
            value={editingObject.image_url}
            onChange={(e) => setEditingObject({ ...editingObject, image_url: e.target.value })}
            className="border px-4 py-2 mr-2"
          />
          <input
            type="text"
            value={editingObject.location}
            onChange={(e) => setEditingObject({ ...editingObject, location: e.target.value })}
            className="border px-4 py-2 mr-2"
          />
          <button
            onClick={handleUpdateObject}
            className="bg-yellow-500 text-white px-4 py-2"
          >
            Update Objek
          </button>
        </div>
      )}

      {/* Daftar objek */}
      <div>
        <h2 className="text-2xl mb-3">Daftar Objek</h2>
        <ul>
          {objects.map((object) => (
            <li key={object.id} className="mb-3 flex justify-between items-center">
              <span>{object.name}</span>
              <div>
                <button
                  onClick={() => handleEditObject(object)}
                  className="bg-yellow-500 text-white px-4 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteObject(object.id)}
                  className="bg-red-500 text-white px-4 py-1"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}
