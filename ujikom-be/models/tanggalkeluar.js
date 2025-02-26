import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Transaksi from "./transaksimodels.js";


const keluar = db.define(
    'keluar',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    nama: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    akun: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tanggal:{
        type:DataTypes.STRING
    }
    
},
{
    tableName:'tanggal keluar'
}
)



Transaksi.hasOne(keluar,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})
Transaksi.belongsTo(keluar,{
    foreignKey: 'keluarId',
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})



export default keluar;