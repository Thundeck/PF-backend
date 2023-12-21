const Complex = require("../models/complex.model");
const Client = require("../models/client.model");
const { sendMailBannedComplejo } = require("../libs/notifications");
const cloudinary = require("../utils/cluodinary");

const getAllComplexs = async () => {
  try {
    const data = await Complex.find({ active: true }).populate("courts");
    if (!data) throw "Data not found";
  } catch (error) {
    throw error;
  }

  return data;
};

const createComplex = async (data) => {
  const { name, logo, idUser } = data;
  const newComplex = { ...data };
  try {
    const client = await Client.findById({ _id: idUser });
    if (!client) throw "User not exist";
    newComplex.clientId = idUser;

    const imageUpload = await cloudinary.uploader.upload(logo, {
      folder: "BooKing",
    });
    if (imageUpload) newComplex.clientId = idUser;
    newComplex.logo = imageUpload.secure_url;

    if (!name) throw "name is required";

    const createdComplex = await Complex.create(newComplex);
    if (!createdComplex) throw "ERRROR - Complex not created";

    const addToClient = await Client.findOneAndUpdate(
      { _id: idUser },
      { complexs: [...client.complexs, createdComplex._id] }
    );
    if (!addToClient) throw "ERRROR - Complex not added";

    return "complex succesfully created";
  } catch (error) {
    throw error;
  }
};

const getComplexID = async (_id) => {
  if (!_id) throw "no ID especified";
  const data = await Complex.findById({ _id }).populate(
    "services clients events courts reviews"
  );

  if (!data) throw "No found";

  return data;
};

const updateComplex = async (_id, data) => {
  try {
    const complex = await Complex.findOneAndUpdate({ _id }, { ...data });
    if (!complex) throw "ERROR - the complex has not been updated";
    return "complex update succesfully";
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteComplex = async (_id) => {
  try {
    const complex = await Complex.findOneAndUpdate({ _id }, { deleted: true });
    if (!complex) throw "ERROR - the complex has not been updated";
    return "complex deleted succesfully";
  } catch (error) {}
};

module.exports = {
  createComplex,
  getAllComplexs,
  getComplexID,
  updateComplex,
  deleteComplex,
};
