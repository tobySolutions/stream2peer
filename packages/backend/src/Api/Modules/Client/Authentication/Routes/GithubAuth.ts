import { Router } from 'express';
import validate from 'Api/Validators/Common/validate';
import GitHubAuthController from 'Api/Modules/Client/Authentication/Controllers/GithubAuthController';

const routes = Router();

routes.post('/github', validate, GitHubAuthController.handle);

routes.get('/github/callback', validate, GitHubAuthController.callback);

export default routes;
