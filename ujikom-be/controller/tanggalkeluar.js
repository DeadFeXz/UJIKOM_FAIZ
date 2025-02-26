import tanggalkeluar from "../models/tanggalkeluar.js";

export const getAllkeluar = async (req, res) => {
    try {
        const datakeluar = await tanggalkeluar.findAll();
        res.status(200).json(datakeluar);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Terjadi kesalahan saat getAlltanggalkeluar" });
    }
};

export const getkeluarById = async (req, res) => {
    try {
        const { id } = req.params;
        const getkeluar = await tanggalkeluar.findByPk(parseInt(id));
        if (!getkeluar) {
            return res.status(404).json({ message: "Tanggal keluar tidak ditemukan" });
        }
        res.status(200).json(getkeluar);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil id", error: error.message });
    }
};

export const createkeluar = async (req, res) => {
    try {
        const { nama, akun, tanggal } = req.body;
        const keluar = await tanggalkeluar.create({ nama, akun, tanggal });
        res.status(200).json(keluar);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal membuat tanggal keluar" });
    }
};

export const updatekeluar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, akun, tanggal } = req.body;
        const [updated] = await tanggalkeluar.update({ nama, akun, tanggal }, { where: { id } });
        const updatedkeluar = await tanggalkeluar.findByPk(id);
        if (updated === 0) {
            return res.status(404).json({ message: "Tanggal keluar tidak ter-update" });
        }
        res.status(200).json(updatedkeluar);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal mengupdate tanggal keluar" });
    }
};

export const deletekeluar = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await tanggalkeluar.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: "Tanggal keluar tidak ditemukan" });
        }
        res.status(200).json({ message: `Tanggal keluar dengan ID ${id} berhasil dihapus` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal menghapus tanggal keluar" });
    }
};

export default tanggalkeluar;
