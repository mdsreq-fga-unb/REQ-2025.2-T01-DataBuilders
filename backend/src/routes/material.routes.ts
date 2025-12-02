import { Router } from 'express';
import * as materialCtrl from '../controllers/material.controller';
import { ensureAuth } from '../middlewares/auth.middleware';
import { ensureSupabaseAuth } from '../middlewares/supabaseAuth.middleware';

const r = Router();

r.get('/', materialCtrl.listMaterials);
r.get('/:id', materialCtrl.getMaterial);
r.post('/:id/download', materialCtrl.registerDownload);
r.post('/', materialCtrl.createMaterial);
r.put('/:id', materialCtrl.updateMaterial);
r.delete('/:id', materialCtrl.deleteMaterial);
r.patch('/:id/version', materialCtrl.bumpVersion);

export default r;