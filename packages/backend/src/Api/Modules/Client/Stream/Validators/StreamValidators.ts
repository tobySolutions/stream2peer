import { body, param } from 'express-validator';
import { Platform } from '../TypeChecking/MultiStreamUserDestination';

export const CreateStreamValidator = [
  body('title', 'Stream title is required and should be a string')
    .isString()
    .isLength({ min: 4, max: 30 })
    .withMessage('Stream title must be between 4 and 30 characters')
    .trim()
    .escape(),
  body('description', 'Stream description should be a string')
    .isString()
    .isLength({ max: 1000 })
    .withMessage('Stream description must be less than 1000 characters')
    .optional()
    .trim()
    .escape(),
  body('platforms.*', 'Each platform must be one of the valid enum values')
    .isIn(Object.values(Platform))
    .withMessage('Invalid platform. Platform must be one of ' + Object.values(Platform).join(', '))
    .trim()
    .escape(),
];

export const UpdateStreamValidator = [
  body('title', 'Stream title should be a string')
    .optional()
    .isString()
    .isLength({ min: 4, max: 30 })
    .withMessage('Stream title must be between 3 and 30 characters')
    .trim()
    .escape(),
  body('description', 'Stream description should be a string')
    .optional()
    .isString()
    .isLength({ max: 1000 })
    .withMessage('Stream description must be less than 1000 characters')
    .trim()
    .escape(),
];

export const AccessStreamValidator = [
  param('streamId', 'Stream ID should be a valid UUID')
    .isUUID()
    .withMessage('Stream ID must be a valid UUID'),
];

export const WebhookStreamValidator = [
  body('event', 'Event type is required and should be a string')
    .isString()
    .isIn(['stream.started', 'stream.idle'])
    .withMessage("Event type must be 'stream.started' or 'stream.idle'"),
  body('stream.id', 'Stream ID should be a valid UUID')
    .isUUID()
    .withMessage('Stream ID is required and must be a valid UUID'),
];
