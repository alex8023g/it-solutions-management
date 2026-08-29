import { PrismaPg } from '@prisma/adapter-pg';
import { ContactLinkKind, PrismaClient } from '../generated/prisma/client';

// Seeding runs outside the Nest container, so the connection string is read
// straight from the environment rather than through ConfigService.
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set — seed aborted.');
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

// TODO: replace the placeholders below with your own details before publishing.
const profile = {
  fullName: 'Алексей Грачев',
  headline: 'Full-stack TypeScript developer',
  bio:
    'Full-stack разработчик на TypeScript: собираю API на NestJS и GraphQL ' +
    'и интерфейсы на React. Люблю задачи, где нужно навести порядок в данных ' +
    'и довести проект до продакшена — от схемы БД до деплоя в Docker.',
  location: 'Москва, Россия',
  email: 'alex8023@yandex.ru',
  photoUrl: '/myphoto.jpg',
  availableForWork: true,
};

const skills = [
  { name: 'TypeScript', category: 'Language', level: 5, position: 0 },
  { name: 'Node.js', category: 'Backend', level: 5, position: 1 },
  { name: 'NestJS', category: 'Backend', level: 4, position: 2 },
  { name: 'GraphQL', category: 'Backend', level: 4, position: 3 },
  { name: 'Prisma', category: 'Data', level: 4, position: 4 },
  { name: 'CockroachDB', category: 'Data', level: 3, position: 5 },
  { name: 'React', category: 'Frontend', level: 4, position: 6 },
  { name: 'Vite', category: 'Frontend', level: 4, position: 7 },
  { name: 'Docker', category: 'Tooling', level: 4, position: 8 },
  { name: 'Git', category: 'Tooling', level: 5, position: 9 },
];

const projects = [
  {
    title: 'Otpuskplan.ru',
    description:
      'This site. NextJS + Tailwind CSS backed by Prisma and PostgreSQL, ' +
      'with a React frontend generating typed operations from the schema.',
    url: 'https://otpuskplan.ru',
    repoUrl: 'https://github.com/alex8023g/bank-holidays',
    stack: ['TypeScript', 'NextJS', 'Prisma', 'Postgres', 'React'],
    year: 2026,
    position: 0,
  },
  {
    title: 'S3 storage',
    description:
      'This site. NextJS + S3 Minio storage, ' +
      'with a React frontend generating typed operations from the schema.',
    url: 'https://grachev.dev/examples/s3miniostorage',
    repoUrl: 'https://github.com/alex8023g/bank-holidays',
    stack: ['TypeScript', 'NextJS', 'S3', 'Minio'],
    year: 2026,
    position: 0,
  },
  {
    title: 'Pomodoro iOS app',
    description:
      'This site. NextJS + Tailwind CSS backed by Prisma and PostgreSQL, ' +
      'with a React frontend generating typed operations from the schema.',
    url: 'https://apps.apple.com/ru/app/pomodoro3/id6756366096',
    repoUrl: 'https://github.com/alex8023g/bank-holidays',
    stack: ['TypeScript', 'React', 'Capacitor', 'iOS'],
    year: 2026,
    position: 0,
  },
];

const links = [
  {
    kind: ContactLinkKind.EMAIL,
    label: 'Email',
    url: 'mailto:alex8023@yandex.ru',
    position: 0,
  },
  {
    kind: ContactLinkKind.GITHUB,
    label: 'GitHub',
    url: 'https://github.com/alex8023g',
    position: 1,
  },
  {
    kind: ContactLinkKind.TELEGRAM,
    label: 'Telegram',
    url: 'https://t.me/alex80231',
    position: 2,
  },
];

async function main(): Promise<void> {
  // Profile is a singleton pinned to id 1, so upsert rather than create: the
  // seed stays re-runnable and never accumulates a second card.
  await prisma.profile.upsert({
    where: { id: 1 },
    update: profile,
    create: { id: 1, ...profile },
  });

  // The child tables describe the one card in full, so the seed replaces them
  // wholesale instead of merging — that keeps a re-run idempotent and drops
  // entries removed from the arrays above.
  await prisma.$transaction([
    prisma.skill.deleteMany(),
    prisma.project.deleteMany(),
    prisma.contactLink.deleteMany(),
    prisma.skill.createMany({ data: skills }),
    prisma.project.createMany({ data: projects }),
    prisma.contactLink.createMany({ data: links }),
  ]);

  console.log(
    `Seeded profile with ${skills.length} skills, ` +
      `${projects.length} projects, ${links.length} contact links.`,
  );
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    void prisma.$disconnect();
  });
