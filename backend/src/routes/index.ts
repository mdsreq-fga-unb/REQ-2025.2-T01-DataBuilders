import { Router } from 'express';
import authRoutes from './auth.routes';
import materialRoutes from './material.routes';
import repoRoutes from './repo.routes';

const router = Router();
router.use('/auth', authRoutes);
router.use('/materials', materialRoutes);
router.use('/repos', repoRoutes);

export default router;