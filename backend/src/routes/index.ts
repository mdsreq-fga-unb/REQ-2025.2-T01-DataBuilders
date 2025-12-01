import { Router } from 'express';
import authRoutes from './auth.routes';
import materialRoutes from './material.routes';
import repoRoutes from './repo.routes';
import userRoutes from './user.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/materials', materialRoutes);
router.use('/repos', repoRoutes);

export default router;
