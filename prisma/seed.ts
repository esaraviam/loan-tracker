import {prisma} from '@/infraestructure/database/prisma'
import {hashPassword} from '@/infraestructure/features/auth/hash'

async function main() {
  await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      email: 'admin@example.com',
      passwordHash: await hashPassword('123456'),
      updatedAt: new Date(),
    },
  })
  console.log('User seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
