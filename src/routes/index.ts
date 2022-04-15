import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAUthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use(authenticateRoutes);

// Middleware para autenticação de todas as rotas abaixo
router.use(ensureAuthenticated);

router.use('/categories', categoriesRoutes);
router.use('/specifications', specificationRoutes);
router.use('/users', usersRoutes);

export { router };
