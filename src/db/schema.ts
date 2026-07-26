import { createId } from '@paralleldrive/cuid2';
import { sql } from 'drizzle-orm';
import {
  pgEnum,
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  uniqueIndex,
  index,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name'),
  role: text('role').default('admin').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const blogStatusEnum = pgEnum('blog_status', [
  'draft',
  'published',
  'archived',
]);

export const blogs = pgTable(
  'blogs',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => createId()),
    titleAr: text('title_ar').notNull(),
    titleEn: text('title_en').notNull(),
    descriptionAr: text('description_ar').notNull(),
    descriptionEn: text('description_en').notNull(),
    slug: text('slug').notNull(),
    contentAr: text('content_ar').notNull(),
    contentEn: text('content_en').notNull(),
    coverImageUrlAr: text('cover_image_url_ar').notNull(),
    coverImageUrlEn: text('cover_image_url_en').notNull(),
    ogImageUrl: text('og_image_url').notNull(),
    excerptAr: text('excerpt_ar').notNull(),
    excerptEn: text('excerpt_en').notNull(),
    readingMinutes: integer('reading_minutes').default(1).notNull(),
    authorId: uuid('author_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    tagsAr: text('tags_ar')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    tagsEn: text('tags_en')
      .array()
      .notNull()
      .default(sql`'{}'::text[]`),
    status: blogStatusEnum('status')
      .$defaultFn(() => 'draft')
      .notNull(),
    isFeatured: boolean('is_featured')
      .$defaultFn(() => false)
      .notNull(),
    publishedAt: timestamp('published_at'),
    createdAt: timestamp('created_at')
      .$defaultFn(() => new Date())
      .notNull(),
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex('blog_slug_unique_idx').on(table.slug),
    index('blog_author_id_idx').on(table.authorId),
    index('blog_status_idx').on(table.status),
    index('blog_published_at_idx').on(table.publishedAt),
    index('blog_is_featured_idx').on(table.isFeatured),
  ]
);

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;
