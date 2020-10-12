import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

import ResidentController from './app/controllers/ResidentController';

const routes = new Router();
routes.post('/sessions', SessionController.store);

// Admin features:
routes.use(authMiddleware);

routes.post('/residents', ResidentController.store);
routes.get('/residents/:id', ResidentController.index);
routes.put('/residents/:id', ResidentController.update);
routes.delete('/residents/:id', ResidentController.delete);

export default routes;
