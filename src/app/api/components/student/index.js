/**
 * @author Kelvin Birikorang
 * @email kelvinbirikorang@mail.com
 * @create date 2019-09-11 13:00:18
 * @modify date 2019-09-11 13:00:18
 * @desc [student route]
 */

//
// ─── IMPORT ─────────────────────────────────────────────────────────────────────
//

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Controller = require("./student.controller");

//
// ─── CLASS TEACHER ──────────────────────────────────────────────────────────────
// @route GET api/v1/students/teacher
// @desc class teachers info
// @access Protected

router.get(
  "/teacher",
  passport.authenticate("jwt", { session: false }),
  Controller.getClassTeacher
);
module.exports = router;
