
import Client from "../models/clientmodels.js";


export const getAllClient = async (req, res) => {
    try{
        const dataclients = await Client.findAll();
        res.status(200).json(dataclients)
    } catch(error){
        res.status(500).json({error: error.massage, message: "terjadi kesalahan saat getAllClient"})
    }
};


export const getClientById = async (req, res) => {
    try {
        const {nama} = req.params; // Mengambil ID dari parameter URL
        const getclient = await Client.findByPk(parseInt(nama)); // Menggunakan findByPk untuk mencari berdasarkan primary key
        if (!getclient) {
            return res.status(404).json({ message: "Client tidak ditemukan" });
        }
        res.status(200).json(getclient);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil id", error: error.message });
    }
};

export const createClient = async (req, res) => {
    try{
        const { nama, akun } = req.body;
        const client = await Client.create({nama, akun});
        res.status(200).json(client);
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal membuat createClient"})
    }
}

export const updateClient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, akun } = req.body; // Include 'akun' in the update
        const [updated] = await Client.update({ nama, akun }, { where: { id } }); // Update both 'nama' and 'akun'
        
        if (updated === 0) {
            return res.status(404).json({ message: "Client tidak ter-update" }); // Return if no client was updated
        }
        
        const updatedClient = await Client.findByPk(id);
        res.status(200).json(updatedClient);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "gagal mengupdate Client" });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Client.destroy({ where: { id } });
        
        if (deleted === 0) {
            return res.status(404).json({ message: "Client tidak ditemukan" }); // Return if no client was found to delete
        }
        
        res.status(200).json({ message: `Client ke ${id} berhasil diusir` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "gagal menghapus Client" });
    }
}
export default Client