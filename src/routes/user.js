import express from "express";
import user from "../controllers/userController";
import house from "../controllers/houseController";
import multer from "multer";
import passport from "passport";
const upload = multer({
  dest: "./public/images",
});
require("../config/passport");
let router = express.Router();
router.get("/", (req, res) => res.send("WELCOME TO DVL"));
router.post("/register", user.register);
router.post("/login", user.login);
router.post(
  "/add_house",
  passport.authenticate("jwt", { session: false }),
  house.addHouse
);

module.exports = router;
