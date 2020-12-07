import { Router } from 'express';

import AdminSessionController from './app/controllers/AdminSessionController';
import ResidentSessionController from './app/controllers/ResidentSessionController';

import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';
import adminAuthorization from './app/middlewares/authorization';

import ResidentController from './app/controllers/ResidentController';
import AppointmentController from './app/controllers/AppointmentController';
import AddressController from './app/controllers/AddressController';

import GuardController from './app/controllers/GuardController';

import validateResidentStore from './app/validators/ResidentStore';
import validateResidentUpdate from './app/validators/ResidentUpdate';

import validateAppointmentStore from './app/validators/AppointmentStore';
import validateAppointmentUpdate from './app/validators/AppointmentUpdate';

import validateAddressStore from './app/validators/AddressStore';
import validateAddressUpdate from './app/validators/AddressUpdate';

import validateSessionStore from './app/validators/SessionStore';

const routes = new Router();

routes.post('/sessions', validateSessionStore, AdminSessionController.store);
routes.post(
  '/residentsessions',
  validateSessionStore,
  ResidentSessionController.store
);
routes.get('/guardcheckin/:id', GuardController.index);

// Admin features:
routes.use(authMiddleware);

routes.get('/users', adminAuthorization(true), UserController.index);
routes.post('/users', adminAuthorization(true), UserController.store);

routes.get(
  '/residents/:id',
  adminAuthorization(true),
  ResidentController.index
);

routes.post(
  '/residents',
  adminAuthorization(true),
  validateResidentStore,
  ResidentController.store
);

routes.put(
  '/residents/:id',
  adminAuthorization(true),
  validateResidentUpdate,
  ResidentController.update
);

routes.delete(
  '/residents/:id',
  adminAuthorization(true),
  ResidentController.delete
);

routes.get('/addresses/:id', adminAuthorization(true), AddressController.index);
routes.post(
  '/addresses',
  adminAuthorization(true),
  validateAddressStore,
  AddressController.store
);

routes.put(
  '/addresses/:id',
  adminAuthorization(true),
  validateAddressUpdate,
  AddressController.update
);

routes.get('/appointments/:id', AppointmentController.index);

routes.post(
  '/appointments',
  adminAuthorization(false),
  validateAppointmentStore,
  AppointmentController.store
);

routes.put(
  '/appointments/:id',
  adminAuthorization(false),
  validateAppointmentUpdate,
  AppointmentController.update
);

routes.delete(
  '/appointments/:id',
  adminAuthorization(false),
  AppointmentController.delete
);

export default routes;
