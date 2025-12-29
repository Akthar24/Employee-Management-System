const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");

const { signupSchema, loginSchema } = require("../schemas/user.schema");
const controller = require("../controllers/auth.controller");

router.post("/signup", validate(signupSchema), controller.signup);
router.post("/login", validate(loginSchema), controller.login);
router.get("/userget", auth, controller.userGet);
router.put("/userupdate", auth, controller.userUpdate);
router.post("/logout", auth, controller.logout);

module.exports = router;
