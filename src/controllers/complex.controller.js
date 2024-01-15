const ComplexService = require("../services/complex.service");

const getAllComplex = async (req, res) => {
  try {
    const data = await ComplexService.getAllComplexs();

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getMostLiked = async (req, res) => {
  try {
    const data = await ComplexService.getMostLiked();

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getAllComplexCity = async (req, res) => {
  try {
    const data = await ComplexService.getAllComplexCity(req.body);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getUserComplex = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ComplexService.getUserComplex(id);

    res.status(200).json(data);
  } catch (error) {
    res.status(404).json(error);
  }
};

const createComplex = async (req, res) => {
  try {
    const data = await ComplexService.createComplex(req.body);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getComplexID = async (req, res) => {
  try {
    const data = await ComplexService.getComplexID(req.params.id);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateComplex = async (req, res) => {
  try {
    const { id } = req.params;
    await ComplexService.updateComplex(id, req.body);
    res.send("Complex updated successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteComplex = async (req, res) => {
  try {
    const { id } = req.params;
    await ComplexService.deleteComplex(id);
    res.send("Complex Deleted successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllComplex,
  createComplex,
  getComplexID,
  updateComplex,
  deleteComplex,
  getUserComplex,
  getAllComplexCity,
  getMostLiked,
};
