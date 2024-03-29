const { Router } = require("express");
const {
  getAllClients,
  createClient,
  getClientID,
  deleteClient,
  updateClient,
  authenticateClient,
  confirmClientAccount,
  checkClientToken,
  newClientPassword,
  forgotClientPassword,
  clientProfile,
  googleLogin,
  addFavorite,
  deleteFavorite,
} = require("../controllers/client.controller.js");
const { checkAuth } = require("../middleware/checkAuth.js");
const clientRoutes = Router();

clientRoutes.get("/profile", checkAuth, clientProfile);

clientRoutes.get("/all", getAllClients);

clientRoutes.post("/create", createClient);
clientRoutes.put("/favorite/:client/:complex", addFavorite);
clientRoutes.delete("/favorite/:client/:complex", deleteFavorite);
clientRoutes.put("/update/:id", updateClient);
clientRoutes.delete("/delete/:id", deleteClient);

clientRoutes.post("/login", authenticateClient);
clientRoutes.post("/googleAuth", googleLogin);

clientRoutes.post("/forgot-password", forgotClientPassword);

clientRoutes.put("/confirm-account/:token", confirmClientAccount);

clientRoutes
  .route("/forgot-password/:token")
  .get(checkClientToken)
  .post(newClientPassword);

clientRoutes.get("/:id", getClientID);

module.exports = clientRoutes;
