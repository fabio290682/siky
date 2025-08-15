import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: varchar('email', { length: 256 }).unique().notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const chatMessages = pgTable('chat_messages', {
    id: serial('id').primaryKey(),
    senderId: serial('sender_id').references(() => users.id),
    receiverId: serial('receiver_id').references(() => users.id),
    text: text('text').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
