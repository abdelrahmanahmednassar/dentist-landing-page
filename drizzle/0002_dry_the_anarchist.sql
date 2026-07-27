CREATE TYPE "public"."blog_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TABLE "blogs" (
	"id" text PRIMARY KEY NOT NULL,
	"title_ar" text NOT NULL,
	"title_en" text NOT NULL,
	"description_ar" text NOT NULL,
	"description_en" text NOT NULL,
	"slug" text NOT NULL,
	"content_ar" text NOT NULL,
	"content_en" text NOT NULL,
	"cover_image_url_ar" text NOT NULL,
	"cover_image_url_en" text NOT NULL,
	"og_image_url_ar" text DEFAULT '/images/blogs-preview.png' NOT NULL,
	"og_image_url_en" text DEFAULT '/images/blogs-preview.png' NOT NULL,
	"excerpt_ar" text NOT NULL,
	"excerpt_en" text NOT NULL,
	"reading_minutes" integer DEFAULT 1 NOT NULL,
	"author_id" uuid NOT NULL,
	"tags_ar" text[] DEFAULT '{}'::text[] NOT NULL,
	"tags_en" text[] DEFAULT '{}'::text[] NOT NULL,
	"status" "blog_status" NOT NULL,
	"is_featured" boolean NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "blog_slug_unique_idx" ON "blogs" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "blog_author_id_idx" ON "blogs" USING btree ("author_id");--> statement-breakpoint
CREATE INDEX "blog_status_idx" ON "blogs" USING btree ("status");--> statement-breakpoint
CREATE INDEX "blog_published_at_idx" ON "blogs" USING btree ("published_at");--> statement-breakpoint
CREATE INDEX "blog_is_featured_idx" ON "blogs" USING btree ("is_featured");