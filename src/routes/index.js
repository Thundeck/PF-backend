const { Router } = require("express");
const router = Router();
// Importar todos los routers;

const client = require("./Client.js");
const complejo = require("./Complejo.js");
const court = require("./Court.js");
const turn = require("./Turn.js");
const typeCourt = require("./TypeCourt.js");
const event = require("./Event.js");
const notification = require("./Notifications.js");
const config = require("./Config.js");
const favorites = require("./Favorites.js");
//const event = require("../routes/Event.js");
const servicescomplejo = require("./ServicesComplejo.js");
const review = require("./Review.js");

// Configurar los routers
router.use("/clients", client);
router.use("/complejo", complejo);
router.use("/court", court);
router.use("/turn", turn);
router.use("/typecourt", typeCourt);
router.use("/event", event);
router.use("/notification", notification);
router.use("/servicescomplejo", servicescomplejo);
router.use("/config", config);
router.use("/favorites", favorites);
router.use("/reviews", review);

module.exports = router;
