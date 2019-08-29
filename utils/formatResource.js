/**
 * @author Kelvin Birikorang
 * @email kelvinbirikorang@mail.com
 * @create date 2019-08-23 18:49:41
 * @modify date 2019-08-23 18:49:41
 * @desc resource formatter utility
 */

//
// ─── IMPORT ─────────────────────────────────────────────────────────────────────
//

const { USER_ROLE } = require("../utils/constants");
const { forEach } = require("lodash");
module.exports = {
  //
  // ─── SHOW DATA FORMAT──────────────────────────────────────────────────────────────────
  //

  showData: (data, type = "data") => {
    return { status: 200, count: data.length, [`${type}`]: data };
  },

  //
  // ─── INVALID INPUT FORMAT ───────────────────────────────────────────────────────
  //

  invalidInputFormat: err => {
    return { message: "field empty", status: 400, errors: err };
  },

  //
  // ─── NO DATA FORMAT ─────────────────────────────────────────────────────────────
  //

  noDataFormat: () => {
    return { message: "No Data Available", status: 404 };
  },

  //
  // ─── AUTHENTICATION FAILED FORMAT ───────────────────────────────────────────────
  //

  authenticationFailedFormat: () => {
    return { message: "authentication failed", status: 401 };
  },

  //
  // ─── LOGIN PAYLOAD FORMAT ───────────────────────────────────────────────────────
  //

  loginPayloadFormat: (role, data) => {
    switch (role) {
      case USER_ROLE.Parent:
        return {
          id: data.id,
          ref: data.Students_No,
          level: data.Level_Name,
          role: USER_ROLE.Parent,
          username: data.Index_No,
          name: data.Students_Name,
          imageUrl: data.Image
        };
      case USER_ROLE.Teacher:
        return {
          id: data.id,
          ref: data.Teachers_No,
          level: data.Level_Name,
          role: USER_ROLE.Teacher,
          username: data.Username,
          name: data.Teachers_Name,
          imageUrl: data.Image
        };
      default:
        return {};
    }
  },

  //
  // ─── PROFILE FORMAT ─────────────────────────────────────────────────────────────
  //

  profileFormat: (role, data) => {
    const profile = {};
    switch (role) {
      case USER_ROLE.Parent:
        profile.studentNo = data[0].Students_No;
        profile.studentName = data[0].Students_Name;
        profile.dob = data[0].Dob;
        profile.gender = data[0].Gender;
        profile.admissionDate = data[0].Admin_Date;
        profile.section = data[0].Section_Name;
        profile.faculty = data[0].Faculty_Name;
        profile.level = data[0].Level_Name;
        profile.semester = data[0].Semester_Name;
        profile.index = data[0].Index_No;
        profile.guardian = data[0].Guardian_Name;
        profile.contact = data[0].Guardian_No;
        profile.imageUrl = data[0].Image;
        return {
          message: "Student Profile",
          status: 200,
          studentProfile: profile
        };
      case USER_ROLE.Teacher:
        profile.uid = data[0].Students_No;
        profile.ref = data[0].Teachers_No;
        profile.name = data[0].Teachers_Name;
        profile.dob = data[0].Dob;
        profile.gender = data[0].Gender;
        profile.contact = data[0].Contact;
        profile.admissionDate = data[0].Admin_Date;
        profile.facultyName = data[0].Faculty_Name;
        profile.level = data[0].Level_Name;
        profile.username = data[0].Username;
        profile.imageUrl = data[0].Image;
        return {
          message: "Teacher Profile",
          status: 200,
          teacherProfile: profile
        };

      default:
        return {};
    }
  },

  //
  // ─── CLASS TEACHER FORMAT ───────────────────────────────────────────────────────
  //

  classTeacherFormat: data => {
    let result = [];
    forEach(data, (_, key) => {
      result.push({
        uid: data[key].Teachers_No,
        teacherName: data[key].Teachers_Name,
        gender: data[key].Gender,
        contact: data[key].Contact,
        imageUrl: data[key].Image
      });
    });
    return result;
  },

  //
  // ─── MESSAGES FORMAT ─────────────────────────────────────────────────────────────
  //

  messageDataFormat: data => {
    let result = [];
    forEach(data, (_, key) => {
      result.push({
        sender: data[key].Message_BY,
        level: data[key].Message_Level,
        content: data[key].Message,
        status: data[key].M_Read,
        date: data[key].M_Date
      });
    });
    return result;
  },

  //
  // ─── CIRCULAR FORMAT ────────────────────────────────────────────────────────────
  //

  circularFormat: data => {
    let result = [];
    forEach(data, (_, key) => {
      result.push({
        id: data[key].id,
        cid: data[key].CID,
        fileUrl: data[key].FileName,
        date: data[key].CID_Date
      });
      return result;
    });
  },

  //
  // ─── FILE DATA FORMAT ───────────────────────────────────────────────────────────
  //

  fileDataFormat: (type, data) => {
    let result = [];
    forEach(data, (value, key) => {
      result.push({
        studentName: data[key].Students_Name,
        teacherEmail: data[key].Teachers_Email,
        fileUrl: data[key].Report_File,
        format: type,
        date: data[key].Report_Date
      });
    });
    return result;
  },

  //
  // ─── BILLING FORMAT ─────────────────────────────────────────────────────────────
  //

  billDataFormat: data => {
    let result = [];
    forEach(data, (_, key) => {
      result.push({
        id: data[key].id,
        refNo: data[key].Students_No,
        sender: data[key].Uploader,
        fileUrl: data[key].Bill_File,
        date: data[key].Report_Date
      });
    });
    return result;
  },

  //
  // ─── COMPLAINT MESSAGE ──────────────────────────────────────────────────────────
  //

  complaintDataFormat: data => {
    let result = [];
    forEach(data, (_, key) => {
      result.push({
        studentNo: data[key].Students_No,
        studentName: data[key].Students_Name,
        level: data[key].Level_Name,
        guardianName: data[key].Guardian_Name,
        guardianContact: data[key].Guardian_No,
        teacherName: data[key].Teachers_Name,
        message: data[key].Message,
        date: data[key].Message_Date
      });
    });
    return result;
  },

  //
  // ─── UPLOAD FORMAT ──────────────────────────────────────────────────────────────
  //

  uploadedDataFormat: (row, path, format) => {
    return {
      id: row.insertId,
      fileUrl: path,
      format: format
    };
  },

  //
  // ─── FIREBASE MESSAGE PAYLOAD ───────────────────────────────────────────────────
  //

  firebaseTopicPayload: (title, message, topic) => {
    return {
      data: {
        message: message,
        title: title
      },
      topic: topic
    };
  }
};