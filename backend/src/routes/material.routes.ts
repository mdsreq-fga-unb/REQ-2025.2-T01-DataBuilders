import { Router } from 'express';
import * as materialCtrl from '../controllers/material.controller';
import { ensureAuth } from '../middlewares/auth.middleware';
import { ensureSupabaseAuth } from '../middlewares/supabaseAuth.middleware';

const r = Router();

r.get('/', materialCtrl.listMaterials);
r.get('/:id', materialCtrl.getMaterial);
r.post('/:id/download', ensureSupabaseAuth, materialCtrl.registerDownload);
r.post('/', ensureSupabaseAuth, materialCtrl.createMaterial);
r.put('/:id', ensureSupabaseAuth, materialCtrl.updateMaterial);
r.delete('/:id', ensureSupabaseAuth, materialCtrl.deleteMaterial);
r.patch('/:id/version', ensureSupabaseAuth, materialCtrl.bumpVersion);

export default r;