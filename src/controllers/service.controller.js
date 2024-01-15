const ServiceServices = require("../services/service.service.js");

const getAllService = async (req, res, next) => {
  try {
    const data = await ServiceServices.getAllService();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createService = async (req, res) => {
  try {
    const data = await ServiceServices.createService(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getServiceID = async (req, res) => {
  try {
    const data = await ServiceServices.getServiceID(req.params.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await ServiceServices.deleteService(id);
    res.send("Client Deleted successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    await ServiceServices.updateService(id, req.body);
    res.send("Client updated successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAllService,
  createService,
  getServiceID,
  deleteService,
  updateService,
};
