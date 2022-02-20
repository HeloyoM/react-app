"use strict";

var ErrorType = {
  GENERAL_ERROR: {
    id: 1,
    httpCode: 600,
    message: "A big fuck up which we'll never tell you of had just happend. And now : A big fat lie....'A general error ....'",
    isShowStackTrace: true
  },
  USER_NAME_ALREADY_EXIST: {
    id: 2,
    httpCode: 601,
    message: "User name already exist",
    isShowStackTrace: false
  },
  UNAUTHORIZED: {
    id: 3,
    httpCode: 401,
    message: "Login failed, invalid user name or password",
    isShowStackTrace: false
  },
  INVALID_USER_NAME: {
    id: 4,
    httpCode: 402,
    message: "Cannot update/add user, please check your data",
    isShowStackTrace: false
  },
  INVALID_PASSWORD: {
    id: 5,
    httpCode: 403,
    message: "Cannot update/add user, please check your data",
    isShowStackTrace: false
  },
  ER_WRONG_VALUE_COUNT_ON_ROW: {
    id: 6,
    httpCode: 1136,
    message: "Column count doesn't match value count at row 1",
    isShowStackTrace: false
  }
};
module.exports = ErrorType;