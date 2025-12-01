import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const hashed = await bcrypt.hash('123456', 10);
  await prisma.user.upsert({
    where: { email: 'prof@uni' },
    update: {},
    create: {
      name: 'Professor',
      email: 'prof@uni',
      password: hashed,
      role: 'PROFESSOR'
    }
  });
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });