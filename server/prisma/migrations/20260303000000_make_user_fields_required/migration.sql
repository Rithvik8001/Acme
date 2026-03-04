-- Backfill NULLs so we can set NOT NULL (required for existing rows)
UPDATE "User" SET "githubUrl" = '' WHERE "githubUrl" IS NULL;
UPDATE "User" SET "bio" = '' WHERE "bio" IS NULL;
UPDATE "User" SET "age" = 18 WHERE "age" IS NULL;
UPDATE "User" SET "gender" = 'other' WHERE "gender" IS NULL;

-- Make columns required
ALTER TABLE "User" ALTER COLUMN "githubUrl" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "bio" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "age" SET NOT NULL;
ALTER TABLE "User" ALTER COLUMN "gender" SET NOT NULL;
