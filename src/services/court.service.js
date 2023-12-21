const Court = require("../models/court.model");
const Complex = require("../models/complex.model");

const getAllCourt = async () => {
  try {
    const data = await Court.find().populate("shifts");
    if (!data) throw "Data not found";
    return data;
  } catch (error) {
    throw error;
  }
};

const createCourt = async (data) => {
  const { numberCourt, typeCourt, duration_turn, complexId } = data;
  try {
    const complex = await Complex.findById({ _id: complexId });
    if (!complex) throw "Complex not found";
    if (!numberCourt) throw "court number is required";
    if (!typeCourt) throw "court type is required";
    if (!duration_turn) throw "turn duration is required";
    const newCourt = await Court.create(data);
    if (!newCourt) throw "Object no create";
    const addToComplex = Complex.findOneAndUpdate(
      { _id },
      { courts: [...complex.courts, newCourt._id] }
    );
    if (!addToComplex) throw "ERRROR - Court not added";

    return "Court succesfully created";
  } catch (error) {
    throw error;
  }
};

const getCourtID = async (_id) => {
  try {
    if (!id) throw "no ID especified";
    const data = await Court.findById({ _id }).populate("typeCourt shifts");
    if (!data) throw "Court not found";
    return data;
  } catch (error) {
    throw error;
  }
};

const updateCourt = async (_id, data) => {
  try {
    const court = await Court.findOne({ _id });
    if (!court) throw "court not found";
    const updatedCourt = await Court.findOneAndUpdate({ _id }, { data });
    if (!updatedCourt) throw "Fail to update Court";
    return "Court updated succesfully ";
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteCourt = async (_id) => {
  try {
    const deletedCourt = await Court.findByIdAndDelete({ _id });
    if (!deletedCourt) throw "ERROR - fail to delete Court";
    return "Court deleted succesfully";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createCourt,
  getAllCourt,
  getCourtID,
  updateCourt,
  deleteCourt,
};
