const Service = require("../models/service.model");
const cloudinary = require("../utils/cluodinary");
const mongoose = require("mongoose");

const getAllService = async () => {
  try {
    const data = await Service.find();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createService = async (data) => {
  const { name, icon } = data;
  const newService = { ...data };
  if (!name) throw new Error("Service name is required");
  const iconUpload = await cloudinary.uploader.upload(icon, {
    folder: "BooKing",
  });
  if (!iconUpload) throw new Error("Error to upload image");
  newService.icon = iconUpload.secure_url;

  try {
    const newService = await Service.create(data);
    if (!newService) throw new Error("Object not created");
    return "Service succesfully created";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getServiceID = async (_id) => {
  if (!id) throw new Error("no ID especified");
  try {
    const data = await Service.findById(_id);
    if (!data) throw new Error("Service not found");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateService = async (_id, data) => {
  const { name } = data;

  if (name) throw new Error("Service name is required");

  try {
    const updateService = await Service.findByIdAndUpdate(_id, data);
    if (!updateService) throw new Error("Service not updated");

    return "Service updated succesfully";
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteService = async (_id) => {
  if (!id) throw new Error("Service ID is required");

  try {
    let collections = mongoose.connection.collections;

    for (let collectionName in collections) {
      let collection = collections[collectionName];
      await collection.deleteMany({ _id });
    }

    const service = await Service.findByIdAndDelete(_id);
    if (!service) throw new Error("ERROR - fail to delete service");
    return "Service deleted succesfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createService,
  getAllService,
  getServiceID,
  updateService,
  deleteService,
};
