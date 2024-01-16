import express from 'express';
import { createValidator } from 'express-joi-validation';
import { registerSchema, loginSchema } from '../schema/joiSchema.js';
import { loginUser, registerUser } from '../controllers/user/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();
const validator = createValidator();

router.route('/register').post(validator.body(registerSchema), registerUser);

router.route('/login').post(validator.body(loginSchema), protect, loginUser);

export default router;
