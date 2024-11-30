import dotenv from 'dotenv';
import { InternalServerError } from 'Api/Modules/Common/Exceptions/InternalServerError';
import { ENV_NOT_FOUND_ERROR } from 'Api/Modules/Common/Helpers/Messages/SystemMessages';
import path from 'path';

// const envFound = dotenv.config({
//   path: path.join(__dirname, '..', '..', '.env'),
// });

// if (envFound.error) throw new InternalServerError(ENV_NOT_FOUND_ERROR);

export * from './authConfig';
export * from './businessConfig';
export * from './expressConfig';
export * from './loggingConfig';
export * from './dbConfig';
export * from './encryptionConfig';
export * from './jwtConfig';
export * from './emailConfig';
export * from './streamConfig';
