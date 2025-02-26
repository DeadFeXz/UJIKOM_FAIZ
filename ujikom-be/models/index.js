import { Sequelize } from "sequelize";
import db from "../utils/connection.js"
import Transaksi from "./transaksimodels.js";
import Worker from "./workermodels.js"
import Client from "./clientmodels.js";

// await Client.sync();
// await Transaksi.sync();
// await Worker.sync();
await db.sync();
// await Sequelize.sync({ force: true });  // Akan menghapus dan membuat ulang tabel