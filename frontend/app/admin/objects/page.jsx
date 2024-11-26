'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

const ObjectsPage = () => {
  const [objects, setObjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    category_id: '',
    images: null,
  });
  const [editObject, setEditObject] = useState(null);

  const baseURL = 'http://localhost:9977';

  // Fetch data objek dan kategori
  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/objects/get-all`);
        console.log(response.data);
        setObjects(response.data);
      } catch (error) {
        console.error('Error fetching objects:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/categories/get-all`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchObjects();
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file input change (images)
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  // Handle form submit (Create Object)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('location', formData.location);
    form.append('category_id', formData.category_id);
    if (formData.images) {
      for (let i = 0; i < formData.images.length; i++) {
        form.append('images', formData.images[i]);
      }
    }

    try {
      if (editObject) {
        // Update object
        await axios.put(`${baseURL}/api/objects/update/${editObject.id}`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setEditObject(null);
      } else {
        // Create object
        await axios.post(`${baseURL}/api/objects/create`, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      setShowModal(false);
      setFormData({ name: '', description: '', location: '', category_id: '', images: null });
      // Refetch objects
      const response = await axios.get(`${baseURL}/api/objects/get-all`);
      setObjects(response.data);
    } catch (error) {
      console.error('Error creating or updating object:', error);
    }
  };

  // Handle Delete Object
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/api/objects/delete/${id}`);
      // Refetch objects
      const response = await axios.get(`${baseURL}/api/objects/get-all`);
      setObjects(response.data);
    } catch (error) {
      console.error('Error deleting object:', error);
    }
  };

  // Handle Edit Object
  const handleEdit = (object) => {
    setEditObject(object);
    setFormData({
      name: object.name,
      description: object.description,
      location: object.location,
      category_id: object.category_id,
      images: null,
    });
    setShowModal(true);
  };

  // Handle View Object (Detail)
  const handleView = (id) => {
    // Redirect to view detail page (you can replace with dynamic routing)
    window.location.href = `/admin/objects/${id}`;
  };

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => {
          setShowModal(true);
          setEditObject(null);
        }}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Add Object
      </button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {objects.map((object) => (
          <div key={object.id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">{object.name}</h3>
            <img  src={`${baseURL}${object.image_url}`}  alt={object.name} className="w-full h-40 object-cover mt-2 rounded" />
            <p>{object.description}</p>
            <div className="mt-2">
              <button
                onClick={() => handleView(object.id)}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                View
              </button>
              <button
                onClick={() => handleEdit(object)}
                className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(object.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Adding or Editing Object */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{editObject ? 'Edit Object' : 'Add New Object'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Category</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Images</label>
                <input
                  type="file"
                  name="images"
                  multiple
                  onChange={handleFileChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  {editObject ? 'Update Object' : 'Add Object'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectsPage;
