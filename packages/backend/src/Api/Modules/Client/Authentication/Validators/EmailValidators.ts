import { query } from 'express-validator';

export const EmailSignInValidator = [
    query('email', 'Value should be a valid email')
      .isEmail()
      .notEmpty()
      .withMessage('Email is required')
      .trim()
      .escape(),
  ];