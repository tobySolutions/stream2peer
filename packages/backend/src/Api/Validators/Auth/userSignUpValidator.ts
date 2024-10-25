import { body } from "express-validator";

const userSignUpValidator = [
  body("email", "Email should be an email").isEmail().trim().escape(),

  body("first_name", "First name should be at least 3 characters")
    .isLength({
      min: 3,
    })
    .trim()
    .escape(),
  body("last_name", "First name should be at least 3 characters")
    .isLength({
      min: 3,
    })
    .trim()
    .escape(),
  body("password").isLength({ min: 7 }).trim().escape(),
];

export default userSignUpValidator;
