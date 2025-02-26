import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TanggalMasuk() {
  const [tanggalMasuks, setTanggalMasuks] = useState([]);
  const [newTanggalMasuk, setNewTanggalMasuk] = useState({ nama: '', akun: '', tanggal: '' });
  const [editingTanggalMasuk, setEditingTanggalMasuk] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTanggalMasuks();
  }, []);

  const fetchTanggalMasuks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Masuk');
      setTanggalMasuks(response.data);
    } catch (error) {
      setError('Failed to fetch data. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTanggalMasuk) {
      setEditingTanggalMasuk({ ...editingTanggalMasuk, [name]: value });
    } else {
      setNewTanggalMasuk({ ...newTanggalMasuk, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/Masuk/create', newTanggalMasuk);
      setNewTanggalMasuk({ nama: '', akun: '', tanggal: '' });
      fetchTanggalMasuks();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  };

  const handleEdit = (tanggalMasuk) => {
    setEditingTanggalMasuk(tanggalMasuk);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editingTanggalMasuk) return;
    try {
      await axios.put(`http://localhost:3001/Masuk/update/${editingTanggalMasuk.id}`, editingTanggalMasuk);
      setEditingTanggalMasuk(null);
      fetchTanggalMasuks();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/Masuk/delete/${id}`);
      fetchTanggalMasuks();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setEditingTanggalMasuk(null);
    setNewTanggalMasuk({ nama: '', akun: '', tanggal: '' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTanggalMasuk(null);
    setNewTanggalMasuk({ nama: '', akun: '', tanggal: '' });
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold mb-4">Tanggal Masuk List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleShowModal}
      >
        Add Tanggal Masuk
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
            {tanggalMasuks.map((item) => (
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
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-medium mb-4">{editingTanggalMasuk ? 'Edit' : 'Add'} Tanggal Masuk</h3>
            <form onSubmit={editingTanggalMasuk ? handleUpdate : handleAdd}>
              <input type="text" name="nama" value={editingTanggalMasuk?.nama || newTanggalMasuk.nama} onChange={handleInputChange} placeholder="Nama" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" required />
              <input type="text" name="akun" value={editingTanggalMasuk?.akun || newTanggalMasuk.akun} onChange={handleInputChange} placeholder="Akun" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" required />
              <input type="date" name="tanggal" value={editingTanggalMasuk?.tanggal || newTanggalMasuk.tanggal} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2" required />
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{editingTanggalMasuk ? 'Update' : 'Add'}</button>
                <button type="button" onClick={handleCloseModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TanggalMasuk;
