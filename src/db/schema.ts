import { pgTable, uuid, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('customer').notNull(), // customer | admin
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const books = pgTable('books', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  author: text('author').notNull(),
  price: integer('price').notNull(), // store in cents to avoid decimal issues
  stock: integer('stock').default(0).notNull(),
  pdfUrl: text('pdf_url'), // Supabase Storage path
  coverUrl: text('cover_url'),
  isPublished: boolean('is_published').default(false).notNull(), // draft pattern for storage consistency
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export type InsertBook = typeof books.$inferInsert;
export type SelectBook = typeof books.$inferSelect;