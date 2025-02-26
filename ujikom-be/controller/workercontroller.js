import Transaksi from "../controller/transaksicontroller.js"
import client from "../controller/clientcontroller.js"
import Workercontroller from "../controller/workercontroller.js"
import Client from "../models/clientmodels.js";
import Worker from "../models/workermodels.js";



export const getAllWorker = async (req, res) => {
    try{
        const dataworker = await Worker.findAll();
        res.status(200).json(dataworker)
    } catch(error){
        res.status(500).json({error: error.massage, message: "terjadi kesalahan saat getAllWorker"})
    }
};

export const getWorkerById = async (req, res) => {
    try {
        const {id} = req.params; // Mengambil ID dari parameter URL
        const worker = await Worker.findByPk(id); // Menggunakan findByPk untuk mencari berdasarkan primary key
        if (!worker) {
            return res.status(404).json({ message: "Worker tidak ditemukan" });
        }
        res.status(200).json(worker);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil id", error: error.message });
    }
};

export const createWorker = async (req, res) => {
    try{
        const { nama } = req.body;
        const worker = await Worker.create({nama});
        res.status(200).json(worker);
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal membuat createWorker"})
    }
}

export const updateWorker = async (req, res) => {
    try{
        const { id } = req.params;
        const { nama } = req.body;
        const [updated] = await Worker.update({ nama }, { where: { id } });
        const updatedWorker = await Worker.findByPk(id);
        // JIKA TIDAK ADA YANG TERUPDATE MAKA AKAN ERROR
        if (updated === 0){
            res.status(404).json({error: error.message, message: "Worker tidak ter-update"})
        }else{
            res.status(200).json(updatedWorker);
        }
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal mengupdate Worker"})
    }
}

export const deleteWorker = async (req, res) => {
    try{
        const { id } = req.params;
        const deleted = await Worker.destroy({where: {id}});
        res.status(200).json(deleted + ` Worker ke ${id} berhasil diusir`)
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal menghapus Worker"})
    }
}

export default Worker