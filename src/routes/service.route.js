const { Router } = require("express");
const {
  createService,
  getAllService,
  getServiceID,
  updateService,
  deleteService,
} = require("../controllers/service.controller.js");

const serviceRoutes = Router();

serviceRoutes.get("/all", getAllService);
serviceRoutes.get("/:id", getServiceID);
serviceRoutes.post("/create", createService);
serviceRoutes.put("/update/:id", updateService);
serviceRoutes.delete("/delete/:id", deleteService);

module.exports = serviceRoutes;
