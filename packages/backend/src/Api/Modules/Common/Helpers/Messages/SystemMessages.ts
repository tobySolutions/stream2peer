export const PROVIDER_NOT_FOUND = 'Provider Was Not Found';
export const MIDDLEWARE_ATTACHED = 'Middleware Attached Successfully';
export const NOT_ALLOWED_BY_CORS = 'This Origin is not allowed by CORS';
export const SERVER_STARTED = `Server Started`;
export const MySQLDB_CONNECTED = 'MySQLDb Connected Successfully';
export const MySQLDB_CONNECTION_ERROR = 'MySQLDB Connection Error';
export const EXPRESS_BOOTSTRAPPED = 'Express Bootstrapped Successfully';
export const EXPRESS_BOOTSTRAPPED_ERROR = 'Express Bootstrap Failure';
export const ROUTES_ATTACHED = 'Routes Attached Successfully';

export const DATABASE_POPULATED = 'Database Populated Successfully';
export const ROLE_DOES_NOT_EXIST = 'Role with this name does not exist';
export const DATABASE_ERROR = 'Database Error';
export const SIGN_IN_SUCCESSFUL = 'Sign in Successful';
export const SIGN_UP_SUCCESSFUL = 'Sign up Successful';
export const CHECK_EMAIL_AND_PASSWORD = 'Check Your Email and Password';

export const TOKEN_GENERATION_SUCCESS = 'Token Generated Successfully';
export const INVALID_TOKEN = 'Invalid Token';
export const TOKEN_EXPIRED =
  'This Token has Expired. Please Request a Fresh One.';
export const NO_TOKEN_RECORD = 'No Token Record in Database';
export const INVALID_TOKEN_TYPE = 'Invalid Token Type';

export const UNAUTHORIZED_OPERATION =
  'You are not authorized to perform this Operation';
export const EMAIL_VERIFICATION_TOKEN_REQUEST_SUCCESS =
  'Email Verification Request Success';

export const USER_DOES_NOT_EXIST = 'User does not exist';

/* ----------------------------------- Object States  ------------------------------*/
export const NULL_OBJECT = null;
export const NOT_APPLICABLE = 'N/A';
export const RESOURCE_NOT_FOUND = 'Resource Not Found';
export const RESOURCE_CREATED = 'Resource Created Successfully';
export const RESOURCE_DELETED_SUCCESSFULLY = 'Resource Deleted Successfully';
export const RESOURCE_TERMINATED = 'Resource Terminated Successfully';

/* ------------------------------ Generic Messages  ------------------------- */

export const WELCOME_TO_API = 'Welcome to Stream2Peer Server API';
export const SOMETHING_WENT_WRONG =
  'Something went wrong while performing this operation';
export const INFORMATION_CREATED = 'Information Created Successfully';
export const INFORMATION_RETRIEVED = 'Information Retrieved Successfully';
export const INFORMATION_UPDATED = 'Information Updated Successfully';
export const INVALID_CREDENTIALS = 'Invalid Credentials';

/* ------------------------------  Response Statuses  ------------------------- */
export const SUCCESS = 'success';
export const ERROR = 'error';

/* -----------------------------------  Errors  ------------------------------*/
export const INTERNAL_SERVER_ERROR = 'Internal Server Error';
export const VALIDATION_ERROR = 'Validation Error';
export const CRITICAL_ERROR_EXITING =
  'Application Encountered a Critical Error. Exiting';
export const ENV_NOT_FOUND_ERROR = '.env File is missing';

/* --------------------------  Authentication Messages  ---------------------*/
export const GOOGLE_AUTHENTICATION_SUCCESS =
  'Google Authentication Successful. Welcome to Stream2Peer!';
export const GOOGLE_AUTHENTICATION_FAILURE =
  'Google Authentication Failed. Please try again or use another method.';

export const GITHUB_AUTHENTICATION_SUCCESS =
  'GitHub Authentication Successful. Welcome to Stream2Peer!';
export const GITHUB_AUTHENTICATION_FAILURE =
  'GitHub Authentication Failed. Please try again or use another method.';

export const METAMASK_AUTHENTICATION_SUCCESS =
  'MetaMask Authentication Successful. Welcome to Stream2Peer!';
export const METAMASK_AUTHENTICATION_FAILURE =
  'MetaMask Authentication Failed. Please try again or use another method.';

/* --------------------------  Authentication -> Password Messages  ---------------------*/
export const PASSWORD_RESET_TOKEN_EMAIL_SUBJECT = 'Stream2Peer Password Reset';
export const PASSWORD_RESET_LINK_GENERATED =
  'Password Recovery Link Generated. Please Check your mail';
export const PASSWORD_RESET_SUCCESSFULLY = 'Password Changed Successfully';

/* --------------------------  Permission Messages  ---------------------*/
export const STREAM_PERMISSION_DENIED =
  "You don't have the necessary permissions to execute this command in the stream.";

export const PROJECT_PERMISSION_DENIED =
  "You don't have the necessary permissions to execute this command in the project.";

/* ----------------------------------- Project -------------------------------------*/
export const PROJECT_RESOURCE = 'PROJECT NOT FOUND';
export const INVITATION_SENT = 'PROJECT INVITATION SENT';
export const PROJECT_INVITE_LINK =
  'Project Invitation Link Sent. Please Check your mail';
export const PEER_ADDED_TO_PROJECT = 'Peer joined Project successfully.';

/* ----------------------------------- Stream -------------------------------------*/

/* ----------------------------------- Email -------------------------------------*/
export const EMAIL_IN_USE = 'Email is Already in Use';
export const EMAIL_VERIFICATION_SUCCESS = 'Email Verification Success';
export const EMAIL_ACTIVATION_TOKEN_EMAIL_SUBJECT = 'Email Activation';
export const INVITATION_EXPIRED = 'Token Expired';
