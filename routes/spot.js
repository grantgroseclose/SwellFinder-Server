const express = require("express");
const router = express.Router();

const spotStore = require("../store/spots");
const auth = require("../middleware/auth");

router.get("/:id", auth, (req, res) => {
  const spot = spotStore.getSpot(parseInt(req.params.id));
  if (!spot) return res.status(404).send();
  res.send(spot);
});

module.exports = router;
