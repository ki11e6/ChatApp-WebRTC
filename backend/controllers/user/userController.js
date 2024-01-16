import User from '../../models/userModel.js';
import asyncHandler from '../../middlewares/asyncHandler.js';
import generateToken from '../../utils/generateToken.js';

// @desc  Login||Auth user & get token
// @route POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (user && user.matchPassword(password)) {
    generateToken(res, user._id);

    return res.json({
      _id: user._id,
      username: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
});

// @desc  Register user
// @route POST /api/users/login
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const userExists = await User.findOne({ email: email.toLowerCase() });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const user = await User.create({
    name: username,
    email: email.toLowerCase(),
    password,
  });

  if (user) {
    generateToken(res, user._id);

    return res.status(201).json({
      _id: user._id,
      username: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc  Logout user / clear cookie
// @route POST /api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(),
  });

  res.status(200).json({ message: 'logged out successfully' });
});

export { loginUser, registerUser };
