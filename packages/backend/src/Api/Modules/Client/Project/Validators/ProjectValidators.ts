import { param, body, query } from "express-validator";

export const CreateProjectValidator = [
    body("title", "Project title is required and should be a string")
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("Project title must be between 3 and 100 characters")
      .trim()
      .escape(),
    body("description", "Project description should be a string")
      .isString()
      .isLength({ max: 1000 })
      .withMessage("Project description must be less than 1000 characters")
      .optional()
      .trim()
      .escape(),
];

export const UpdateProjectValidator = [
    body("title", "Project title should be a string")
      .optional()
      .isString()
      .isLength({ min: 3, max: 100 })
      .withMessage("Project title must be between 3 and 100 characters")
      .trim()
      .escape(),
    body("description", "Project description should be a string")
      .optional()
      .isString()
      .isLength({ max: 1000 })
      .withMessage("Project description must be less than 1000 characters")
      .trim()
      .escape(),
];

export const ProjectInviteValidator = [
    body("userId", "Invitee userId is required")
      .isString()
      .withMessage("Invitee userId is required")
      .trim(),
    body("role", "Role should be either 'co-Host', or 'Subscriber'")
      .isIn(["co-Host", "Subscriber"])
      .withMessage("Invalid role. Role must be 'co-Host', or 'Subscriber'")
      .trim(),
];

export const JoinProjectValidator = [
    query("token", "Project token should be a valid string")
      .isJWT()
      .withMessage("Project token is required")
      .trim()
      .escape(),
];

export const AccessProjectIdentifierValidator = [
    param("projectId", "Project ID should be a valid UUID")
      .isUUID()
      .withMessage("Project ID must be a valid UUID"),
];