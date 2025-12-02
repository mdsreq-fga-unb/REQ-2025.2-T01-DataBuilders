import { Request, Response } from 'express';
import { MaterialService } from '../services/material.service';

const service = new MaterialService();
const formatMaterialForFrontend = (m: any) => {
  if (!m) return m;
  const createdAt = m.createdAt ? new Date(m.createdAt) : null;
  let actionButtonText = "Visualizar";
  if (m.type === "video") actionButtonText = "Assistir";
  if (m.type === "codigo") actionButtonText = "Ver Código";
  if (m.type === "pdf" || m.type === "slides") actionButtonText = "Download";

  return {
    ...m,
    date: createdAt ? createdAt.toLocaleDateString('pt-BR') : null,
    dateValue: createdAt,
    actionButtonText,
    actionButtonLink: m.contentUrl,
    professor: m?.author?.name ?? "Prof. Mauricio Serrano"
  };
};

export async function createMaterial(req: Request, res: Response) {
  try {
    console.log('[DEBUG] createMaterial called');
    console.log('[DEBUG] headers:', req.headers);
    console.log('[DEBUG] body:', req.body);

    // @ts-ignore
    const authorId = req.user?.sub;
    console.log('[DEBUG] req.user?.sub =', authorId);

    // fallback para testes locais: aceita authorId do body ou usa DEV-ANON
    const finalAuthorId = authorId || (req.body && req.body.authorId) || 'DEV-ANON';
    
    // fallback para contentUrl (campo obrigatório no schema)
    const finalContentUrl = (req.body && (req.body.contentUrl || req.body.actionButtonLink)) || '';

    // montando o payload que será salvo (somente campos necessários)
    const payload = {
      title: req.body.title,
      description: req.body.description,
      contentUrl: finalContentUrl,
      type: req.body.type,
      topic: req.body.topic,
      period: req.body.period,
      status: req.body.status || 'Publicado',
      additionalInfo: req.body.additionalInfo,
      authorId: finalAuthorId,
    };

    console.log('[DEBUG] material payload:', payload);

    const material = await service.create(payload);

    res.status(201).json(formatMaterialForFrontend(material));
  } catch (error) {
    console.error('[ERROR] createMaterial error:', error);
    // devolve erro mais descritivo em dev
    res.status(500).json({ message: 'Error creating material', error: String(error) });
  }
}

export async function listMaterials(req: Request, res: Response) {
  try {
    console.log('[DEBUG] listMaterials called');
    const materials = await service.findAll();
    console.log('[DEBUG] materials count:', materials?.length);
    const formatted = materials.map(formatMaterialForFrontend);
    res.json(formatted);
  } catch (error) {
    console.error('[ERROR] listMaterials failed:', error);
    res.status(500).json({ message: 'Error listing materials', error: String(error) });
  }
}
export async function getMaterial(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const material = await service.findById(id);
    res.json(formatMaterialForFrontend(material));
  } catch (error: any) {
    if (error.message === "Material not found") {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(500).json({ message: 'Error getting material' });
  }
}

export async function updateMaterial(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // @ts-ignore
    const editorId = req.user?.sub;
    if (!editorId) return res.status(401).json({ message: 'Unauthorized' });

    const updated = await service.update(id, {
      ...req.body,
      editorId
    });

    res.json(formatMaterialForFrontend(updated));
  } catch (error: any) {
    if (error.message === "Material not found") {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(500).json({ message: 'Error updating material' });
  }
}

export async function deleteMaterial(req: Request, res: Response) {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(204).send();
  } catch (error: any) {
    if (error.message === "Material not found") {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(500).json({ message: 'Error deleting material' });
  }
}

export async function registerDownload(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updated = await service.incrementDownload(id);
    res.json({ downloads: updated.downloads });
  } catch (error) {
    res.status(500).json({ message: 'Error registering download' });
  }
}

export async function bumpVersion(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // @ts-ignore
    const editorId = req.user?.sub;
    if (!editorId) return res.status(401).json({ message: 'Unauthorized' });

    const updated = await service.bumpVersion(id, editorId);
    
    res.json(formatMaterialForFrontend(updated));
  } catch (error: any) {
    if (error.message === "Material not found") {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(500).json({ message: 'Error bumping version' });
  }
}