var express = require("express");
var router = express.Router();
const { signup, signin } = require("../controller/auth");
router.post("/signin", signin);
router.post("/signup", signup);

module.exports = router;
