import express from "express";
import "./models/index.js";
import router from './router/router.js'
import bodyParser from "body-parser";
import db from "./utils/connection.js";
import cors from "cors"

const app = express();
app.use(cors());

const port = process.env.PORT;

await db.sync();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(port, () => {
  console.log(`Server running in ${port}`);
});