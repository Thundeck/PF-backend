const mongoose = require("mongoose");
const Court = require("./court.model");

const Schema = mongoose.Schema;

const OBJECT = mongoose.Types.ObjectId;

const ShiftSchema = new Schema({
  date: {
    type: String,
    require: true,
  },
  court: {
    type: OBJECT,
    ref: "court",
  },
  client: {
    type: OBJECT,
    ref: "client",
  },
  complex: {
    type: OBJECT,
    ref: "complex",
  },
  state: {
    type: Boolean,
    default: false,
  },
});

const Shift = mongoose.model("shift", ShiftSchema);

module.exports = Shift;

// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//     sequelize.define('turno', {
//     id:{
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true
//     },
//     date: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//     },
//     time_start:{
//         type: DataTypes.TIME,
//         allowNull: false,
//     },
//     state: {
//         type: DataTypes.STRING,
//         defaultValue: "reserved"
//     }
//     },{
//         timestamps: false
//     });
// };
