-- CockroachDB v25.2+ creates every table with schema_locked = true, which makes
-- the CREATE INDEX statements below fail with error 57000. Prisma always emits
-- indexes as separate statements, so unlock table creation for this session --
-- it applies to the shadow database used by `migrate dev` as well.
SET create_table_with_schema_locked = off;

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "ContactLinkKind" AS ENUM ('EMAIL', 'PHONE', 'TELEGRAM', 'GITHUB', 'LINKEDIN', 'WEBSITE', 'OTHER');

-- CreateTable
CREATE TABLE "Profile" (
    "id" INT4 NOT NULL DEFAULT 1,
    "fullName" STRING NOT NULL,
    "headline" STRING NOT NULL,
    "bio" STRING,
    "location" STRING,
    "email" STRING,
    "photoUrl" STRING,
    "availableForWork" BOOL NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" STRING NOT NULL,
    "category" STRING,
    "level" INT4,
    "position" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" STRING NOT NULL,
    "description" STRING,
    "url" STRING,
    "repoUrl" STRING,
    "stack" STRING[],
    "year" INT4,
    "position" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactLink" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "kind" "ContactLinkKind" NOT NULL,
    "label" STRING NOT NULL,
    "url" STRING NOT NULL,
    "position" INT4 NOT NULL DEFAULT 0,

    CONSTRAINT "ContactLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE INDEX "Skill_position_idx" ON "Skill"("position");

-- CreateIndex
CREATE INDEX "Project_position_idx" ON "Project"("position");

-- CreateIndex
CREATE INDEX "ContactLink_position_idx" ON "ContactLink"("position");

