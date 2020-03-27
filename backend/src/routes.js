const express = require("express");
const router = express.Router();
const OngController = require("./controllers/OngController");
const IncidentsController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

router.get("/ongs", OngController.index);

router.post("/ongs", OngController.create);

router.post("/incidents", IncidentsController.create);

router.get("/incidents", IncidentsController.index);

router.delete("/incidents/:id", IncidentsController.delete);

router.get("/profile", ProfileController.index);

router.post("/sessions", SessionController.create);

module.exports = router;