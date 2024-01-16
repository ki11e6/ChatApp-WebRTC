import express from 'express';
import authController from '../controllers/auth/authControllers.js';
import joi from 'joi';
import { createValidator } from 'express-joi-validation';
const router = express.Router();
const validator = createValidator();

router.route('/register').get(authController.postRegister);

router.route('/login').get(authController.postLogin);

export default router;
