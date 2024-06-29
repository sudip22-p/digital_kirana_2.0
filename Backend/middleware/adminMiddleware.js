const jwt = require("jsonwebtoken");

const Admin = require("../model/adminModel");

const adminMiddleware = async (req, res, next) => {
  const adminToken = req.cookies.adminToken;
  if (!adminToken) {
    req.adminToken = null;
    req.admin = null;
    return next();
  }
  const decoded = jwt.verify(adminToken, process.env.ADMIN_SECRET_KEY);
  const adminId = decoded.id;
  const admin = await Admin.findById(adminId).select("-adminPassword");
  req.admin = admin;
  req.adminToken = adminToken;
  return next();
}
module.exports = adminMiddleware;