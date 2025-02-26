import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Transaksi from "./transaksimodels.js";

const masuk = db.define(
    'masuk', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        akun: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tanggal: {
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'tanggal_masuk'
    }
);

Transaksi.hasOne(masuk, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Transaksi.belongsTo(masuk, {
    foreignKey: 'masukId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export default masuk;
