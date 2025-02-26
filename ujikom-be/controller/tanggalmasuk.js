import tanggalmasuk from "../models/tanggalmasuk.js";

export const getAllmasuk = async (req, res) => {
    try{
        const datamasuk = await tanggalmasuk.findAll();
        res.status(200).json(datamasuk)
    } catch(error){
        res.status(500).json({error: error.message, message: "terjadi kesalahan saat getAlltanggalmasuk"})
    }
};

export const getmasukById = async (req, res) => {
    try {
        const {id} = req.params; 
        const getmasuk = await tanggalmasuk.findByPk(parseInt(id)); 
        if (!getmasuk) {
            return res.status(404).json({ message: "tanggal masuk tidak ditemukan" });
        }
        res.status(200).json(getmasuk);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil id", error: error.message });
    }
};

export const createmasuk = async (req, res) => {
    try{
        const { nama, akun, tanggal } = req.body;
        const masuk = await tanggalmasuk.create({ nama, akun, tanggal });
        res.status(200).json(masuk);
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal membuat create tanggal masuk"})
    }
}

export const updatemasuk = async (req, res) => {
    try{
        const { id } = req.params;
        const { nama, akun, tanggal } = req.body;
        const [updated] = await tanggalmasuk.update({ nama, akun, tanggal }, { where: { id } });
        const updatedmasuk = await tanggalmasuk.findByPk(id);
        if (updated === 0){
            res.status(404).json({error: "Data tidak ditemukan", message: "tanggal masuk tidak ter-update"})
        }else{
            res.status(200).json(updatedmasuk);
        }
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal mengupdate tanggal masuk"})
    }
}

export const deletemasuk = async (req, res) => {
    try{
        const { id } = req.params;
        const deleted = await tanggalmasuk.destroy({where: {id}});
        res.status(200).json(deleted + ` Tanggal masuk ke ${id} berhasil diusir`)
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal menghapus Tanggal masuk"})
    }
} 

export default tanggalmasuk