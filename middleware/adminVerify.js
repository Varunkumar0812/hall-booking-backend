import jwt from "jsonwebtoken";
import User from "../models/AdminModel.js";
// const { toHaveErrorMessage } = require('@testing-library/jest-dom/matchers');
export const protectAdminRoutes = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token);
      // decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id);
      next();
    } catch (error) {
      res.status(401).json({
        msg: error,
      });
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized , token failed.");
  }
};