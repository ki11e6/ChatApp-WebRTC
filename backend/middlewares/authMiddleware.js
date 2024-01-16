import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

//protected routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
      req.user = await User.findOne({ _id: userId }).select('-password');
    } catch (error) {
      res.status(401);
      throw new Error('Unauthorized, token failed');
    }
    next();
  } else {
    res.status(401);
    throw new Error('Unauthorized, token not found');
  }
});

export { protect };
