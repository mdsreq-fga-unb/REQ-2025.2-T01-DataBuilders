import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller';

const r = Router();
r.post('/register', authCtrl.register);
r.post('/login', authCtrl.login);

export default r;