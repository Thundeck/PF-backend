const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OBJECT = mongoose.Types.ObjectId;
const Float = mongoose.Types.Decimal128;

const ComplexSchema = new Schema({
  name: String,
  cuit: String,
  logo: String,
  imgs: [String],
  address: String,
  city: String,
  province: String,
  lat: String,
  lng: String,
  website: String,
  owner: OBJECT,
  deleted: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
  open_days: {
    type: [String],
    require: true,
  },
  time_work: {
    type: [String],
    require: true,
  },
  recaudado: Number,
  services: {
    type: [OBJECT],
    ref: "service",
  },
  events: {
    type: [OBJECT],
    ref: "event",
  },
  courts: {
    type: [OBJECT],
    ref: "court",
  },
  clients: {
    type: [OBJECT],
    ref: "client",
  },
  typeCourts: {
    type: [OBJECT],
    ref: "typecourt",
  },
  shifts: {
    type: [OBJECT],
    ref: "shift",
  },
  reviews: {
    //reviews que recibe
    type: [OBJECT],
    ref: "review",
  },
  like: {
    type: Float,
    min: 1,
    max: 5,
    default: 0.0,
  },
});

const Complex = mongoose.model("complex", ComplexSchema);

module.exports = Complex;

// const { DataTypes } = require('sequelize');
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//     sequelize.define('complejo', {
//     id:{
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: DataTypes.STRING,
//     },
//     cuit:{
//         type: DataTypes.STRING,
//     },
//     logo:{
//         type: DataTypes.STRING,
//     },
//     address:{
//         type: DataTypes.STRING,
//     },
//     city:{
//         type: DataTypes.STRING
//     },
//     lat: {
//         type: DataTypes.FLOAT
//     },
//     lng:{
//         type: DataTypes.FLOAT
//     },
//     website:{
//         type: DataTypes.STRING
//     },
//     deleted:{
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     },
//     active:{
//         type: DataTypes.BOOLEAN,
//         defaultValue: true
//     },
//     recaudado:{
//         type: DataTypes.INTEGER
//     }
//     },{
//         timestamps: false
//     });
// };
