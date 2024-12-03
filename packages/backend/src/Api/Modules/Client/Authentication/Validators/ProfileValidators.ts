import { body } from 'express-validator';
import { Platform } from 'Api/Modules/Client/Stream/TypeChecking/MultiStreamUserDestination';

export const RemovePlatformValidator = [
    body('platform', 'Platform must be one of the valid enum values')
      .isIn(Object.values(Platform))
      .withMessage('Invalid platform. Platform must be one of ' + Object.values(Platform).join(', '))
      .trim()
      .escape(),
  ];
  