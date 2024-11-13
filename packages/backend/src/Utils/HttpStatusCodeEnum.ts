export enum HttpStatusCodeEnum {
  OK = 200, // Successful request
  CREATED = 201, // Resource created
  ACCEPTED = 202, // Request accepted but not yet processed
  NO_CONTENT = 204, // No content to send for this request

  BAD_REQUEST = 400, // Invalid request
  UNAUTHENTICATED = 401, // Authentication required
  FORBIDDEN = 403, // Forbidden, lacking necessary permissions
  NOT_FOUND = 404, // Resource not found
  METHOD_NOT_ALLOWED = 405, // HTTP method not allowed
  CONFLICT = 409, // Conflict in the request

  UNPROCESSABLE_ENTITY = 422, // Validation error in the request

  TOO_MANY_REQUESTS = 429, // Too many requests sent in a given amount of time
  INVITATION_EXPIRED = 498, // Token has expired or Invalid

  INTERNAL_SERVER_ERROR = 500, // General server error
  NOT_IMPLEMENTED = 501, // Server does not recognize the request method
  BAD_GATEWAY = 502, // Invalid response from the upstream server
  SERVICE_UNAVAILABLE = 503, // Server unavailable or overloaded
  GATEWAY_TIMEOUT = 504, // Timeout from the upstream server
}
