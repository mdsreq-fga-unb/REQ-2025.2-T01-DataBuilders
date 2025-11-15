import { Router } from 'express';
import * as repoCtrl from '../controllers/repo.controller';
import { ensureAuth } from '../middlewares/auth.middleware';

const r = Router();
r.get('/search', repoCtrl.search);

export default r;