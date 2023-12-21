const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OBJECT = mongoose.Types.ObjectId;

const ReviewSchema = new Schema({
  comment: {
    type: String,
    require: true,
  },
  rating: {
    type: Number,
    require: true,
    min: 1,
    max: 5,
  },
  complex: {
    type: OBJECT,
    ref: "complex",
  },
  client: {
    type: OBJECT,
    ref: "client",
  },
});

const Review = mongoose.model("review", ReviewSchema);

module.exports = Review;

// const { DataTypes } = require("sequelize");
// // Exportamos una funcion que define el modelo
// // Luego le injectamos la conexion a sequelize.
// module.exports = (sequelize) => {
//   // defino el modelo
//   sequelize.define(
//     "reviews",
//     {
//       id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         allowNull: false,
//         primaryKey: true,
//       },
//       comment: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       rating: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         min: 1,
//         max: 5
//       }
//     }

//   );
// };
