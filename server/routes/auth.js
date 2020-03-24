const express = require("express");
const router = express.Router();
const {
    login,
    register,
    activateAccount
} = require("../controllers/AuthController");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/activate-account/:hash").put(activateAccount);

module.exports = router;
