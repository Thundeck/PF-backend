const Shift = require("../models/shift.model");
const Client = require("../models/client.model");
const Complex = require("../models/complex.model");
const Court = require("../models/court.model");
const mongoose = require("mongoose");

const getAllShifts = async () => {
  try {
    const data = await Shift.find().populate("client");
    if (!data) throw new Error("No data");
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createShift = async (data) => {
  const { date, clientId, courtId, complexId } = data;
  if (!date) throw new Error("Date is required");
  if (!clientId) throw new Error("Client ID is required");
  if (!complexId) throw new Error("Complex ID is required");
  if (!courtId) throw new Error("Court ID is required");

  const newShift = {
    date,
    client: clientId,
    complex: complexId,
    court: courtId,
    state: true,
  };

  try {
    const createdShift = await Shift.create(newShift);
    if (!createdShift) throw new Error("ERROR - shift not created");
    // PARA PROBAR:

    const client = await Client.findById(clientId);
    if (!client) throw new Error("ERROR - client not found");

    const updateClient = await Client.findByIdAndUpdate(clientId, {
      shifts: [...client.shifts, createdShift._id],
    });

    if (!updateClient) throw new Error("ERROR - client not updated");

    const court = await Court.findById(courtId);
    if (!court) throw new Error("ERROR - court not found");

    const updateCourt = await Court.findByIdAndUpdate(courtId, {
      shifts: [...court.shifts, createdShift._id],
    });

    if (!updateCourt) throw new Error("ERROR - court not updated");

    const complex = await Complex.findById(complexId);

    if (!complex) throw new Error("ERROR - court not found");

    const updateComplex = await Complex.findByIdAndUpdate(complexId, {
      clients: [...complex.clients, clientId],
      shifts: [...complex.shifts, createShift._id],
    });

    if (!updateComplex) throw new Error("ERROR - court not updated");

    return "Shift succesfully created";
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteShift = async (id) => {
  if (!id) throw new Error("Shift ID is required");

  let collections = mongoose.connection.collections;

  try {
    for (let collectionName in collections) {
      let collection = collections[collectionName];
      await collection.deleteMany({ _id });
    }

    const shift = await Shift.findByIdAndDelete(_id);
    if (!shift) throw new Error("ERROR - fail to delete shift");
    return "Shift deleted succesfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getShiftsComplex = async (idComplex) => {
  if (!idComplex) "Comple  ID is required";
  try {
    const courts = await Court.find({ idComplex: idComplex });

    const courtIds = courts.map((court) => court._id);

    const result = await Shift.find({ idCourt: { $in: courtIds } });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getShiftID = async (id) => {
  if (!id) throw new Error("Shift ID is required");
  try {
    const Shift = await Shift.findById(id).populate("court");
    if (!Shift) throw new Error("ERROR - shift not found");
    return Shift;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateShift = async (id, data) => {
  try {
    if (!id) throw new Error("Shift ID is required");
    const Shift = await Shift.findByIdAndUpdate(id, data);
    if (!Shift) throw new Error("ERROR - shift not updated");

    return "Shift updated succesfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

const getShiftsCourtDate = async (body) => {
  const { date, courtId, timesArr } = body;
  if (!date) throw new Error("date is required");
  if (!courtId) throw new Error("courtId is required");
  if (!timesArr) throw new Error("timesArr is required");

  let arrAvailableShifts = timesArr.map((e) => ({
    date: `${date}-${e}:00:00`,
    status: true,
  }));

  try {
    const shifts = await Shift.find({ court: courtId });
    if (shifts.length > 0) {
      arrAvailableShifts = arrAvailableShifts.map((shift) => {
        if (shifts.some((s) => s.date === shift.date)) {
          return { ...shift, status: false };
        }
        return shift;
      });
    }
    return arrAvailableShifts;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getShiftsUser = async (client) => {
  if (!client) throw new Error("Client ID is required");
  try {
    const Shifts = await Shift.find({ client }).populate({
      path: "court complex client",
    });

    return Shifts;
  } catch (error) {
    throw new Error(error.message);
  }
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
