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
    // @ts-ignore
    const authorId = req.user?.sub;
    if (!authorId) return res.status(401).json({ message: 'Unauthorized' });

    const material = await service.create({
      ...req.body,
      authorId
    });

    res.status(201).json(formatMaterialForFrontend(material));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating material' });
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