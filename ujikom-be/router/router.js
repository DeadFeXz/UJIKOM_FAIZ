import express from "express"
import { createWorker, deleteWorker, getAllWorker, getWorkerById, updateWorker } from "../controller/workercontroller.js"
import { createClient, deleteClient, getAllClient, getClientById, updateClient } from "../controller/clientcontroller.js"
import { createTransaksi, deleteTransaksi, getAllTransaksi, getTransaksiById, updateTransaksi, } from "../controller/transaksicontroller.js"
import { createmasuk, deletemasuk, getAllmasuk, getmasukById, updatemasuk } from "../controller/tanggalmasuk.js"
import { createkeluar, deletekeluar, getAllkeluar, getkeluarById, updatekeluar } from "../controller/tanggalkeluar.js"
import { authenticateToken } from '../middleware/authMiddleware.js';
const router = express.Router();

// WORKER
router.get("/Worker", getAllWorker);
router.get("/Worker/find/:id",  getWorkerById);
router.post("/Worker/create",  createWorker);
router.put('/Worker/update/:id',  updateWorker);
router.delete("/Worker/delete/:id",  deleteWorker);

// TRANSAKSI
router.get("/Transaksi", getAllTransaksi);
router.get("/Transaksi/find/:id",  getTransaksiById);
router.post("/Transaksi/create",  createTransaksi);
router.put('/Transaksi/update/:id',  updateTransaksi);
router.delete("/Transaksi/delete/:id",  deleteTransaksi);

// CLIENT
router.get("/Client", getAllClient);
router.get("/Client/find/:id",  getClientById);
router.post("/Client/create",  createClient);
router.put("/Client/update/:id",  updateClient);
router.delete("/Client/delete/:id",  deleteClient);

// TANGGAL MASUK
router.get("/Masuk", getAllmasuk);
router.get("/Masuk/find/:id",  getmasukById);
router.post("/Masuk/create",  createmasuk);
router.put("/Masuk/update/:id",  updatemasuk);
router.delete("/Masuk/delete/:id",  deletemasuk);

// TANGGAL KELUAR
router.get("/Keluar", getAllkeluar);
router.get("/Keluar/find/:id",   getkeluarById);
router.post("/Keluar/create",  createkeluar);
router.put("/Keluar/update/:id",  updatekeluar);
router.delete("/Keluar/delete/:id",  deletekeluar);






export default router;