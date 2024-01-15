const { json } = require("body-parser");
const ShiftService = require("../services/shift.service");

//Trae los Shifts
const getAllShifts = async (req, res) => {
  try {
    const data = await ShiftService.getAllShifts();
    res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//crea el Shift
const createShift = async (req, res) => {
  try {
    await ShiftService.createShift(req.body);
    res.send("Shift created successfully");
  } catch (error) {
    res.status(404).json(error);
  }
};

const deletedShift = async (req, res) => {
  try {
    await ShiftService.deleteShift(req.params.id);
    res.send("Shift deleted successfully");
  } catch (error) {
    res.status(404).json(error);
  }
};

const getShiftsComplex = async (req, res) => {
  try {
    const Shifts = await ShiftService.getShiftsComplex(req.params.idComplejo);
    res.status(200).json(Shifts);
  } catch (error) {
    res.status(404).json(error);
  }
};

const getShiftID = async (req, res) => {
  try {
    const Shift = await ShiftService.getShiftID(req.params.id);
    res.status(200).json(Shift);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updateShift = async (req, res) => {
  try {
    const { id } = req.params;
    await ShiftService.updateShift(id, req.body);
    res.send("Shift updated successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const getShiftsCourtDate = async (req, res) => {
  try {
    const Shifts = await ShiftService.getShiftsCourtDate(req.body);
    res.status(200).json(Shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getShiftsUser = async (req, res) => {
  try {
    const Shifts = await ShiftService.getShiftsUser(req.params.id);
    res.status(200).json(Shifts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllShifts,
  createShift,
  deletedShift,
  getShiftsComplex,
  getShiftID,
  updateShift,
  getShiftsCourtDate,
  getShiftsUser,
};
