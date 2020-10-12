import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

import ResidentController from './app/controllers/ResidentController';

const routes = new Router();
routes.post('/sessions', SessionController.store);

// Admin features:
routes.use(authMiddleware);

routes.post('/residents', ResidentController.store);

export default routes;
