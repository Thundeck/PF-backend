const { Router } = require("express");
const router = Router();
// Importar todos los routers;

const client = require("./client.route.js");
const complex = require("./complex.route.js");
const court = require("./court.route.js");
const shift = require("./shift.route.js");
const typeCourt = require("./typeCourt.route.js");
const event = require("./event.route.js");
const notification = require("./notifications.route.js");
//const config = require("./Config.js");
const service = require("./service.route.js");
const review = require("./review.route.js");

// Configurar los routers
router.use("/client", client);
router.use("/complex", complex);
router.use("/court", court);
router.use("/shift", shift);
router.use("/typecourt", typeCourt);
router.use("/event", event);
router.use("/notification", notification);
router.use("/service", service);
// router.use("/config", config);
router.use("/reviews", review);

module.exports = router;
