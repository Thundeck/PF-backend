const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EventSchema = new Schema({
  event_date: {
    type: Date,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  img: {
    type: String,
  },
  description: {
    type: String,
    require: true,
  },
});

const Event = mongoose.model("event", EventSchema);

module.exports = Event;
// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//     sequelize.define('event', {
//     id:{
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true
//     },
//     event_date: {
//         type: DataTypes.DATE,
//         allowNull: false,
//     },
//     tittle:{
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     img:{
//         type: DataTypes.STRING,
//     },
//     description:{
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     }
//     },{
//         timestamps: false
//     });
// };
