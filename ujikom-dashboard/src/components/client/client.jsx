import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Client() {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({ nama: '', akun: '' });
  const [editingClient, setEditingClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
        const response = await axios.get('http://localhost:3001/Client');
        console.log('Fetched clients:', response.data); // Log data klien
        setClients(response.data);
    } catch (error) {
        console.error('Error fetching clients:', error);
        setError('Failed to fetch clients. Please try again.');
    }
};


  const handleInputChange = (e) => {
    const { name, value } = e.target; // Corrected from 'nama' to 'name' to match the standard HTML attribute
    if (editingClient) {
      setEditingClient({ ...editingClient, [name]: value });
    } else {
      setNewClient({ ...newClient, [name]: value });
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newClient.nama || !newClient.akun) {
      alert('Please fill in all the fields before adding a client.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/Client/create', newClient);
      setNewClient({ nama: '', akun: '' });
      fetchClients();
      handleCloseModal(); // Menutup modal setelah menambah klien
    } catch (error) {
      console.error('Error adding client:', error);
    }
  };

  const handleEdit = (client) => {
    console.log('Editing client:', client);
    if (!client.id) {
      console.error('Client ID is missing!');
    } else {
      console.log('Client ID is:', client.id);
    }
    setEditingClient({ ...client, clientId: client.id }); // Pasti clientId diset dengan client.id
    setShowModal(true);
  };
  
  

  const handleUpdate = async () => {
    if (!editingClient || !editingClient.clientId) {
      console.error('Editing client or client ID is undefined');
      return;
    }
  
    console.log('Updating client with ID:', editingClient.clientId);
    console.log('Client data being sent:', editingClient);
  
    try {
      const response = await axios.put(`http://localhost:3001/Client/update/${editingClient.clientId}`, editingClient);
  
      if (response.status === 200) {
        console.log('Client updated successfully:', response.data);
        setEditingClient(null);
        fetchClients();
        handleCloseModal();
      } else {
        console.error('Update failed with status:', response.status, response.data);
      }
    } catch (error) {
      console.error('Error updating client:', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        alert("You are logged out, please log in again."); // Notify user
        // Handle logout logic if necessary
      }
    }
  };
  
  
  

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Client ID is undefined or null');
      return; // Menghentikan eksekusi jika id tidak ada
    }
  
    try {
      console.log('Attempting to delete client with ID:', id); // Log ID yang akan dihapus
      const response = await axios.delete(`http://localhost:3001/Client/delete/${id}`);
  
      if (response.status === 200) {
        console.log('Client deleted successfully');
        fetchClients(); // Memperbarui daftar klien setelah penghapusan
      } else {
        console.error('Error deleting client:', response);
      }
    } catch (error) {
      console.error('Error in delete request:', error);
    }
  };
  


  const handleShowModal = () => {
    setShowModal(true);
    setEditingClient(null);
    setNewClient({ nama: '', akun: '' }); // Reset form saat menambah klien baru
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingClient(null);
    setNewClient({ nama: '', akun: '' }); // Reset form saat menutup modal
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold mb-4">Client List</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleShowModal} // Memanggil handleShowModal untuk menampilkan modal
      >
        Add Client
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Akun</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
  {clients.map(client => (
    <tr key={client.clientId}>
      <td className="px-6 py-4 whitespace-nowrap">{client.nama}</td>
      <td className="px-6 py-4 whitespace-nowrap">{client.akun}</td>
      <td className="px-6 py-4 whitespace-nowrap ">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
          onClick={() => handleEdit(client)} // Pastikan seluruh objek client diteruskan
        >
          Edit
        </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(client.id)} // Memanggil handleDelete untuk menghapus klien
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
                {editingClient ? 'Edit Client' : 'Add Client'}
              </h3>
              <form className="mt-2 text-left" onSubmit={editingClient ? handleUpdate : handleAdd}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nama">
                    Nama
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="nama"
                    value={editingClient ? editingClient.nama : newClient.nama}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="akun">
                    Akun
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    name="akun"
                    value={editingClient ? editingClient.akun : newClient.akun}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px- rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={editingClient ? handleUpdate : handleAdd}
                  >
                    {editingClient ? 'Update' : 'Add'}
                  </button>
                  <button
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleCloseModal} // Memanggil handleCloseModal untuk menutup modal
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

export default Client;