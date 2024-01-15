const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OBJECT = mongoose.Types.ObjectId;
const Float = mongoose.Types.Decimal128;

const CourtSchema = new Schema({
  numberCourt: Number,

  description: String,
  typeCourt: {
    type: OBJECT,
    ref: "typecourt",
  },
  complexId: {
    type: OBJECT,
    ref: "complex",
  },
  img: String,
  price: Float,
  duration_turn: Float,
  active: {
    type: Boolean,
    default: true,
  },
  shifts: {
    type: [OBJECT],
    ref: "shift",
  },
});

const Court = mongoose.model("court", CourtSchema);

module.exports = Court;

// const { DataTypes } = require("sequelize");

// module.exports = (sequelize) => {

//     sequelize.define('court', {
//         id:{
//             type: DataTypes.UUID,
//             defaultValue: DataTypes.UUIDV4,
//             allowNull: false,
//             primaryKey: true
//         },
//         numberCourt:{
//             type: DataTypes.INTEGER,
//             // allowNull: false,
//             // unique: true
//         },
//         description:{
//             type: DataTypes.STRING
//         },
//         type_Court: {
//             type: DataTypes.STRING
//         },
//         price:{
//             type: DataTypes.FLOAT
//         },
//         duration_turn:{
//             type: DataTypes.FLOAT
//         },
//         active: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: true
//         }
//     }
//     ,{
//         timestamps: false
//     }
//     );
// }
