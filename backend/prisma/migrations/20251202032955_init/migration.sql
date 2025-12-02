/*
  Warnings:

  - You are about to drop the `Material` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Version` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[githubId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "MaterialType" AS ENUM ('slides', 'video', 'pdf', 'codigo', 'plano_de_ensino', 'cronograma', 'materal_complementar', 'lista', 'livro');

-- CreateEnum
CREATE TYPE "MaterialStatus" AS ENUM ('Publicado', 'Rascunho');

-- DropForeignKey
ALTER TABLE "Material" DROP CONSTRAINT "Material_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Version" DROP CONSTRAINT "Version_materialId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "githubId" TEXT,
ADD COLUMN     "githubUsername" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

-- DropTable
DROP TABLE "Material";

-- DropTable
DROP TABLE "Version";

-- CreateTable
CREATE TABLE "materials" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" "MaterialType" NOT NULL,
    "contentUrl" TEXT NOT NULL,
    "topic" TEXT,
    "period" TEXT,
    "status" "MaterialStatus" NOT NULL DEFAULT 'Publicado',
    "version" TEXT NOT NULL DEFAULT 'v1.0',
    "downloads" INTEGER NOT NULL DEFAULT 0,
    "isFavorite" BOOLEAN NOT NULL DEFAULT false,
    "additionalInfo" TEXT,
    "authorId" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "materials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "versions" (
    "id" TEXT NOT NULL,
    "materialId" TEXT NOT NULL,
    "editedBy" TEXT NOT NULL,
    "diff" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "versions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_githubId_key" ON "User"("githubId");

-- AddForeignKey
ALTER TABLE "materials" ADD CONSTRAINT "materials_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "versions" ADD CONSTRAINT "versions_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "materials"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
