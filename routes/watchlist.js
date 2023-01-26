var express = require("express");
var router = express.Router();
const {
  createWatchList,
  getAllWatchListOfUser,
  deleteOneWatchList,
  updateOneWatchList,
  getOneShow,
} = require("../controller/watchlist");
const { isSignedIn, isAuthenticated } = require("../controller/auth");
router.delete("/", isSignedIn, isAuthenticated, deleteOneWatchList);
router.post("/", isSignedIn, isAuthenticated, getAllWatchListOfUser);
router.put("/", isSignedIn, isAuthenticated, updateOneWatchList);
router.post("/id", isSignedIn, isAuthenticated, getOneShow);
router.post("/create", isSignedIn, isAuthenticated, createWatchList);

module.exports = router;
