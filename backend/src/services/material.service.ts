import { prisma } from '../prisma/client';
import { Material, Prisma } from '@prisma/client';

interface CreateMaterialDTO {
  title: string;
  description: string;
  contentUrl: string;
  type: 'slides' | 'video' | 'pdf' | 'codigo' | 'plano_de_ensino' | 'materal_complementar' | 'lista' | 'livro' ;
  topic?: string;
  period?: string;
  status?: 'Publicado' | 'Rascunho';
  additionalInfo?: string;
  authorId: string;
}

interface UpdateMaterialDTO {
  title?: string;
  description?: string;
  contentUrl?: string;
  type?: 'slides' | 'video' | 'pdf' | 'codigo' | 'plano_de_ensino' | 'materal_complementar' | 'lista' | 'livro' ;
  status?: 'Publicado' | 'Rascunho';
  editorId: string; // Quem está editando
}

export class MaterialService {
  
  // Criar Material
  async create(data: CreateMaterialDTO) {
    return await prisma.material.create({
      data: {
        title: data.title,
        description: data.description,
        contentUrl: data.contentUrl,
        type: data.type,
        topic: data.topic,
        period: data.period,
        status: data.status || 'Publicado',
        additionalInfo: data.additionalInfo,
        authorId: data.authorId,
        version: "v1.0", // Regra: Começa na 1.0
        downloads: 0,
        deleted: false
      }
    });
  }

  // Listar Todos (Não deletados)
  async findAll() {
    return await prisma.material.findMany({
      where: { deleted: false },
      orderBy: { createdAt: 'desc' }
    });
  }

  // Buscar por ID
  async findById(id: string) {
    const material = await prisma.material.findUnique({
      where: { id }
    });

    if (!material || material.deleted) {
      return null;
    }

    return material;
  }

  // Atualizar (Com lógica de Histórico de Versão)
  async update(id: string, data: UpdateMaterialDTO) {
    const oldMaterial = await prisma.material.findUnique({ where: { id } });
    if (!oldMaterial) throw new Error("Material not found");

    // 1. Criar registro na tabela de histórico (Version)
    await prisma.version.create({
      data: {
        materialId: id,
        editedBy: data.editorId,
        diff: `Update: ${new Date().toISOString()}` // Aqui você pode detalhar o que mudou
      }
    });

    // 2. Atualizar o material
    // Removemos o editorId do objeto data antes de passar pro update do prisma
    const { editorId, ...updateData } = data;

    return await prisma.material.update({
      where: { id },
      data: updateData
    });
  }

  // Soft Delete
  async delete(id: string) {
    return await prisma.material.update({
      where: { id },
      data: { deleted: true }
    });
  }

  // Regra de Negócio: Incrementar Download
  async incrementDownload(id: string) {
    return await prisma.material.update({
      where: { id },
      data: { downloads: { increment: 1 } }
    });
  }

  // Regra de Negócio: Versionamento (v1.0 -> v1.1)
  async bumpVersion(id: string, editorId: string) {
    const material = await prisma.material.findUnique({ where: { id } });
    if (!material) throw new Error("Material not found");

    // Lógica regex para subir versão
    const match = material.version.match(/v(\d+)\.(\d+)/);
    let newVersion = "v1.1";
    
    if (match) {
      const major = parseInt(match[1]);
      const minor = parseInt(match[2]) + 1;
      newVersion = `v${major}.${minor}`;
    }

    // Registra histórico
    await prisma.version.create({
      data: {
        materialId: id,
        editedBy: editorId,
        diff: `Version bump: ${material.version} -> ${newVersion}`
      }
    });

    return await prisma.material.update({
      where: { id },
      data: { version: newVersion }
    });
  }
}