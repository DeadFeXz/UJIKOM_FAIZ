import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Worker() {
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({ nama: '' });
  const [editingWorker, setEditingWorker] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchWorkers();
  }, []);

  const fetchWorkers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Worker');
      console.log('Fetched workers:', response.data);
      setWorkers(response.data);
    } catch (error) {
      console.error('Error fetching workers:', error);
      setError('Failed to fetch workers. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingWorker) {
      setEditingWorker({ ...editingWorker, [name]: value });
    } else {
      setNewWorker({ ...newWorker, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newWorker.nama) {
      alert('Please fill in the name before adding a worker.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/Worker/create', newWorker);
      setNewWorker({ nama: '' });
      fetchWorkers();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding worker:', error);
    }
  };

  const handleEdit = (worker) => {
    console.log('Editing worker:', worker);
    if (!worker.id) {
      console.error('Worker ID is missing!');
    } else {
      console.log('Worker ID is:', worker.id);
    }
    setEditingWorker({ ...worker, workerId: worker.id });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editingWorker || !editingWorker.workerId) {
      console.error('Editing worker or worker ID is undefined');
      return;
    }

    console.log('Updating worker with ID:', editingWorker.workerId);
    console.log('Worker data being sent:', editingWorker);

    try {
      const response = await axios.put(`http://localhost:3001/Worker/update/${editingWorker.workerId}`, editingWorker);

      if (response.status === 200) {
        console.log('Worker updated successfully:', response.data);
        setEditingWorker(null);
        fetchWorkers();
        handleCloseModal();
      } else {
        console.error('Update failed with status:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error updating worker:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Worker ID is undefined or null');
      return;
    }

    try {
      console.log('Attempting to delete worker with ID:', id);
      const response = await axios.delete(`http://localhost:3001/Worker/delete/${id}`);

      if (response.status === 200) {
        console.log('Worker deleted successfully');
        fetchWorkers();
      } else {
        console.error('Error deleting worker:', response);
      }
    } catch (error) {
      console.error('Error in delete request:', error);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setEditingWorker(null);
    setNewWorker({ nama: '' });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingWorker(null);
    setNewWorker({ nama: '' });
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold mb-4">Worker List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleShowModal}
      >
        Add Worker
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {workers.map(worker => (
              <tr key={worker.workerId}>
                <td className="px-6 py-4 whitespace-nowrap">{worker.nama}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => handleEdit(worker)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(worker.id)}
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
                {editingWorker ? 'Edit Worker' : 'Add Worker'}
              </h3>
              <form className="mt-2 text-left" onSubmit={editingWorker ? handleUpdate : handleAdd}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
                    Nama
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="nama"
                    value={editingWorker ? editingWorker.nama : newWorker.nama}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={editingWorker? handleUpdate : handleAdd}
                  >
                    {editingWorker ? 'Update' : 'Add'}
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

export default Worker;
