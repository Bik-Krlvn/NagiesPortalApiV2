const Database = require("../config/Database");
const { dbConfig } = require("../config/config");
const db = new Database(dbConfig);
const { stringToBoolean } = require("../utils/stringToBoolean");
const {
  TABLE_TEACHER,
  TABLE_STUDENT,
  USER_ROLE
} = require("../utils/constants");

module.exports = {
  //#region Parent auth
  parentFindById: id => {
    const sql = `SELECT id,Students_No,Level_Name,Students_Name,Index_No,Image FROM ${TABLE_STUDENT} WHERE id = ? LIMIT 1`;
    return db.query(sql, [id]);
  },

  authParentWithUsername: (username, password) => {
    const sql = `SELECT id,Students_No,Level_Name,Students_Name,Index_No,Image FROM ${TABLE_STUDENT} WHERE Index_No = ? AND Password = ? LIMIT 1 `;
    return db.query(sql, [username, password]);
  },
  //#endregion

  //#region Teacher auth
  teacherFindById: id => {
    const sql = `SELECT id,Teachers_No ,Level_Name,Teachers_Name ,Username, Image FROM ${TABLE_TEACHER} WHERE id = ? LIMIT 1`;
    return db.query(sql, [id]);
  },

  authTeacherWithUsername: (username, password) => {
    const sql = `SELECT id,Teachers_No ,Level_Name,Teachers_Name ,Username, Image FROM ${TABLE_TEACHER} WHERE Username = ? AND Password = ? LIMIT 1 `;
    return db.query(sql, [username, password]);
  },
  //#endregion

  //#region change Password
  changeAccountPassword: (res, role, passObj) => {
    switch (role) {
      case USER_ROLE.Parent:
        changePassword(passObj, res, TABLE_STUDENT);
        break;
      case USER_ROLE.Teacher:
        changePassword(passObj, res, TABLE_TEACHER);
        break;
      default:
        break;
    }
  }
  //#endregion
};
const changePassword = (passObj, res, table) => {
  const sql = `SELECT IF ( COUNT(*) > 0,'true','false') AS exist  FROM ${table} WHERE id = ? AND Password = ?`;
  db.query(sql, [passObj.id, passObj.old])
    .then(data => {
      return stringToBoolean(data[0].exist);
    })
    .then(isValid => {
      if (!isValid) {
        res
          .status(404)
          .send({ message: "username or password invalid", status: 404 });
        return;
      }
      db.query(`UPDATE ${table} SET Password = ? WHERE id = ?`, [
        passObj.new,
        passObj.id
      ])
        .then(row => {
          if (!row) {
            res.status(400).send({
              message: "updating password failed...",
              status: 400
            });
            return;
          }
          res.send({
            message: "updated password successful",
            status: 200
          });
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};
