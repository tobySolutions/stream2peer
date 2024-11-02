import { Router } from "express";
import CreateStreamController from "Api/Modules/Client/Stream/Controllers/StreamController/CreateStreamController";
import FetchStreamByIdentifierController from "Api/Modules/Client/Stream/Controllers/StreamController/FetchStreamByIdentifierController";
import FetchAllStreamsController from "Api/Modules/Client/Stream/Controllers/StreamController/FetchAllStreamsController";
import UpdateStreamController from "Api/Modules/Client/Stream/Controllers/StreamController/UpdateStreamController";
import DeleteStreamController from "Api/Modules/Client/Stream/Controllers/StreamController/DeleteStreamController";
import GenerateAccessKeyController from "Api/Modules/Client/Stream/Controllers/StreamController/GenerateAccessKeyController";
import TerminateStreamController from "Api/Modules/Client/Stream/Controllers/StreamController/TerminateStreamController";
import SuspendStreamController from "Api/Modules/Client/Stream/Controllers/StreamController/WebhooksEvent/SuspendStreamController";
import ActivateStreamController from "Api/Modules/Client/Stream/Controllers/StreamController/WebhooksEvent/ActivateStreamController";
import { asyncMiddlewareHandler } from "Utils/asyncMiddlewareHandler";
import { authenticateUser } from "Api/Middleware/isAuthenticated";
import validate from "Api/Validators/Common/validate";
import {
  CreateStreamValidator,
  UpdateStreamValidator,
  AccessStreamValidator,
  WebhookStreamValidator,
} from "Api/Modules/Client/Stream/Validators/StreamValidators";
import {validateLivepeerSignature}from "Api/Modules/Client/Stream/Middlewares/validateLivepeerSignature";
//middleware to check if user is permitted to make changes in the project page for the streams
//create,update and delete stream.
//generate token is basically for just authenticated users, not necessarily about the stream
//livepeer will handle that with the webhook for users permission to watch stream when it makes the request to my backend
// import { isPermitted } from "Api/Modules/Client/Stream/Middlewares/isUserPermitted";

const routes = Router();

routes.post(
    "/:projectId/Create",
    asyncMiddlewareHandler(authenticateUser),
    CreateStreamValidator,
    validate,
    CreateStreamController.handle
  );

routes.put(
    "/:projectId/Update/:streamId",
    asyncMiddlewareHandler(authenticateUser),
    AccessStreamValidator,
    UpdateStreamValidator,
    validate,
    UpdateStreamController.handle
);
  
routes.delete(
    "/:projectId/Delete/:streamId",
    asyncMiddlewareHandler(authenticateUser),
    AccessStreamValidator,
    validate,
    DeleteStreamController.handle
  );
  
  
routes.get(
    "/:projectId/Fetch/:streamId",
    asyncMiddlewareHandler(authenticateUser),
    AccessStreamValidator,
    validate,
    FetchStreamByIdentifierController.handle
);

routes.get(
    "/:projectId/Fetch/all",
    asyncMiddlewareHandler(authenticateUser),
    AccessStreamValidator,
    validate,
    FetchAllStreamsController.handle
);

routes.get(
    "/:projectId/Fetch/access-token",
    asyncMiddlewareHandler(authenticateUser),
    validate,
    GenerateAccessKeyController.handle
)
  
routes.post(
    "/:projectId/Terminate/:streamId",
    asyncMiddlewareHandler(authenticateUser),
    AccessStreamValidator,
    validate,
    TerminateStreamController.handle
);

routes.post(
    "/webhooks/suspend",
    WebhookStreamValidator,
    validateLivepeerSignature,
    validate,
    SuspendStreamController.handle
);
  
routes.post(
    "/webhooks/activate",
    WebhookStreamValidator,
    validateLivepeerSignature,
    validate,
    ActivateStreamController.handle
);

export default routes;
