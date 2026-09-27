import { body } from "express-validator";
import validateRequest from "../utils/validate.js";
import userModel from "../models/auth.model.js";

export const registerValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
validateRequest

];

export const loginValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Please enter a valid email"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
    validateRequest
];
