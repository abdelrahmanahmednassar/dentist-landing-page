ALTER TABLE "cases" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."case_category";--> statement-breakpoint
CREATE TYPE "public"."case_category" AS ENUM('cosmetic', 'implants', 'orthodontics');--> statement-breakpoint
ALTER TABLE "cases" ALTER COLUMN "category" SET DATA TYPE "public"."case_category" USING "category"::"public"."case_category";