const { Router } = require("express");
const {
  getAllComplex,
  getAllComplexCity,
  createComplex,
  getComplexID,
  updateComplex,
  deleteComplex,
  getMostLikedComplex,
  getUserComplex,
  getMostLiked,
} = require("../controllers/complex.controller.js");

const complexRoutes = Router();

complexRoutes.get("/all", getAllComplex);
complexRoutes.get("/ranking", getMostLiked);
complexRoutes.post("/all-city", getAllComplexCity);
complexRoutes.get("/user-complex/:id", getUserComplex);
complexRoutes.get("/details/:id", getComplexID);
complexRoutes.post("/create", createComplex);
complexRoutes.put("/update/:id", updateComplex);
complexRoutes.delete("/delete/:id", deleteComplex);

module.exports = complexRoutes;
