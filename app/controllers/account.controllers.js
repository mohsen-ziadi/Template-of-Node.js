"use strict";

const Account = require("../DataBase/models/account");

async function create(req, res, next) {
  try {
    
    return res.status(200).json({
      success: true,
      message: "Account created.",
    });
  } catch (e) {
    next(e);
  }
}

// export controller
module.exports = {
  create
};
