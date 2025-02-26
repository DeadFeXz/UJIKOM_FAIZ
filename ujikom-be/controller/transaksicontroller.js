import Transaksi from "../models/transaksimodels.js";


export const getAllTransaksi = async (req, res) => {
    try{
        const datatransaksi = await Transaksi.findAll();
        res.status(200).json(datatransaksi)
    } catch(error){
        console.log(error)
        res.status(500).json({error: error.massage, message: "terjadi kesalahan saat getAllTransaksi"})
    }
};

export const getTransaksiById = async (req, res) => {
    try {
        const {id} = req.params; // Mengambil ID dari parameter URL
        const gettransaksi = await Transaksi.findByPk(id); // Menggunakan findByPk untuk mencari berdasarkan primary key
        if (!Transaksi) {
            return res.status(404).json({ message: "Transaksi tidak ditemukan" });
        }
        res.status(200).json(gettransaksi);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil id", error: error.message });
    }
};

export const createTransaksi = async (req, res) => {
    try{
        const { nama, nominal } = req.body;
        const transaksi = await Transaksi.create({nama, nominal});
        res.status(200).json(transaksi);
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal membuat createTransaksi"})
    }
}

export const updateTransaksi = async (req, res) => {
    try{
        const { id } = req.params;
        const { nama, nominal } = req.body;
        const [updated] = await Transaksi.update({ nama, nominal }, { where: { id } });
        const updatedTranskasi = await Transaksi.findByPk(id);
        // JIKA TIDAK ADA YANG TERUPDATE MAKA AKAN ERROR
        if (updated === 0){
            res.status(404).json({error: error.message, message: "Transaksi tidak ter-update"})
        }else{
            res.status(200).json(updatedTranskasi);
        }
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal mengupdate Transaksi"})
    }
}

export const deleteTransaksi = async (req, res) => {
    try{
        const { id } = req.params;
        const deleted = await Transaksi.destroy({where: {id}});
        res.status(200).json(deleted + ` Transaksi ke ${id} berhasil diusir`)
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal menghapus Transaksi"})
    }
} 

export default Transaksi