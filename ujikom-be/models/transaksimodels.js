import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Transaksi = db.define(
    'Transaksi',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    nama:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    nominal:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
    
    
},
{
    tableName:'transaksi'
}
)





export default Transaksi;