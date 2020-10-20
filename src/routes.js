import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';

import ResidentController from './app/controllers/ResidentController';
import AppointmentController from './app/controllers/AppointmentController';

const routes = new Router();
routes.post('/sessions', SessionController.store);

// Admin features:
routes.use(authMiddleware);

routes.get('/users', UserController.index);

routes.get('/residents/:id', ResidentController.index);
routes.post('/residents', ResidentController.store);
routes.put('/residents/:id', ResidentController.update);
routes.delete('/residents/:id', ResidentController.delete);

routes.get('/appointments/:id', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.put('/appointments/:id', AppointmentController.update);
routes.delete('/appointments/:id', AppointmentController.delete);

export default routes;
