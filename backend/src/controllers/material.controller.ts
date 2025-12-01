import { Request, Response } from 'express';
import { prisma } from '../prisma/client';

export async function createMaterial(req: Request, res: Response) {
  const { title, description, contentUrl, format } = req.body;
  // @ts-ignore
  const authorId = req.user?.sub;
  if (!authorId) return res.status(401).json({ message: 'Unauthorized' });
  const material = await prisma.material.create({
    data: { title, description, contentUrl, format, authorId }
  });
  res.status(201).json(material);
}

export async function listMaterials(req: Request, res: Response) {
  try {
    const materials = await prisma.material.findMany({ where: { deleted: false } });
    res.json(materials);
  } catch {
    res.json([]);
  }
}

export async function getMaterial(req: Request, res: Response) {
  const { id } = req.params;
  const m = await prisma.material.findUnique({ where: { id } });
  if (!m || m.deleted) return res.status(404).json({ message: 'Not found' });
  res.json(m);
}

export async function updateMaterial(req: Request, res: Response) {
  const { id } = req.params;
  const { title, description, contentUrl, format } = req.body;
  // versioning: criar registro em Version aqui (simplificado)
  const old = await prisma.material.findUnique({ where: { id } });
  if (!old) return res.status(404).json({ message: 'Not found' });
  // criar versão
  await prisma.version.create({
    data: {
      materialId: id,
      editedBy: (req as any).user.sub,
      diff: `title:${old.title} -> ${title}`
    }
  });
  const updated = await prisma.material.update({
    where: { id },
    data: { title, description, contentUrl, format }
  });
  res.json(updated);
}

export async function deleteMaterial(req: Request, res: Response) {
  const { id } = req.params;
  // soft delete
  await prisma.material.update({ where: { id }, data: { deleted: true } });
  res.status(204).send();
}
