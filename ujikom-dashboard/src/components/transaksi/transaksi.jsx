import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transaksi() {
  const [transaksis, setTransaksis] = useState([]);
  const [newTransaksi, setNewTransaksi] = useState({ nama: '', nominal: '' });
  const [editingTransaksi, setEditingTransaksi] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransaksis();
  }, []);

  const fetchTransaksis = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Transaksi');
      console.log('Fetched transactions:', response.data); // Log data transaksi
      setTransaksis(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      setError('Failed to fetch transactions. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTransaksi) {
      setEditingTransaksi({ ...editingTransaksi, [name]: value });
    } else {
      setNewTransaksi({ ...newTransaksi, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTransaksi.nama || !newTransaksi.nominal) {
      alert('Please fill in all the fields before adding a transaction.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/Transaksi/create', newTransaksi);
      setNewTransaksi({ nama: '', nominal: '' });
      fetchTransaksis();
      handleCloseModal(); // Close modal after adding transaction
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const handleEdit = (transaksi) => {
    console.log('Editing transaction:', transaksi);
    setEditingTransaksi({ ...transaksi, transaksiId: transaksi.id });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editingTransaksi || !editingTransaksi.transaksiId) {
      console.error('Editing transaction or transaction ID is undefined');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3001/Transaksi/update/${editingTransaksi.transaksiId}`, editingTransaksi);

      if (response.status === 200) {
        console.log('Transaction updated successfully:', response.data);
        setEditingTransaksi(null);
        fetchTransaksis();
        handleCloseModal();
      } else {
        console.error('Update failed with status:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error updating transaction:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Transaction ID is undefined or null');
      return;
    }

    try {
      console.log('Attempting to delete transaction with ID:', id);
      const response = await axios.delete(`http://localhost:3001/Transaksi/delete/${id}`);

      if (response.status === 200) {
        console.log('Transaction deleted successfully');
        fetchTransaksis();
      } else {
        console.error('Error deleting transaction:', response);
      }
    } catch (error) {
      console.error('Error in delete request:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setEditingTransaksi(null);
    setNewTransaksi({ nama: '', nominal: '' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingTransaksi(null);
    setNewTransaksi({ nama: '', nominal: '' });
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold mb-4">Transaction List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleShowModal}
      >
        Add Transaction
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nominal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transaksis.map(transaksi => (
              <tr key={transaksi.transaksiId}>
                <td className="px-6 py-4 whitespace-nowrap">{transaksi.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">{transaksi.nominal}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2 pad"
                    onClick={() => handleEdit(transaksi)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(transaksi.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {editingTransaksi ? 'Edit Transaction' : 'Add Transaction'}
              </h3>
              <form className="mt-2 text-left" onSubmit={editingTransaksi ? handleUpdate : handleAdd}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
                    Nama
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="nama"
                    value={editingTransaksi ? editingTransaksi.nama : newTransaksi.nama}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nominal">
                    Nominal
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    name="nominal"
                    value={editingTransaksi ? editingTransaksi.nominal : newTransaksi.nominal}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={editingTransaksi ? handleUpdate : handleAdd}
                  >
                    {editingTransaksi ? 'Update' : 'Add'}
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transaksi;
