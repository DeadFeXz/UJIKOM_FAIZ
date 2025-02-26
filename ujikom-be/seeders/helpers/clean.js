import Client from "../models/clientmodels.js";
import Worker from "../models/workermodels.js";
import Transaksi from "../models/transaksimodels.js";
import TanggalMasuk from "../models/tanggalmasuk.js";
import TanggalKeluar from "../models/tanggalkeluar.js";

export default async function clean() {
  await Client.destroy({
    where: {},
    force: true,
    cascade: true,
  });
  
  await Worker.destroy({
    where: {},
    force: true,
    cascade: true,
  });
  
  await Transaksi.destroy({
    where: {},
    force: true,
    cascade: true,
  });
  
  await TanggalMasuk.destroy({
    where: {},
    force: true,
    cascade: true,
  });
  
  await TanggalKeluar.destroy({
    where: {},
    force: true,
    cascade: true,
  });
}