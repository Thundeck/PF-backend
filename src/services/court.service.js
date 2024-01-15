const Court = require("../models/court.model");
const Complex = require("../models/complex.model");
const cloudinary = require("../utils/cluodinary");

const getAllCourt = async () => {
  try {
    const data = await Court.find().populate("shifts");
    if (!data) throw new Error("Data not found");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCourt = async (data) => {
  const { numberCourt, typeCourt, duration_turn, complexId, img, price } = data;
  try {
    const complex = await Complex.findById(complexId);
    if (!complex) throw new Error("Complex not found");
    if (!numberCourt) throw new Error("court number is required");
    if (!price) throw new Error("court price is required");
    if (!typeCourt) throw new Error("court type is required");
    if (!duration_turn) throw new Error("turn duration is required");
    const imageUpload = await cloudinary.uploader.upload(img, {
      folder: "BooKing",
    });
    if (!imageUpload) throw new Error("Image not uploaded");

    const newCourt = await Court.create({
      ...data,
      img: imageUpload?.secure_url,
    });
    if (!newCourt) throw new Error("Object no create");
    const addToComplex = await Complex.findByIdAndUpdate(complex._id, {
      courts: [...complex.courts, newCourt._id],
      typeCourts: [...new Set([...complex.typeCourts, typeCourt])],
    });
    if (!addToComplex) throw new Error("ERRROR - Court not added");

    return "Court succesfully created";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCourtID = async (id) => {
  try {
    if (!id) throw new Error("no ID especified");
    const data = await Court.findById(id).populate("typeCourt shifts");
    if (!data) throw new Error("Court not found");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCourt = async (_id, data) => {
  try {
    const court = await Court.findOne({ _id });
    if (!court) throw new Error("court not found");
    const updatedCourt = await Court.findByIdAndUpdate(_id, { data });
    if (!updatedCourt) throw new Error("Fail to update Court");
    return "Court updated succesfully ";
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCourt = async (_id) => {
  try {
    const deletedCourt = await Court.findByIdAndDelete(_id);
    if (!deletedCourt) throw new Error("ERROR - fail to delete Court");
    return "Court deleted succesfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createCourt,
  getAllCourt,
  getCourtID,
  updateCourt,
  deleteCourt,
};
