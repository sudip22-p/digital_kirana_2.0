const jwt = require("jsonwebtoken");

const Costumer = require("../model/userModel");

const authMiddleware = async(req,res,next) =>{
    const token = req.cookies.userToken;
    if (!token) {
        req.costumerToken = null;
        req.costumer = null;
        return next();
    }
    const decoded = jwt.verify(token,process.env.USER_SECRET_KEY);
    const customerId = decoded.id;
    const costumer = await Costumer.findById(customerId).select("-password");   
    req.costumer = costumer;
    req.costumerToken = token;
    return next();
}
module.exports = authMiddleware;