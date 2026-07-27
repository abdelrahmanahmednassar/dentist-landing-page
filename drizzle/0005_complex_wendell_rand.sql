CREATE TYPE "public"."case_category" AS ENUM('cosmetic', 'implants', 'orthodontics', 'experiences', 'celebrities');--> statement-breakpoint
CREATE TABLE "cases" (
	"id" text PRIMARY KEY NOT NULL,
	"category" "case_category" NOT NULL,
	"title_ar" text,
	"title_en" text,
	"image_url" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE INDEX "cases_category_idx" ON "cases" USING btree ("category");--> statement-breakpoint
CREATE INDEX "cases_created_at_idx" ON "cases" USING btree ("created_at");