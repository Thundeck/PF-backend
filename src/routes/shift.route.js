const { Router } = require("express");
const {
  getAllShifts,
  deletedShift,
  createShift,
  getShiftID,
  updateShift,
  getShiftsCourtDate,
  getShiftsComplex,
  getShiftsUser,
} = require("../controllers/shift.controller");

const shiftRoutes = Router();
shiftRoutes.get("/all", getAllShifts);
shiftRoutes.get("/:id", getShiftID);
shiftRoutes.post("/create", createShift);
shiftRoutes.put("/update/:id", updateShift);
shiftRoutes.delete("/delete/:id", deletedShift);
shiftRoutes.get("/complex-shifts/:id", getShiftsComplex);
shiftRoutes.post("/complex-shift-date", getShiftsCourtDate);
shiftRoutes.get("/user-shifts/:id", getShiftsUser);
module.exports = shiftRoutes;
