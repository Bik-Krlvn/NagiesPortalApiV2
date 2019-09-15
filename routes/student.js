/**
 * @author Kelvin Birikorang
 * @email kelvinbirikorang@mail.com
 * @create date 2019-08-23 18:38:50
 * @modify date 2019-08-23 18:38:50
 * @desc student routes
 */

//
// ─── IMPORT ─────────────────────────────────────────────────────────────────────
//

const express = require("express");
const router = express.Router();
const {
  studentMessage,
  studentAssignment,
  studentReport,
  classTeacher,
  studentAnnouncement,
  circular,
  studentBills,
  sendComplaint,studentTimetable
} = require("../models/Student");
const passport = require("passport");
const { ensureAuthentication } = require("../utils/validation");
const { FORMAT_TYPE } = require("../utils/constants");

//
// ─── ROUTES ─────────────────────────────────────────────────────────────────────
//

//#region message route

//
// ─── MESSAGE ────────────────────────────────────────────────────────────────────
//

router.get("/messages", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      studentMessage(req, res, user.level);
    }
  })(req, res, next);
});

//#endregion

//#region assignment pdf

//
// ─── ASSIGNMENT PDF ─────────────────────────────────────────────────────────────────
//

router.get("/assignment_pdf", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      studentAssignment(req, res, FORMAT_TYPE.PDF, user.level);
    }
  })(req, res, next);
});
//#endregion

//#region assignment image

//
// ─── ASSIGNMENT IMAGE ───────────────────────────────────────────────────────────
//

router.get("/assignment_image", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      studentAssignment(req, res, FORMAT_TYPE.IMAGE, user.level);
    }
  })(req, res, next);
});
//#endregion

//#region report pdf

//
// ─── REPORT PDF ─────────────────────────────────────────────────────────────────────
//

router.get("/report_pdf", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      studentReport(req, res, FORMAT_TYPE.PDF, user.ref);
    }
  })(req, res, next);
});
//#endregion

//#region report image

//
// ─── REPORT IMAGE ───────────────────────────────────────────────────────────────
//

router.get("/report_image", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      studentReport(req, res, FORMAT_TYPE.IMAGE, user.ref);
    }
  })(req, res, next);
});

//#endregion

//#region class teachers

//
// ─── CLASS TEACHERS ─────────────────────────────────────────────────────────────
//

router.get("/teachers", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      classTeacher(req, res, user.level);
    }
  })(req, res, next);
});
//#endregion

//#region Announcement

//
// ─── STUDENT ANNOUNCEMENT ───────────────────────────────────────────────────────
//

router.get("/announcement", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      studentAnnouncement(req, res);
    }
  })(req, res, next);
});

//#endregion

//#region Circular

//
// ─── CIRCULAR MESSAGES───────────────────────────────────────────────────────────────────
//

router.get("/circular", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      circular(req, res, user.id);
    }
  })(req, res, next);
});
//#endregion

//#region student billing

//
// ─── STUDENT BILLS ────────────────────────────────────────────────────────────────────
//
router.get("/billing", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      studentBills(req, res, user.ref);
    }
  })(req, res, next);
});

//#endregion

//#region send complaint

//
// ─── SEND COMPLAINT TO CLASS TEACHER ────────────────────────────────────────────
//

router.post("/complaints", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      sendComplaint(req, res, user);
    }
  })(req, res, next);
});

//#endregion

//#region get time table

//
// ─── SEND COMPLAINT TO CLASS TEACHER ────────────────────────────────────────────
//

router.post("/timetable", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      studentTimetable(req,res,user.ref)
    }
  })(req, res, next);
});

//#endregion

module.exports = router;
