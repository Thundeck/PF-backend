const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TypeCourtSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  icon: String,
}); ///agregar status para poder deshabilitar el typeCourt

const TypeCourt = mongoose.model("typecourt", TypeCourtSchema);

module.exports = TypeCourt;

// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//     sequelize.define('typeCourt', {
//     id:{
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     icon: {
//         type: DataTypes.STRING
//     }
//     },{
//         timestamps: false
//     }
//     );
// };
