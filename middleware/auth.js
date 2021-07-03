const { request } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.header("x-api-key");
  if (!token) {
    return res.json({ statusCode: 404, msg: "Authorization Failed" });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.json({ statusCode: 401, msg: "Token is not valid" });
  }
};
