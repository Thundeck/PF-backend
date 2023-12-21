const Shift = require("../models/shift.model");
const Client = require("../models/client.model");
const Court = require("../models/court.model");
const Complex = require("../models/complex.model");

const getAllShifts = async () => {
  const data = await Shift.findAll({
    include: [{ model: Client, require: true }],
  });
  if (!data) throw "No data";
  return data;
};

const createShift = async (data) => {
  const { date, time_start, clientId, courtId } = data;
  if (!date) throw "Date and time incorrect";
  if (!time_start) throw "Date and time incorrect";
  if (!clientId) throw "Date and time incorrect";
  if (!courtId) throw "Date and time incorrect";

  try {
    const newShift = await Shift.create(data);
    if (!newShift) throw "No create Shift";

    return "newShift";
  } catch (error) {}
};

const deleteShift = async (idShift) => {
  const result = await Shift.destroy({
    where: {
      id: idShift,
    },
  });
  if (!result) throw "Shift no deleted";
  return result;
};

const getShiftsComplex = async (idComplex) => {
  const courts = await Court.findAll({
    where: {
      idComplex: idComplex,
    },
  });
  const result = await Shift.findAll({
    where: {
      idCourt: courts,
    },
  });

  return result;
};

const getShiftID = async (id) => {
  const Shift = await Shift.findByPk(id, {
    include: { model: Court },
  });
  if (!Shift) throw "Not found";
  return Shift;
};

const updateShift = async (id, data) => {
  try {
    const { date, time_start, state } = data;
    const Shift = await Shift.findByPk(id);
    Shift.date = date;
    Shift.time_start = time_start;
    Shift.state = state;
    await Shift.save();
  } catch (error) {
    res.status(400).json(error);
  }
};
const getShiftsCourtDate = async (date, courtId) => {
  const formatdate = date.replace("/", "-");
  const Shifts = await Shift.findAll({
    where: {
      courtId: courtId,
      date: formatdate,
      state: "reserved",
    },
    include: [{ model: Client }],
  });

  return Shifts;
};
const getShiftsUser = async (idUser) => {
  const Shifts = await Shift.findAll({
    where: {
      clientId: idUser,
    },
    include: [{ model: Court, include: [{ model: Complex }] }],
  });

  return Shifts;
};

module.exports = {
  getAllShifts,
  createShift,
  deleteShift,
  getShiftsComplex,
  getShiftID,
  updateShift,
  getShiftsCourtDate,
  getShiftsUser,
};
