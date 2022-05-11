import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { Router } from 'express';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAUthenticated';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationsController =
  new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.get('/', listAvailableCarsController.handle);

carsRoutes.use(ensureAuthenticated);
carsRoutes.post('/', ensureAdmin, createCarController.handle);
carsRoutes.post(
  '/specifications/:id',
  ensureAdmin,
  createCarSpecificationsController.handle
);

export { carsRoutes };
