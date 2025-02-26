import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TanggalKeluar() {
  const [tanggalKeluars, setTanggalKeluars] = useState([]);
  const [newTanggalKeluar, setNewTanggalKeluar] = useState({ tanggal: '', nama: '', akun: '' });
  const [editingTanggalKeluar, setEditingTanggalKeluar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTanggalKeluars();
  }, []);

  const fetchTanggalKeluars = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Keluar');
      setTanggalKeluars(response.data);
    } catch (error) {
      setError('Failed to fetch exit dates. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTanggalKeluar) {
      setEditingTanggalKeluar({ ...editingTanggalKeluar, [name]: value });
    } else {
      setNewTanggalKeluar({ ...newTanggalKeluar, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTanggalKeluar.tanggal || !newTanggalKeluar.nama || !newTanggalKeluar.akun) {
      alert('Please fill in all fields before adding.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/Keluar/create', newTanggalKeluar);
      setNewTanggalKeluar({ tanggal: '', nama: '', akun: '' });
      fetchTanggalKeluars();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding exit date:', error);
    }
  };

  const handleEdit = (tanggalKeluar) => {
    setEditingTanggalKeluar({ ...tanggalKeluar });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editingTanggalKeluar || !editingTanggalKeluar.id) return;
    try {
      await axios.put(`http://localhost:3001/Keluar/update/${editingTanggalKeluar.id}`, editingTanggalKeluar);
      setEditingTanggalKeluar(null);
      fetchTanggalKeluars();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating exit date:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/Keluar/delete/${id}`);
      fetchTanggalKeluars();
    } catch (error) {
      console.error('Error deleting exit date:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setEditingTanggalKeluar(null);
    setNewTanggalKeluar({ tanggal: '', nama: '', akun: '' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTanggalKeluar(null);
    setNewTanggalKeluar({ tanggal: '', nama: '', akun: '' });
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold mb-4">Tanggal Keluar</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={handleShowModal}>
        Add Tanggal Keluar
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akun</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tanggalKeluars.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.akun}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(item.tanggal).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2" onClick={() => handleEdit(item)}>Edit</button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold">{editingTanggalKeluar ? 'Edit' : 'Add'} Tanggal Keluar</h3>
            <form onSubmit={editingTanggalKeluar ? handleUpdate : handleAdd}>
              <input className="w-full p-2 border rounded my-2" type="text" name="nama" placeholder="Nama" value={editingTanggalKeluar ? editingTanggalKeluar.nama : newTanggalKeluar.nama} onChange={handleInputChange} required />
              <input className="w-full p-2 border rounded my-2" type="text" name="akun" placeholder="Akun" value={editingTanggalKeluar ? editingTanggalKeluar.akun : newTanggalKeluar.akun} onChange={handleInputChange} required />
              <input className="w-full p-2 border rounded my-2" type="date" name="tanggal" value={editingTanggalKeluar ? editingTanggalKeluar.tanggal : newTanggalKeluar.tanggal} onChange={handleInputChange} required />
              <div className="flex justify-between">
                <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">{editingTanggalKeluar ? 'Update' : 'Add'}</button>
                <button className="bg-gray-500 text-white px-4 py-2 rounded" type="button" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TanggalKeluar;
