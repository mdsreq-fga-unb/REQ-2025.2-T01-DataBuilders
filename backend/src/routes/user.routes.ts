import { Router } from 'express';
import { ensureAuth } from '../middlewares/auth.middleware';
import * as userCtrl from '../controllers/user.controller';

const r = Router();
r.get('/me', ensureAuth, userCtrl.getMe);
r.put('/me', ensureAuth, userCtrl.updateMe);
r.put('/me/password', ensureAuth, userCtrl.changePassword);

export default r;
