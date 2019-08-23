const express = require("express");
const router = express.Router();
const {
  authenticateUserWithUsername,
  changeAccountPassword,
  profileAccount
} = require("../models/Users");
const passport = require("passport");
const {
  loginInputValidation,
  changePasswordValidation,
  ensureAuthentication
} = require("../utils/validation");
const { USER_ROLE } = require("../utils/constants");
const { invalidInputFormat } = require("../utils/formatResource");
const _ = require("lodash");

//#endregion parent login
router.post("/parent", (req, res, next) => {
  const errors = loginInputValidation(req);
  if (!_.isEmpty(errors)) {
    res.status(400).send(invalidInputFormat(errors));
    return;
  }
  authenticateUserWithUsername(req, res, USER_ROLE.Parent);
});
//#endregion

//#endregion teacher login
router.post("/teacher", (req, res, next) => {
  const errors = loginInputValidation(req);
  if (!_.isEmpty(errors)) {
    res.status(400).send(invalidInputFormat(errors));
    return;
  }
  authenticateUserWithUsername(req, res, USER_ROLE.Teacher);
});
//#endregion

//#region Change Password
router.post("/change_password", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      const errors = changePasswordValidation(req);
      if (!_.isEmpty(errors)) {
        res
          .status(400)
          .send({ message: "field empty", status: 400, errors: errors });
      } else {
        changeAccountPassword(req, res, user);
      }
    }
  })(req, res, next);
});

//#endregion

//#region Profile
router.get("/profile", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (ensureAuthentication(err, res, info)) {
      profileAccount(res, user.role, user.id);
    }
  })(req, res, next);
});
//#endregion

router.get(
  "/done",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
