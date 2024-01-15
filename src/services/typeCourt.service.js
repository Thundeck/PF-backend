const TypeCourt = require("../models/typeCourt.model");
const cloudinary = require("../utils/cluodinary");
const getAllTypeCourt = async () => {
  try {
    const data = await TypeCourt.find();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createTypeCourt = async (data) => {
  const { name, icon } = data;

  const newTypeCourt = { ...data };

  if (!name) throw new Error("Data required missing");

  try {
    const iconUpload = await cloudinary.uploader.upload(icon, {
      folder: "BooKing",
    });
    if (!iconUpload) throw new Error("Error to upload image");
    newTypeCourt.icon = iconUpload.secure_url;

    const createTypeCourt = await TypeCourt.create(newTypeCourt);
    if (!createTypeCourt) throw new Error("Type Court no created");

    return "Type Court created succesfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTypeCourtID = async (id) => {
  if (!id) throw new Error("Type Court ID is required");

  const typeCourt = await TypeCourt.findById(id);

  if (!typeCourt) throw new Error("Not found");
  return typeCourt;
};

const deleteTypeCourt = async (id) => {
  if (!id) throw new Error("Type court ID is required");

  let collections = mongoose.connection.collections;

  for (let collectionName in collections) {
    let collection = collections[collectionName];
    await collection.deleteMany({ _id });
  }

  const typeCourt = await TypeCourt.findByIdAndDelete(_id);
  if (!typeCourt) throw new Error("ERROR - fail to delete typeCourt");
  return "typeCourt deleted succesfully";
};

const updateTypeCourt = async (id, data) => {
  if (!id) throw new Error("Type court ID is required");
  try {
    const typeCourt = await TypeCourt.findByIdAndUpdate(id, data);
    if (!typeCourt) throw new Error("ERROR - fail to update typeCourt");

    return "typeCourt updated succesfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  getAllTypeCourt,
  createTypeCourt,
  getTypeCourtID,
  deleteTypeCourt,
  updateTypeCourt,
};
