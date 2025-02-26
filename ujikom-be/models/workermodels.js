import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Transaksi from "../controller/transaksicontroller.js"
import Client from "./clientmodels.js";
const Worker = db.define(
    'Worker',{
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
    
},
{
    tableName:'Worker'
}
)

Client.hasMany(Transaksi,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})
Transaksi.belongsTo(Client,{
    foreignKey: 'ClientId',
   
})
Worker.hasMany(Transaksi,{
    onDelete:'CASCADE',
    onUpdate:'CASCADE',
})
Transaksi.belongsTo(Worker,{
    foreignKey: 'WorkerId',
    
})



export default Worker;