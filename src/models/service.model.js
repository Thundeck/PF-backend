const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  icon: String,
}); ///agregar status para poder deshabilitar el servicio

const Service = mongoose.model("service", ServiceSchema);

module.exports = Service;
// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//     sequelize.define('ServicesComplejo', {
//         id:{
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             allowNull: false,
//             primaryKey: true
//         },
//     nameservice: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },

//     });
// };
