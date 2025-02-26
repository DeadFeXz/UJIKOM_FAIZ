 import { DataTypes } from "sequelize";
import db from "../utils/connection.js";


const Client = db.define(
    'Client',{
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
    akun:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
},
{
    tableName:'client'
}
)


// Worker.hasMany(Transaksi,{
//     onDelete:'CASCADE',
//     onUpdate:'CASCADE',
// })
// Transaksi.belongsTo(Worker,{
//     foreignKey: 'WorkerId',
//     onDelete:'CASCADE',
//     onUpdate:'CASCADE',
// })




export default Client;