import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import GitHubAuthController from 'Api/Modules/Client/Authentication/Controllers/GithubAuthController';

const routes = Router();

routes.get('/github', validate, GitHubAuthController.handle);

routes.post('/github/callback', validate, GitHubAuthController.callback);

export default routes;
