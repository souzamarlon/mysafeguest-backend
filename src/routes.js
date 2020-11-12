import { Router } from 'express';

import AdminSessionController from './app/controllers/AdminSessionController';
import ResidentSessionController from './app/controllers/ResidentSessionController';

import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import adminAuthorization from './app/middlewares/authorization';

import ResidentController from './app/controllers/ResidentController';
import AppointmentController from './app/controllers/AppointmentController';

import GuardController from './app/controllers/GuardController';

const routes = new Router();

routes.post('/sessions', AdminSessionController.store);
routes.post('/residentsessions', ResidentSessionController.store);
routes.get('/guardcheckin/:id', GuardController.index);

// Admin features:
routes.use(authMiddleware);

routes.get('/users', adminAuthorization(true), UserController.index);

routes.get(
  '/residents/:id',
  adminAuthorization(true),
  ResidentController.index
);
routes.post('/residents', adminAuthorization(true), ResidentController.store);
routes.put(
  '/residents/:id',
  adminAuthorization(true),
  ResidentController.update
);
routes.delete(
  '/residents/:id',
  adminAuthorization(true),
  ResidentController.delete
);

routes.get('/appointments/:id', AppointmentController.index);
routes.post(
  '/appointments',
  adminAuthorization(false),
  AppointmentController.store
);
routes.put(
  '/appointments/:id',
  adminAuthorization(false),
  AppointmentController.update
);
routes.delete(
  '/appointments/:id',
  adminAuthorization(false),
  AppointmentController.delete
);

export default routes;
