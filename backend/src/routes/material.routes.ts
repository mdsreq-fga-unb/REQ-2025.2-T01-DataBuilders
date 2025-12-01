import { Router } from 'express';
import * as materialCtrl from '../controllers/material.controller';
import { ensureAuth } from '../middlewares/auth.middleware';

const r = Router();

r.get('/', materialCtrl.listMaterials);
r.get('/:id', materialCtrl.getMaterial);
r.post('/:id/download', ensureAuth, materialCtrl.registerDownload);
r.post('/', ensureAuth, materialCtrl.createMaterial);
r.put('/:id', ensureAuth, materialCtrl.updateMaterial);
r.delete('/:id', ensureAuth, materialCtrl.deleteMaterial);
r.patch('/:id/version', ensureAuth, materialCtrl.bumpVersion);

export default r;