import Client from "../models/clientmodels.js";
import Worker from "../models/workermodels.js";
import Transaksi from "../models/transaksimodels.js";
import TanggalMasuk from "../models/tanggalmasuk.js";
import TanggalKeluar from "../models/tanggalkeluar.js";
import clean from "./helpers/clean.js";

const createSeeder = async () => {
  await clean();

  // Membuat Client
  const client1 = await Client.create({
    nama: "Danis",
    akun: "menari gaming"
  });

  const client2 = await Client.create({
    nama: "Dapnyong",
    akun: "ahcmad Bicycle"
  });

  // Membuat Worker
  const worker = await Worker.create({
    nama: "Zharif"
  });

  // Membuat Transaksi
  const transaksi1 = await Transaksi.create({
    nama: "Transaksi 1",
    nominal: 1000,
    ClientId: client1.id,
    WorkerId: worker.id
  });

  const transaksi2 = await Transaksi.create({
    nama: "Transaksi 2",
    nominal: 2000,
    ClientId: client2.id,
    WorkerId: worker.id
  });

  // Membuat Tanggal Masuk
  const tanggalMasuk1 = await TanggalMasuk.create({
    tanggal: new Date("2024-10-01"),
    TransaksiId: transaksi1.id
  });

  const tanggalMasuk2 = await TanggalMasuk.create({
    tanggal: new Date("2024-10-02"),
    TransaksiId: transaksi2.id
  });

  // Membuat Tanggal Keluar
  const tanggalKeluar1 = await TanggalKeluar.create({
    tanggal: new Date("2024-10-03"),
    TransaksiId: transaksi1.id
  });

  const tanggalKeluar2 = await TanggalKeluar.create({
    tanggal: new Date("2024-10-04"),
    TransaksiId: transaksi2.id
  });

  return {
    client1,
    client2,
    worker,
    transaksi1,
    transaksi2,
    tanggalMasuk1,
    tanggalMasuk2,
    tanggalKeluar1,
    tanggalKeluar2
  };
};

const data = await createSeeder();
console.log(data);
